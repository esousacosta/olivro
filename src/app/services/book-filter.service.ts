import { Injectable } from '@angular/core';
import { Book } from 'src/models/book';

export enum PriceCategory {
  zeroToFifty = 0,
  fiftyToHundred,
  hundredToHundredFifty,
  hundredFiftyToTwoHundred,
  twoHundredAndMore,
}

export enum LibraryName {
  kLivrariaBsm = 0,
  kLivrariaSensoIncomun,
  kLivrariCeP,
  kLivrariPhVox,
}

export class PriceRange {
  min: number = 0;
  max: number = 500;
}

@Injectable({
  providedIn: 'root',
})
export class BookFilterService {
  constructor() {}

  filterDuplicateBooks(iBooks: Book[]): Book[] {
    if (!iBooks) return [];
    let books: Book[] = [];
    let bookIsbns: Set<string> = new Set([]);
    iBooks.forEach((iBook) => {
      if (bookIsbns.has(iBook.isbn)) {
        return;
      }
      bookIsbns.add(iBook.isbn);
      books.push(iBook);
    });
    return books;
  }

  applyFilters(
    iBooks: Book[],
    iPriceCategories: PriceRange[],
    iLibraryNames: string[]
  ): Book[] {
    if (!iLibraryNames.length && !iPriceCategories.length) {
      return this.filterDuplicateBooks(iBooks);
    }
    let isLibraryNamesFilterSet: boolean = Boolean(iLibraryNames.length);
    let isPriceCategoriesFilterSet: boolean = Boolean(iPriceCategories.length);
    let filteredBooks: Book[] = [];
    let libraryNamesSet: Set<string> = new Set<string>(iLibraryNames);
    filteredBooks.push(
      ...iBooks.filter((book) => {
        if (isLibraryNamesFilterSet && !libraryNamesSet.has(book.library)) {
          return false;
        }
        if (isPriceCategoriesFilterSet) {
          for (let priceRange of iPriceCategories) {
            let bookPrice: number = parseFloat(book.price.replace(/,/g, '.'));
            if (bookPrice >= priceRange.min && bookPrice <= priceRange.max) {
              return true;
            }
          }
          return false;
        }
        return true;
      })
    );
    // This is necessary for the case where we filter only
    // By price, thus leaving several instances of a book
    // (one for each book store) that pass the price check.
    if (isLibraryNamesFilterSet) {
      return filteredBooks;
    }

    return this.filterDuplicateBooks(filteredBooks);
  }
}
