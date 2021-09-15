import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddCartComponent } from './confirm-add-cart.component';

describe('ConfirmAddcartComponent', () => {
  let component: ConfirmAddCartComponent;
  let fixture: ComponentFixture<ConfirmAddCartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmAddCartComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAddCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
