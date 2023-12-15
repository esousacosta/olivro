import { Component, Input } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';

declare class CheckBox {
  checked: boolean;
  min: number;
  max: number;
}

@Component({
  selector: 'olv-results-sidebar',
  templateUrl: './results-sidebar.component.html',
  styleUrls: ['./results-sidebar.component.scss'],
})
export class ResultsSidebarComponent {
  @Input()
  private _sliderMinValue: number = 0;
  @Input()
  private _sliderMaxValue: number = 500;
  private _minSelectedPrice: number = 0;
  private _maxSelectedPrice: number = 500;
  private _priceCheckBoxes: Map<number, CheckBox> = new Map<number, CheckBox>([
    [
      0,
      {
        checked: false,
        min: 0,
        max: 50,
      },
    ],
    [
      1,
      {
        checked: false,
        min: 50,
        max: 100,
      },
    ],
    [
      2,
      {
        checked: false,
        min: 100,
        max: 150,
      },
    ],
    [
      3,
      {
        checked: false,
        min: 150,
        max: 200,
      },
    ],
    [
      4,
      {
        checked: false,
        min: 200,
        max: 500,
      },
    ],
  ]);

  get sliderMinValue(): number {
    return this._sliderMinValue;
  }

  get sliderMaxValue(): number {
    return this._sliderMaxValue;
  }

  get minSelectedPrice(): number {
    return this._minSelectedPrice;
  }
  set minSelectedPrice(iMinValue: number) {
    this._minSelectedPrice = iMinValue;
  }

  get maxSelectedPrice(): number {
    return this._maxSelectedPrice;
  }
  set maxSelectedPrice(iMaxValue: number) {
    this._maxSelectedPrice = iMaxValue;
  }

  filterPriceByCheckbox($event: MatCheckboxChange, iId: number) {
    if ($event.checked) {
      console.log($event);
      // how to modify the checked attribute
      // of the value in the map?
      this._priceCheckBoxes.get(iId);
    } else {
      console.log('Unchecked');
    }
    console.log(this._priceCheckBoxes);
  }
}
