import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PaymentFeesDetailComponent } from './payment-fees-detail.component';

describe('Component Tests', () => {
  describe('PaymentFees Management Detail Component', () => {
    let comp: PaymentFeesDetailComponent;
    let fixture: ComponentFixture<PaymentFeesDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PaymentFeesDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ paymentFees: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PaymentFeesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PaymentFeesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load paymentFees on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.paymentFees).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
