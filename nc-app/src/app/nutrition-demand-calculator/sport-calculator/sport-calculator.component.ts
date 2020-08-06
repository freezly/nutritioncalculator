import { Component, OnInit } from '@angular/core';
import { KALORIES, SPORT_EDIT_KEY } from '../nutrition-constants';
import { CalculatorService } from './../calculator.service';
import { NutritionDemandCalculatorService } from './../nutrition-demand-calculator.service';
import { BasicData, MetUserData, SportData } from './../nutrition-model';
@Component({
  selector: 'app-sport-calculator',
  templateUrl: './sport-calculator.component.html',
  styleUrls: ['./sport-calculator.component.scss'],
})
export class SportCalculatorComponent implements OnInit {
  showInputs = true;
  storage = window.localStorage;
  kalories = KALORIES;
  basicData: BasicData;
  sportData: SportData;
  metUserData: MetUserData;

  dailyCalories: number;
  dailySportsCalories: number;

  constructor(public service: NutritionDemandCalculatorService, private calcService: CalculatorService) {}

  ngOnInit() {
    const fromStorage = this.storage.getItem(SPORT_EDIT_KEY);
    if (fromStorage) {
      this.showInputs = fromStorage === 'true';
    } else {
      this.showInputs = true;
    }

    this.service.metuserData$.subscribe((met) => {
      this.metUserData = met;
      this.calculateCalories();
    });
    this.service.basicData$.subscribe((bd) => {
      this.basicData = bd;
      this.calculateCalories();
    });

    this.service.sportData$.subscribe((sd) => {
      this.sportData = sd;
      this.calculateCalories();
    });
  }

  private calculateCalories() {
    if (this.metUserData && this.basicData && this.sportData) {
      const sumCalories = this.calcService.calculateSportCalories(this.sportData);
      this.dailySportsCalories = sumCalories / 7;
      this.dailyCalories = this.basicData.bmr * this.metUserData.palPerDay + this.dailySportsCalories;
    }
  }

  private saveShowInputs() {
    this.storage.setItem(SPORT_EDIT_KEY, `${this.showInputs}`);
  }

  toggleShow() {
    this.showInputs = !this.showInputs;
    this.saveShowInputs();
  }

  saveSport() {
    this.service.saveSport(this.sportData);
  }
}
