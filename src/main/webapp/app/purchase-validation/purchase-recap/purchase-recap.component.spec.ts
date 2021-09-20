import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseRecapComponent } from './purchase-recap.component';

describe('PurchaseRecapComponent', () => {
  let component: PurchaseRecapComponent;
  let fixture: ComponentFixture<PurchaseRecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseRecapComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseRecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
