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
  private _priceCheckBoxes: Map<PriceCategory, PriceCheckBox> = new Map<
    number,
    PriceCheckBox
  >([
    [
      PriceCategory.zeroToFifty,
      {
        checked: false,
        priceRange: { min: 0, max: 50 },
      },
    ],
    [
      PriceCategory.fiftyToHundred,
      {
        checked: false,
        priceRange: { min: 50, max: 100 },
      },
    ],
    [
      PriceCategory.hundredToHundredFifty,
      {
        checked: false,
        priceRange: { min: 100, max: 150 },
      },
    ],
    [
      PriceCategory.hundredFiftyToTwoHundred,
      {
        checked: false,
        priceRange: { min: 150, max: 200 },
      },
    ],
    [
      PriceCategory.twoHundredAndMore,
      {
        checked: false,
        priceRange: { min: 200, max: 500 },
      },
    ],
  ]);
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

  filterPriceByCheckbox($event: MatCheckboxChange, iId: PriceCategory) {
    if ($event.checked) {
      const checkBox = this._priceCheckBoxes.get(iId);
      if (checkBox) {
        checkBox.checked = true;
      }
    } else {
      const checkBox = this._priceCheckBoxes.get(iId);
      if (checkBox) {
        checkBox.checked = false;
      }
    }
    console.log(this._priceCheckBoxes);
  }

  applyFilters() {
    this.bookListComponent.setUpResultsData(
      this.bookFilter.applyFilters(
        this.bookListComponent.uniqueBooks,
        [],
        this.libraryCheckBoxes
          .filter((libraryCheckBok) => libraryCheckBok.checked)
          .map((libraryCheckBox) => libraryCheckBox.libraryName)
      )
    );
  }
}
