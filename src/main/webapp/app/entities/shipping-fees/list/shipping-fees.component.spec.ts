import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { ShippingFeesService } from '../service/shipping-fees.service';

import { ShippingFeesComponent } from './shipping-fees.component';

describe('Component Tests', () => {
  describe('ShippingFees Management Component', () => {
    let comp: ShippingFeesComponent;
    let fixture: ComponentFixture<ShippingFeesComponent>;
    let service: ShippingFeesService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        declarations: [ShippingFeesComponent],
      })
        .overrideTemplate(ShippingFeesComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ShippingFeesComponent);
      comp = fixture.componentInstance;
      service = TestBed.inject(ShippingFeesService);

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
      expect(comp.shippingFees?.[0]).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
