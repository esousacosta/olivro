import { Component, Input } from '@angular/core';
import { Book } from 'src/models/book';
import { FetchBookDataService } from '../../services/fetch-book-data.service';
import { Subscription } from 'rxjs';

@Component({
  // selector: 'olv-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  constructor(private bookService: FetchBookDataService) {}

  errorMessage: string = '';
  searchCriteria: string = '';
  private _sub!: Subscription;

  books!: Book[];
  uniqueBooks!: Book[];

  private filterDuplicateBooks(iBooks: Book[]): Book[] {
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

  ngOnInit() {
    this._sub = this.bookService.bookData$.subscribe({
      next: (books) => {
        this.books = books;
        this.uniqueBooks = this.filterDuplicateBooks(books);
        this.searchCriteria = this.bookService.searchCriteria;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
