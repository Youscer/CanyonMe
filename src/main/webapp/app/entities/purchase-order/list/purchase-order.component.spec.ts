import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PurchaseOrderService } from '../service/purchase-order.service';

import { PurchaseOrderComponent } from './purchase-order.component';

describe('Component Tests', () => {
  describe('PurchaseOrder Management Component', () => {
    let comp: PurchaseOrderComponent;
    let fixture: ComponentFixture<PurchaseOrderComponent>;
    let service: PurchaseOrderService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PurchaseOrderComponent],
      })
        .overrideTemplate(PurchaseOrderComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PurchaseOrderComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PurchaseOrderService);

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
      expect(comp.purchaseOrders?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
