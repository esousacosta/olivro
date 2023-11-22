import { Component } from '@angular/core';
import { Book } from 'src/data/book';

@Component({
  selector: 'olv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'olivro';
  books!: Book[];

  // setBooks(iBooks: Book[]): void {
  //   this.books = iBooks;
  // }
}
