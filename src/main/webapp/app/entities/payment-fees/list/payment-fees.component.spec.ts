import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PaymentFeesService } from '../service/payment-fees.service';

import { PaymentFeesComponent } from './payment-fees.component';

describe('Component Tests', () => {
  describe('PaymentFees Management Component', () => {
    let comp: PaymentFeesComponent;
    let fixture: ComponentFixture<PaymentFeesComponent>;
    let service: PaymentFeesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PaymentFeesComponent],
      })
        .overrideTemplate(PaymentFeesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentFeesComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(PaymentFeesService);

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
      expect(comp.paymentFees?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
