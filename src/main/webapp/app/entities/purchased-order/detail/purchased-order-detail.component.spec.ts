import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PurchasedOrderDetailComponent } from './purchased-order-detail.component';

describe('Component Tests', () => {
  describe('PurchasedOrder Management Detail Component', () => {
    let comp: PurchasedOrderDetailComponent;
    let fixture: ComponentFixture<PurchasedOrderDetailComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [PurchasedOrderDetailComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: { data: of({ purchasedOrder: { id: 123 } }) },
          },
        ],
      })
        .overrideTemplate(PurchasedOrderDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PurchasedOrderDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load purchasedOrder on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.purchasedOrder).toEqual(expect.objectContaining({ id: 123 }));
      });
    });
  });
});
