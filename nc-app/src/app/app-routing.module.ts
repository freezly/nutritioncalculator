import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'nutrition-demand-calculator',
    pathMatch: 'full',
  },

  {
    path: 'nutrition-demand-calculator',
    loadChildren: () =>
      import('./nutrition-demand-calculator/nutrition-demand-calculator.module').then(
        (m) => m.NutritionDemandCalculatorPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: false })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
