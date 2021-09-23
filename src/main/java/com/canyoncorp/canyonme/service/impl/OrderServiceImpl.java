package com.canyoncorp.canyonme.service.impl;

import com.canyoncorp.canyonme.domain.*;
import com.canyoncorp.canyonme.domain.enumeration.OrderState;
import com.canyoncorp.canyonme.domain.enumeration.PaymentMode;
import com.canyoncorp.canyonme.repository.*;
import com.canyoncorp.canyonme.security.SecurityUtils;
import com.canyoncorp.canyonme.service.MailService;
import com.canyoncorp.canyonme.service.OrderService;
import com.canyoncorp.canyonme.service.ProductService;
import com.canyoncorp.canyonme.service.UnavailableProductException;
import com.canyoncorp.canyonme.service.dto.OrderLineDTO;
import com.canyoncorp.canyonme.service.dto.PersonDTO;
import com.canyoncorp.canyonme.service.dto.ProductDTO;
import com.canyoncorp.canyonme.service.dto.PurchasedOrderDTO;
import com.canyoncorp.canyonme.service.mapper.*;
import com.canyoncorp.canyonme.web.rest.vm.OrderLineVM;
import com.canyoncorp.canyonme.web.rest.vm.OrderVM;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(rollbackFor = { UnavailableProductException.class })
public class OrderServiceImpl implements OrderService {

    private ProductService productService;
    private MailService mailService;
    private PurchasedOrderRepository purchasedOrderRepository;
    private PurchasedOrderMapper purchasedOrderMapper;
    private ShippingFeesRepository shippingFeesRepository;
    private PaymentFeesRepository paymentFeesRepository;
    private PersonRepository personRepository;
    private PersonMapper personMapper;
    private OrderLineRepository orderLineRepository;
    private OrderLineMapper orderLineMapper;
    private final Logger log = LoggerFactory.getLogger(OrderServiceImpl.class);

    public OrderServiceImpl(
        ProductService productService,
        MailService mailService,
        PurchasedOrderRepository purchasedOrderRepository,
        PurchasedOrderMapper purchasedOrderMapper,
        ShippingFeesRepository shippingFeesRepository,
        PaymentFeesRepository paymentFeesRepository,
        PersonRepository personRepository,
        PersonMapper personMapper,
        OrderLineRepository orderLineRepository,
        OrderLineMapper orderLineMapper
    ) {
        this.productService = productService;
        this.mailService = mailService;
        this.purchasedOrderRepository = purchasedOrderRepository;
        this.purchasedOrderMapper = purchasedOrderMapper;
        this.shippingFeesRepository = shippingFeesRepository;
        this.paymentFeesRepository = paymentFeesRepository;
        this.personRepository = personRepository;
        this.personMapper = personMapper;
        this.orderLineRepository = orderLineRepository;
        this.orderLineMapper = orderLineMapper;
    }

    @Transactional
    public List<ProductDTO> purchaseOrder(OrderVM order) {
        List<OrderLineDTO> orders = toOrderLineDTOS(order.getOrderLines());
        List<ProductDTO> remainingItems = new ArrayList<ProductDTO>();

        // applying purchase for each orderline
        try {
            for (OrderLineDTO orderLine : orders) {
                remainingItems.add(productService.purchase(orderLine).get());
            }
        } catch (UnavailableProductException e) {
            log.info("bad orderline found");
            throw e;
        } catch (Exception e) {
            log.error("unknown exception caught");
            System.out.println(e.getMessage());
            throw e;
        }

        // creating new purchasedOrder
        PurchasedOrderDTO purchasedOrderDTO = createPurchasedOrderDTO(order);
        for (int i = 0; i < remainingItems.size(); i++) {
            createOrderLine(order.getOrderLines().get(i), remainingItems.get(i), purchasedOrderDTO);
        }

        return remainingItems;
    }

    @Transactional(readOnly = true)
    public List<ProductDTO> getBadOrderLinesProducts(List<OrderLineDTO> orders) {
        List<ProductDTO> products = new ArrayList<ProductDTO>();
        for (OrderLineDTO orderLine : orders) {
            Optional<ProductDTO> productDTO = productService.getProduct(orderLine);
            if (!productDTO.isPresent() || productDTO.get().getQuantity() < orderLine.getQuantity()) products.add(productDTO.get());
        }
        return products;
    }

    public List<OrderLineDTO> toOrderLineDTOS(List<OrderLineVM> orderLineVMS) {
        List<OrderLineDTO> orderLineDTOS = new ArrayList<OrderLineDTO>();

        // mapping OrderLineVM to OderLineDTO
        for (OrderLineVM orderLineVM : orderLineVMS) {
            OrderLineDTO orderLineDTO = new OrderLineDTO();
            orderLineDTO.setProduct(orderLineVM.getProductId());
            orderLineDTO.setQuantity(orderLineVM.getQuantity());
            orderLineDTOS.add(orderLineDTO);
        }
        return orderLineDTOS;
    }

    public OrderLineDTO createOrderLine(OrderLineVM orderLineVM, ProductDTO productDTO, PurchasedOrderDTO purchasedOrderDTO) {
        OrderLineDTO orderLineDTO = orderLineVM.toOrderLineDTO();
        orderLineDTO.setOrder(purchasedOrderDTO);
        orderLineDTO.setUnitPrice(productDTO.getUnitPrice());
        orderLineDTO.setProductName(productDTO.getName());
        OrderLineDTO newOrderLine = orderLineMapper.toDto(orderLineRepository.save(orderLineMapper.toEntity(orderLineDTO)));
        return newOrderLine;
    }

    private PurchasedOrderDTO createPurchasedOrderDTO(OrderVM orderVM) {
        ShippingFees shippingFees = shippingFeesRepository.getOne(orderVM.getShippingFeesId());
        PaymentFees paymentFees = paymentFeesRepository.getOne(orderVM.getPaymentFeesId());
        PurchasedOrderDTO purchasedOrderDTO = new PurchasedOrderDTO();
        purchasedOrderDTO.setOrderDate(LocalDate.now());
        purchasedOrderDTO.setOrderState(OrderState.NEW);
        purchasedOrderDTO.setBillingAddress(orderVM.getBillingAddress());
        purchasedOrderDTO.setShippingAddress(orderVM.getShippingAddress());
        purchasedOrderDTO.setPaymentMode(paymentFees.getPaymentMode().toString());
        purchasedOrderDTO.setShippingMode(shippingFees.getShippingMode().toString());

        // setting Person
        List<PersonDTO> personDTOS = personMapper.toDto(personRepository.findByUserIsCurrentUser());
        if (!personDTOS.isEmpty()) purchasedOrderDTO.setPerson(personDTOS.get(0));

        // inserting to db
        PurchasedOrder purchasedOrder = purchasedOrderMapper.toEntity(purchasedOrderDTO);
        PurchasedOrderDTO newOrder = purchasedOrderMapper.toDto(purchasedOrderRepository.save(purchasedOrder));

        if (newOrder != null && !personDTOS.isEmpty()) mailService.sendEmail(
            personDTOS.get(0).getEmail(),
            "CanYonMe order " + newOrder.getId(),
            "Paiment confirmed !!, Thank you for trusting us, we hope see you again !",
            false,
            false
        );
        return newOrder;
    }
}
