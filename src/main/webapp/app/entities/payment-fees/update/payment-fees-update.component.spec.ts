jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { PaymentFeesService } from '../service/payment-fees.service';
import { IPaymentFees, PaymentFees } from '../payment-fees.model';

import { PaymentFeesUpdateComponent } from './payment-fees-update.component';

describe('Component Tests', () => {
  describe('PaymentFees Management Update Component', () => {
    let comp: PaymentFeesUpdateComponent;
    let fixture: ComponentFixture<PaymentFeesUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let paymentFeesService: PaymentFeesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [PaymentFeesUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(PaymentFeesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(PaymentFeesUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      paymentFeesService = TestBed.inject(PaymentFeesService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const paymentFees: IPaymentFees = { id: 456 };

        activatedRoute.data = of({ paymentFees });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(paymentFees));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PaymentFees>>();
        const paymentFees = { id: 123 };
        jest.spyOn(paymentFeesService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ paymentFees });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: paymentFees }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(paymentFeesService.update).toHaveBeenCalledWith(paymentFees);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PaymentFees>>();
        const paymentFees = new PaymentFees();
        jest.spyOn(paymentFeesService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ paymentFees });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: paymentFees }));
        saveSubject.complete();

        // THEN
        expect(paymentFeesService.create).toHaveBeenCalledWith(paymentFees);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<PaymentFees>>();
        const paymentFees = { id: 123 };
        jest.spyOn(paymentFeesService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ paymentFees });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(paymentFeesService.update).toHaveBeenCalledWith(paymentFees);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
