import { Component, Input, ViewChild } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import {
  BookFilterService,
  PriceCategory,
  PriceRange,
} from 'src/app/services/book-filter.service';
import { BookListComponent } from '../book-list/book-list.component';

interface CheckBox {
  checked: boolean;
}

class PriceCheckBox implements CheckBox {
  checked: boolean;
  priceRange: PriceRange;
  constructor(iMin: number, iMax: number, iChecked: boolean = false) {
    this.priceRange = { min: iMin, max: iMax };
    this.checked = iChecked;
  }
}

class LibraryCheckBox implements CheckBox {
  libraryName: string;
  checked: boolean;
  constructor(iLibraryName: string, iChecked: boolean = false) {
    (this.libraryName = iLibraryName), (this.checked = iChecked);
  }
}

@Component({
  selector: 'olv-results-sidebar',
  templateUrl: './results-sidebar.component.html',
  styleUrls: ['./results-sidebar.component.scss'],
})
export class ResultsSidebarComponent {
  constructor(private bookFilter: BookFilterService) {}

  @ViewChild(BookListComponent) bookListComponent!: BookListComponent;

  @Input()
  private _sliderMinValue: number = 0;
  @Input()
  private _sliderMaxValue: number = 500;
  private _minSelectedPrice: number = 0;
  private _maxSelectedPrice: number = 500;
  priceCheckBoxes: PriceCheckBox[] = [
    {
      checked: false,
      priceRange: { min: 0, max: 49.99 },
    },
    {
      checked: false,
      priceRange: { min: 50, max: 99.99 },
    },
    {
      checked: false,
      priceRange: { min: 100, max: 149.99 },
    },
    {
      checked: false,
      priceRange: { min: 150, max: 199.99 },
    },
    {
      checked: false,
      priceRange: { min: 200, max: 500 },
    },
  ];

  libraryCheckBoxes: LibraryCheckBox[] = [
    new LibraryCheckBox('Livraria BSM'),
    new LibraryCheckBox('Livraria Senso Incomum'),
    new LibraryCheckBox('Livraria Comunicação e Política'),
    new LibraryCheckBox('Livraria PH Vox'),
  ];

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

  applyFilters() {
    this.bookListComponent.setUpResultsData(
      this.bookFilter.applyFilters(
        this.bookListComponent.books,
        { min: this._minSelectedPrice, max: this._maxSelectedPrice },
        this.priceCheckBoxes
          .filter((priceCheckBox) => priceCheckBox.checked)
          .map((priceCheckBox) => priceCheckBox.priceRange),
        this.libraryCheckBoxes
          .filter((libraryCheckBok) => libraryCheckBok.checked)
          .map((libraryCheckBox) => libraryCheckBox.libraryName)
      )
    );
  }
}
