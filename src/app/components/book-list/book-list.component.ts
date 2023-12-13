import { Component, Input, ViewChild } from '@angular/core';
import { Book } from 'src/models/book';
import { FetchBookDataService } from '../../services/fetch-book-data.service';
import { Observable, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'olv-book-list',
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

  dataSource: MatTableDataSource<Book> = new MatTableDataSource<Book>(
    this.uniqueBooks
  );
  dataSourceConn$!: Observable<Book[]>;
  // static: true is needed for pagination to work when
  // browsing back to a "cached" page (I don't know why - yet)
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  private _setUpResultsData(iBooks: Book[]) {
    this.dataSource = new MatTableDataSource<Book>(iBooks);
    this.dataSourceConn$ = this.dataSource.connect();
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this._sub = this.bookService.bookData$.subscribe({
      next: (books) => {
        this.books = books;
        this.uniqueBooks = this.filterDuplicateBooks(books);
        this._setUpResultsData(this.uniqueBooks);
        this.searchCriteria = this.bookService.searchCriteria;
      },
      error: (err) => (this.errorMessage = err),
    });
    if (this.bookService.latestSearchResults) {
      this.books = JSON.parse(
        JSON.stringify(this.bookService.latestSearchResults)
      );
      this.uniqueBooks = this.filterDuplicateBooks(this.books);
      this._setUpResultsData(this.uniqueBooks);
    }
  }
}
