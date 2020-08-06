import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NutritionCalculatorComponent } from './nutrition-calculator.component';

describe('NutritionCalculatorComponent', () => {
  let component: NutritionCalculatorComponent;
  let fixture: ComponentFixture<NutritionCalculatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionCalculatorComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
