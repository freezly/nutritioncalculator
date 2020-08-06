export interface Met {
  name: string;
  value: number;
  key: string;
}

export interface MetUserData {
  entries: MetUserEntry[];
  palPerDay?: number;
}

export interface MetUserEntry {
  met: Met;
  amountHours: number;
}

export interface SportData {
  entries: SportEntry[];
}
export interface SportEntry {
  lightMinutes?: number;
  mediumMinutes?: number;
  hardMinutes?: number;
  day: string;
}

export interface NutritionEntry {
  protein: NutritionValues;
  fat: NutritionValues;
  carbs?: NutritionValues;
  day: string;
}

export interface NutritionValues {
  weight: number;
  kcal: number;
  percent: number;
}

export interface BasicData {
  age: number;
  gender: string;
  weight: number;
  height: number;
  bodyFatPercentage: number;
  bmr: number;
  proteinDemand: number;
  currentBmi: number;
  idealWeight: number;
}

export interface NutritionData {
  carbShare: number;
  manualCarbShare: number;
}
