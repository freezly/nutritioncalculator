import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NutritionDemandCalculatorPage } from './nutrition-demand-calculator.page';

const routes: Routes = [
  {
    path: '',
    component: NutritionDemandCalculatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionDemandCalculatorPageRoutingModule {}
