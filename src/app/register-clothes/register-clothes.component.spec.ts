import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClothesComponent } from './register-clothes.component';

describe('RegisterClothesComponent', () => {
  let component: RegisterClothesComponent;
  let fixture: ComponentFixture<RegisterClothesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterClothesComponent]
    });
    fixture = TestBed.createComponent(RegisterClothesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
