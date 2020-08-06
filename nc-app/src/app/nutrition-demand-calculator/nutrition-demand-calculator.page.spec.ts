import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NutritionDemandCalculatorPage } from './nutrition-demand-calculator.page';

describe('NutritionDemandCalculatorPage', () => {
  let component: NutritionDemandCalculatorPage;
  let fixture: ComponentFixture<NutritionDemandCalculatorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutritionDemandCalculatorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NutritionDemandCalculatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
