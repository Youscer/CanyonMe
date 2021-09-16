jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { DiscountService } from '../service/discount.service';
import { IDiscount, Discount } from '../discount.model';
import { IProduct } from 'app/entities/product/product.model';
import { ProductService } from 'app/entities/product/service/product.service';

import { DiscountUpdateComponent } from './discount-update.component';

describe('Component Tests', () => {
  describe('Discount Management Update Component', () => {
    let comp: DiscountUpdateComponent;
    let fixture: ComponentFixture<DiscountUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let discountService: DiscountService;
    let productService: ProductService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [DiscountUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(DiscountUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(DiscountUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      discountService = TestBed.inject(DiscountService);
      productService = TestBed.inject(ProductService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should call Product query and add missing value', () => {
        const discount: IDiscount = { id: 456 };
        const product: IProduct = { id: 55457 };
        discount.product = product;

        const productCollection: IProduct[] = [{ id: 70692 }];
        jest.spyOn(productService, 'query').mockReturnValue(of(new HttpResponse({ body: productCollection })));
        const additionalProducts = [product];
        const expectedCollection: IProduct[] = [...additionalProducts, ...productCollection];
        jest.spyOn(productService, 'addProductToCollectionIfMissing').mockReturnValue(expectedCollection);

        activatedRoute.data = of({ discount });
        comp.ngOnInit();

        expect(productService.query).toHaveBeenCalled();
        expect(productService.addProductToCollectionIfMissing).toHaveBeenCalledWith(productCollection, ...additionalProducts);
        expect(comp.productsSharedCollection).toEqual(expectedCollection);
      });

      it('Should update editForm', () => {
        const discount: IDiscount = { id: 456 };
        const product: IProduct = { id: 26001 };
        discount.product = product;

        activatedRoute.data = of({ discount });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(discount));
        expect(comp.productsSharedCollection).toContain(product);
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Discount>>();
        const discount = { id: 123 };
        jest.spyOn(discountService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ discount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: discount }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(discountService.update).toHaveBeenCalledWith(discount);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Discount>>();
        const discount = new Discount();
        jest.spyOn(discountService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ discount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: discount }));
        saveSubject.complete();

        // THEN
        expect(discountService.create).toHaveBeenCalledWith(discount);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<Discount>>();
        const discount = { id: 123 };
        jest.spyOn(discountService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ discount });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(discountService.update).toHaveBeenCalledWith(discount);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });

    describe('Tracking relationships identifiers', () => {
      describe('trackProductById', () => {
        it('Should return tracked Product primary key', () => {
          const entity = { id: 123 };
          const trackResult = comp.trackProductById(0, entity);
          expect(trackResult).toEqual(entity.id);
        });
      });
    });
  });
});
