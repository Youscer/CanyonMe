import { TestBed } from '@angular/core/testing';

import { ShippingInformationsUpdateService } from './shipping-informations-update.service';

describe('ShippingInformationsUpdateService', () => {
  let service: ShippingInformationsUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShippingInformationsUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
