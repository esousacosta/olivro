import { Component, Input } from '@angular/core';

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

  get sliderMinValue(): number {
    return this._sliderMinValue;
  }

  get sliderMaxValue(): number {
    return this._sliderMaxValue;
  }

  private _minSelectedPrice: number = 0;
  private _maxSelectedPrice: number = 500;

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
}
