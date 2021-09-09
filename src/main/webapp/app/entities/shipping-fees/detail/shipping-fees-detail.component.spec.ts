import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ShippingFeesDetailComponent } from './shipping-fees-detail.component';

describe('Component Tests', () => {
  describe('ShippingFees Management Detail Component', () => {
    let comp: ShippingFeesDetailComponent;
    let fixture: ComponentFixture<ShippingFeesDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [ShippingFeesDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ shippingFees: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(ShippingFeesDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ShippingFeesDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load shippingFees on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.shippingFees).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
