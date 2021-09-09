jest.mock('@angular/router');

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, Subject } from 'rxjs';

import { ShippingFeesService } from '../service/shipping-fees.service';
import { IShippingFees, ShippingFees } from '../shipping-fees.model';

import { ShippingFeesUpdateComponent } from './shipping-fees-update.component';

describe('Component Tests', () => {
  describe('ShippingFees Management Update Component', () => {
    let comp: ShippingFeesUpdateComponent;
    let fixture: ComponentFixture<ShippingFeesUpdateComponent>;
    let activatedRoute: ActivatedRoute;
    let shippingFeesService: ShippingFeesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ShippingFeesUpdateComponent],
        providers: [FormBuilder, ActivatedRoute],
      })
        .overrideTemplate(ShippingFeesUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShippingFeesUpdateComponent);
      activatedRoute = TestBed.inject(ActivatedRoute);
      shippingFeesService = TestBed.inject(ShippingFeesService);

      comp = fixture.componentInstance;
    });

    describe('ngOnInit', () => {
      it('Should update editForm', () => {
        const shippingFees: IShippingFees = { id: 456 };

        activatedRoute.data = of({ shippingFees });
        comp.ngOnInit();

        expect(comp.editForm.value).toEqual(expect.objectContaining(shippingFees));
      });
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ShippingFees>>();
        const shippingFees = { id: 123 };
        jest.spyOn(shippingFeesService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ shippingFees });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: shippingFees }));
        saveSubject.complete();

        // THEN
        expect(comp.previousState).toHaveBeenCalled();
        expect(shippingFeesService.update).toHaveBeenCalledWith(shippingFees);
        expect(comp.isSaving).toEqual(false);
      });

      it('Should call create service on save for new entity', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ShippingFees>>();
        const shippingFees = new ShippingFees();
        jest.spyOn(shippingFeesService, 'create').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ shippingFees });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.next(new HttpResponse({ body: shippingFees }));
        saveSubject.complete();

        // THEN
        expect(shippingFeesService.create).toHaveBeenCalledWith(shippingFees);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).toHaveBeenCalled();
      });

      it('Should set isSaving to false on error', () => {
        // GIVEN
        const saveSubject = new Subject<HttpResponse<ShippingFees>>();
        const shippingFees = { id: 123 };
        jest.spyOn(shippingFeesService, 'update').mockReturnValue(saveSubject);
        jest.spyOn(comp, 'previousState');
        activatedRoute.data = of({ shippingFees });
        comp.ngOnInit();

        // WHEN
        comp.save();
        expect(comp.isSaving).toEqual(true);
        saveSubject.error('This is an error!');

        // THEN
        expect(shippingFeesService.update).toHaveBeenCalledWith(shippingFees);
        expect(comp.isSaving).toEqual(false);
        expect(comp.previousState).not.toHaveBeenCalled();
      });
    });
  });
});
