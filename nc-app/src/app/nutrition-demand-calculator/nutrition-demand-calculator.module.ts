import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { BasicInputComponent } from './basic-input/basic-input.component';
import { ContentContainerComponent } from './content-container/content-container.component';
import { NutritionCalculatorComponent } from './nutrition-calculator/nutrition-calculator.component';
import { NutritionDemandCalculatorPageRoutingModule } from './nutrition-demand-calculator-routing.module';
import { NutritionDemandCalculatorPage } from './nutrition-demand-calculator.page';
import { PalCalculatorComponent } from './pal-calculator/pal-calculator.component';
import { SportCalculatorComponent } from './sport-calculator/sport-calculator.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NutritionDemandCalculatorPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [
    SportCalculatorComponent,
    PalCalculatorComponent,
    NutritionCalculatorComponent,
    NutritionDemandCalculatorPage,
    BasicInputComponent,
    ContentContainerComponent,
  ],
})
export class NutritionDemandCalculatorPageModule {}
