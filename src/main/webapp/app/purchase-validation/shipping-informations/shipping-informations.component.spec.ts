import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingInformationsComponent } from './shipping-informations.component';

describe('ShippingInformationsComponent', () => {
  let component: ShippingInformationsComponent;
  let fixture: ComponentFixture<ShippingInformationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShippingInformationsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingInformationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
