import { Component } from '@angular/core';
import { Book } from 'src/data/book';
import { FetchBookDataService } from '../services/fetch-book-data.service';
import { Subscription } from 'rxjs';

@Component({
  // selector: 'olv-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  constructor(private bookService: FetchBookDataService) {}

  errorMessage: string = '';
  private _sub!: Subscription;

  books!: Book[];

  ngOnInit() {
    this._sub = this.bookService.getBooks().subscribe({
      next: (books) => {
        this.books = books;
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
