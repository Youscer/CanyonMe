import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAddBasketComponent } from './button-add-basket.component';

describe('ButtonAddBasketComponent', () => {
  let component: ButtonAddBasketComponent;
  let fixture: ComponentFixture<ButtonAddBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ButtonAddBasketComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonAddBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
