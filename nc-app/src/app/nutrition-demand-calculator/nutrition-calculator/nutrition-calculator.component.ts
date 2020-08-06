import { Component, OnInit } from '@angular/core';
import { NutritionDemandCalculatorService } from '../nutrition-demand-calculator.service';
import { BasicData, MetUserData, NutritionData, SportData, SportEntry } from '../nutrition-model';
import { CalculatorService } from './../calculator.service';
import { nutritionType } from './../nutrition-constants';
import { NutritionEntry } from './../nutrition-model';

@Component({
  selector: 'app-nutrition-calculator',
  templateUrl: './nutrition-calculator.component.html',
  styleUrls: ['./nutrition-calculator.component.scss'],
})
export class NutritionCalculatorComponent implements OnInit {
  bmrWithPal: number;
  sportData: SportData;
  basicData: BasicData;
  metUserData: MetUserData;
  nutritionEntries: NutritionEntry[] = [];

  nutritionData: NutritionData;
  nutritionType = nutritionType;

  constructor(private service: NutritionDemandCalculatorService, private calcService: CalculatorService) {}

  ngOnInit() {
    this.service.sportData$.subscribe((sd) => {
      this.sportData = sd;
      this.calculateNutritions();
    });

    this.service.metuserData$.subscribe((met) => {
      this.metUserData = met;
      this.calculateNutritions();
    });
    this.service.basicData$.subscribe((bd) => {
      this.basicData = bd;
      this.calculateNutritions();
    });

    this.service.nutritionData$.subscribe((nd) => {
      this.nutritionData = nd;
      this.calculateNutritions();
    });
  }

  calculateNutritions() {
    if (this.metUserData && this.sportData && this.basicData && this.nutritionData) {
      this.bmrWithPal = this.basicData.bmr * this.metUserData.palPerDay;
      this.nutritionEntries = [];
      this.sportData.entries.forEach((se) => this.nutritionEntries.push(this.createEntry(se)));
    }
  }

  createEntry(se: SportEntry): NutritionEntry {
    const csTemp =
      this.nutritionData.carbShare < 0 ? this.nutritionData.manualCarbShare / 100 : this.nutritionData.carbShare;
    const sumSportCalories = this.calcService.calcSportCaloriesForEntry(se);
    const dayCalories = sumSportCalories + this.bmrWithPal;
    const factor = sumSportCalories / this.bmrWithPal + 1;
    const proteinShare = (factor * this.basicData.proteinDemand * 4.1) / dayCalories;
    const fatShare = 1 - proteinShare - csTemp;

    return {
      fat: {
        percent: fatShare * 100,
        kcal: dayCalories * fatShare,
        weight: (dayCalories * fatShare) / 9,
      },

      carbs: {
        percent: csTemp * 100,
        kcal: dayCalories * csTemp,
        weight: (dayCalories * csTemp) / 4.1,
      },
      protein: {
        percent: proteinShare * 100,
        kcal: dayCalories * proteinShare,
        weight: (dayCalories * proteinShare) / 4.1,
      },
      day: se.day,
    };
  }

  save() {
    this.service.saveNutrition(this.nutritionData);
  }
}
