import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PurchasedOrderService } from '../service/purchased-order.service';

import { PurchasedOrderComponent } from './purchased-order.component';

describe('Component Tests', () => {
  describe('PurchasedOrder Management Component', () => {
    let comp: PurchasedOrderComponent;
    let fixture: ComponentFixture<PurchasedOrderComponent>;
    let service: PurchasedOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PurchasedOrderComponent],
      })
        .overrideTemplate(PurchasedOrderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchasedOrderComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PurchasedOrderService);

      const headers = new HttpHeaders().append('link', 'link;link');
      jest.spyOn(service, 'query').mockReturnValue(
        of(
          new HttpResponse({
            body: [{ id: 123 }],
            headers,
          })
        )
      );
    });

    it('Should call load all on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.purchasedOrders?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
