import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAddBasketComponent } from './confirm-add-basket.component';

describe('ConfirmAddBasketComponent', () => {
  let component: ConfirmAddBasketComponent;
  let fixture: ComponentFixture<ConfirmAddBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmAddBasketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmAddBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
