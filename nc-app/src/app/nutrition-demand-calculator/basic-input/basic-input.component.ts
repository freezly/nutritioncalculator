import { Component, OnInit } from '@angular/core';
import { BasicData } from '../nutrition-model';
import { BASIC_EDIT_KEY, idealWeightBmi } from './../nutrition-constants';
import { NutritionDemandCalculatorService } from './../nutrition-demand-calculator.service';

@Component({
  selector: 'app-basic-input',
  templateUrl: './basic-input.component.html',
  styleUrls: ['./basic-input.component.scss'],
})
export class BasicInputComponent implements OnInit {
  showInputs = true;
  storage = window.localStorage;
  idealWeightBmi = idealWeightBmi;
  basicData: BasicData;

  constructor(public service: NutritionDemandCalculatorService) {}

  ngOnInit() {
    const fromStorage = this.storage.getItem(BASIC_EDIT_KEY);
    if (fromStorage) {
      this.showInputs = fromStorage === 'true';
    } else {
      this.showInputs = true;
    }
    this.service.basicData$.subscribe((bd) => (this.basicData = bd));
  }

  private saveShowInputs() {
    this.storage.setItem(BASIC_EDIT_KEY, `${this.showInputs}`);
  }

  toggleShow() {
    this.showInputs = !this.showInputs;
    this.saveShowInputs();
  }

  save() {
    this.service.save(this.basicData);
  }
}
