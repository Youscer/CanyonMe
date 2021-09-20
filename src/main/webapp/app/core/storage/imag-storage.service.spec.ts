import { TestBed } from '@angular/core/testing';

import { ImagStorageService } from './imag-storage.service';

describe('ImagStorageService', () => {
  let service: ImagStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImagStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
