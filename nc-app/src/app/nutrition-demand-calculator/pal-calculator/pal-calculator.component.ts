import { Component, OnInit } from '@angular/core';
import { PickerController } from '@ionic/angular';
import { CalculatorService } from './../calculator.service';
import { MET_DATA, PAL_EDIT_KEY } from './../nutrition-constants';
import { NutritionDemandCalculatorService } from './../nutrition-demand-calculator.service';
import { BasicData, MetUserData, MetUserEntry } from './../nutrition-model';

@Component({
  selector: 'app-pal-calculator',
  templateUrl: './pal-calculator.component.html',
  styleUrls: ['./pal-calculator.component.scss'],
})
export class PalCalculatorComponent implements OnInit {
  sum = 0;
  pickerColumns = [];
  edit = true;
  storage = window.localStorage;

  basicData: BasicData;
  metUserData: MetUserData;

  constructor(
    private picker: PickerController,
    public service: NutritionDemandCalculatorService,
    private calcService: CalculatorService
  ) {
    const fromStorage = this.storage.getItem(PAL_EDIT_KEY);
    if (fromStorage) {
      this.edit = fromStorage === 'true';
    } else {
      this.edit = true;
    }

    for (const idx of MET_DATA.keys()) {
      this.pickerColumns.push({ text: `${MET_DATA[idx].name} (PAL: ${MET_DATA[idx].value})`, value: idx });
    }

    service.basicData$.subscribe((bd) => (this.basicData = bd));
    service.metuserData$.subscribe((met) => {
      this.metUserData = met;
      this.calculateSumHours();
    });
  }

  ngOnInit() {}

  delete(item) {
    const index = this.metUserData.entries.indexOf(item);
    if (index > -1) {
      this.metUserData.entries.splice(index, 1);
    }
    this.calculateSumHours();
  }

  plus(item: MetUserEntry) {
    if (this.sum + 0.5 <= 24) {
      item.amountHours += 0.5;
    }
    this.calculateSumHours();
  }

  minus(item: MetUserEntry) {
    if (item.amountHours - 0.5 >= 0) {
      item.amountHours -= 0.5;
    }
    this.calculateSumHours();
  }
  calculateSumHours() {
    this.sum = this.calcService.calculateSumHours(this.metUserData);
  }

  async addEntry() {
    const picker = await this.picker.create({
      columns: [{ name: 'PAL', options: this.pickerColumns }],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            console.log('Got Value', value);
          },
        },
      ],
    });

    await picker.present();
    const { data } = await picker.onDidDismiss();
    this.metUserData.entries.push({ amountHours: 3, met: MET_DATA[data.PAL.value] });
  }

  saveEdit() {
    this.storage.setItem(PAL_EDIT_KEY, `${this.edit}`);
  }

  saveClicked() {
    this.service.savePal(this.metUserData);
    this.edit = false;
    this.saveEdit();
  }
}
