import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CalculatorService } from './calculator.service';
import { BASIC_DATA_KEY, MET_DATA, NUTRITION_DATA_KEY, PAL_DATA_KEY, SPORT_DATA_KEY } from './nutrition-constants';
import { BasicData, MetUserData, NutritionData, SportData } from './nutrition-model';

@Injectable({
  providedIn: 'root',
})
export class NutritionDemandCalculatorService {
  private basicData$$ = new Subject<BasicData>();
  private metuserData$$ = new Subject<MetUserData>();
  private sportData$$ = new Subject<SportData>();
  private nutritionData$$ = new Subject<NutritionData>();

  set basicData(i: BasicData) {
    this.basicData$$.next(i);
  }

  get basicData$(): Observable<BasicData> {
    return this.basicData$$.asObservable();
  }

  set metuserData(i: MetUserData) {
    this.metuserData$$.next(i);
  }

  get metuserData$(): Observable<MetUserData> {
    return this.metuserData$$.asObservable();
  }

  set sportData(i: SportData) {
    this.sportData$$.next(i);
  }

  get sportData$(): Observable<SportData> {
    return this.sportData$$.asObservable();
  }
  set nutritionData(i: NutritionData) {
    this.nutritionData$$.next(i);
  }

  get nutritionData$(): Observable<NutritionData> {
    return this.nutritionData$$.asObservable();
  }

  storage = window.localStorage;

  constructor(private service: CalculatorService) {
    setTimeout(() => {
      this.createOrLoadBasicData();
      this.createOrLoadMetData();
      this.createOrLoadSportData();
      this.createOrLoadNutritionData();
    }, 200);
  }

  createOrLoadMetData() {
    const fromStorage = this.storage.getItem(PAL_DATA_KEY);
    let met: MetUserData;
    if (fromStorage) {
      met = JSON.parse(fromStorage);
    } else {
      met = {
        entries: [],
        palPerDay: 1,
      };
      met.entries.push({
        amountHours: 8,
        met: MET_DATA[0],
      });
      met.entries.push({
        amountHours: 8,
        met: MET_DATA[3],
      });
      met.entries.push({
        amountHours: 3,
        met: MET_DATA[2],
      });
      met.entries.push({
        amountHours: 5,
        met: MET_DATA[6],
      });
    }

    met.palPerDay = this.service.calculatePal(met);
    this.metuserData = Object.assign({}, met);
  }

  createOrLoadNutritionData() {
    const fromStorage = this.storage.getItem(NUTRITION_DATA_KEY);
    let nd: NutritionData;
    if (fromStorage) {
      nd = JSON.parse(fromStorage);
    } else {
      nd = { carbShare: 0.2, manualCarbShare: 20 };
    }
    this.nutritionData = Object.assign({}, nd);
  }

  createOrLoadSportData() {
    const fromStorage = this.storage.getItem(SPORT_DATA_KEY);
    let sd: SportData;
    if (fromStorage) {
      sd = JSON.parse(fromStorage);
    } else {
      sd = { entries: [] };
      sd.entries.push({
        lightMinutes: 20,
        mediumMinutes: 40,
        day: 'monday',
      });
      sd.entries.push({
        lightMinutes: 20,
        mediumMinutes: 40,
        day: 'tuesday',
      });
      sd.entries.push({
        lightMinutes: 20,
        mediumMinutes: 40,
        day: 'wednesday',
      });
      sd.entries.push({
        lightMinutes: 20,
        mediumMinutes: 40,
        day: 'thursday',
      });
      sd.entries.push({
        lightMinutes: 20,
        mediumMinutes: 40,
        day: 'friday',
      });
      sd.entries.push({
        day: 'saturday',
      });
      sd.entries.push({
        day: 'sunday',
      });
    }

    this.sportData = Object.assign({}, sd);
  }

  private createOrLoadBasicData() {
    const fromStorage = this.storage.getItem(BASIC_DATA_KEY);
    let bd: BasicData;
    if (fromStorage) {
      bd = JSON.parse(fromStorage);
    } else {
      bd = {
        age: 38,
        gender: 'f',
        weight: 64,
        height: 172,
        bodyFatPercentage: 12,
        bmr: 1300,
        proteinDemand: 130,
        currentBmi: 22,
        idealWeight: 64,
      };
    }

    bd = this.service.calculateBasicData(bd);
    this.basicData = Object.assign({}, bd);
  }

  save(bd: BasicData) {
    bd = this.service.calculateBasicData(bd);
    this.storage.setItem(BASIC_DATA_KEY, JSON.stringify(bd));

    this.basicData = Object.assign({}, bd);
  }

  savePal(met: MetUserData) {
    met.palPerDay = this.service.calculatePal(met);
    this.storage.setItem(PAL_DATA_KEY, JSON.stringify(met));
    this.metuserData = Object.assign({}, met);
  }

  saveSport(sd: SportData) {
    this.storage.setItem(SPORT_DATA_KEY, JSON.stringify(sd));
    this.sportData = Object.assign({}, sd);
  }

  saveNutrition(nd: NutritionData) {
    this.storage.setItem(NUTRITION_DATA_KEY, JSON.stringify(nd));
    this.nutritionData = Object.assign({}, nd);
  }
}
