import { TestBed } from '@angular/core/testing';

import { NutritionDemandCalculatorService } from './nutrition-demand-calculator.service';

describe('NutritionDemandCalculatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NutritionDemandCalculatorService = TestBed.get(NutritionDemandCalculatorService);
    expect(service).toBeTruthy();
  });
});
