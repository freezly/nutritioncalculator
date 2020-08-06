import { Injectable } from '@angular/core';
import { defaultProteinDemand, idealWeightBmi, KALORIES } from './nutrition-constants';
import { BasicData, MetUserData, SportData, SportEntry } from './nutrition-model';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor() {}

  calculateBasicData(bd: BasicData): BasicData {
    bd.bmr = this.calculateBmr(bd);
    bd.idealWeight = this.calculateIdealWeight(bd);
    bd.currentBmi = this.calculateCurrentBmi(bd);
    bd.proteinDemand = this.calculateProteinDemand(bd);
    return bd;
  }

  calculateProteinDemand(bd: BasicData): number {
    return bd.idealWeight * defaultProteinDemand;
  }
  calculateCurrentBmi(bd: BasicData): number {
    return bd.weight / (((bd.height / 100) * bd.height) / 100);
  }

  calculateIdealWeight(bd: BasicData): number {
    return idealWeightBmi * (((bd.height / 100) * bd.height) / 100);
  }

  calculateBmr(bd: BasicData): number {
    if (bd.gender === 'f') {
      return 10 * bd.weight + 6.25 * bd.height - 5 * bd.age - 161;
    } else {
      return 10 * bd.weight + 6.25 * bd.height - 5 * bd.age + 5;
    }
  }

  calculateSportCalories(sd: SportData): number {
    let sumCalories = 0;
    for (const entry of sd.entries) {
      sumCalories = sumCalories + this.calcSportCaloriesForEntry(entry);
    }

    return sumCalories;
  }

  calcSportCaloriesForEntry(entry: SportEntry) {
    let sumCalories = 0;
    if (entry.lightMinutes) {
      sumCalories = sumCalories + entry.lightMinutes * KALORIES.light;
    }

    if (entry.mediumMinutes) {
      sumCalories = sumCalories + entry.mediumMinutes * KALORIES.medium;
    }
    if (entry.hardMinutes) {
      sumCalories = sumCalories + entry.hardMinutes * KALORIES.hard;
    }
    return sumCalories;
  }

  calculatePal(met: MetUserData): number {
    if (met?.entries && met.entries.length > 0) {
      const sum = this.calculateSumHours(met);
      let palSum = 0;
      met.entries.forEach((i) => (palSum = palSum + i.amountHours * i.met.value));
      return palSum / sum;
    } else {
      return 1;
    }
  }

  calculateSumHours(met: MetUserData): number {
    if (met?.entries && met.entries.length > 0) {
      return met.entries.map((i) => i.amountHours).reduce((sum, i) => sum + i);
    } else {
      return 0;
    }
  }
}
