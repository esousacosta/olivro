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
    if (!iLibraryNames.length) {
      console.log(iBooks);
      return this.filterDuplicateBooks(iBooks);
    }
    let filteredBooks: Book[] = [];
    iLibraryNames.forEach((libraryName) => {
      filteredBooks.push(
        ...iBooks.filter((book) => book.library === libraryName)
      );
    });
    console.log(filteredBooks);
    return filteredBooks;
  }
}
