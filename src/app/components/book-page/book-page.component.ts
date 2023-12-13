import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Local
import { FetchBookDataService } from 'src/app/services/fetch-book-data.service';
import { Book } from 'src/models/book';

@Component({
  // selector: 'olv-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss'],
})
export class BookPageComponent {
  constructor(
    private bookService: FetchBookDataService,
    private route: ActivatedRoute
  ) {}

  books!: Book[];
  filteredBooks!: Book[];
  isbn: String = '';

  displayedColumns: String[] = ['library', 'price', 'offer'];

  filterByIsbn(isbn: String): Book[] {
    return this.books.filter((book) => {
      return book.isbn == isbn;
    });
  }

  ngOnInit() {
    this.route.params.subscribe({
      next: (params) => {
        let isbn = params['isbn'];
        if (!isbn) isbn = '';
        this.bookService.bookData$.subscribe({
          next: (books) => {
            this.books = books;
            this.filteredBooks = this.filterByIsbn(isbn);
          },
          error: (err) => {
            console.log(
              'An error happened during fetch of book data. Exiting...'
            );
          },
        });
        if (this.bookService.latestSearchResults) {
          this.books = JSON.parse(
            JSON.stringify(this.bookService.latestSearchResults)
          );
          this.filteredBooks = this.filterByIsbn(isbn);
        }
      },
      error: (err) => {
        console.log('An error ocurred retrieving the routing parameters');
      },
    });
  }
}
