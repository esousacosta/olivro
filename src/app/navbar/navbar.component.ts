import { Component, Output, EventEmitter } from '@angular/core';
import { FetchBookDataService } from '../services/fetch-book-data.service';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/models/book';

@Component({
  selector: 'olv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private bookService: FetchBookDataService) {}

  errorMessage: string = '';
  message: string = '';
  private _sub!: Subscription;

  bookSearch(iBookTitle: string): void {
    this._sub = this.bookService.getData(iBookTitle).subscribe({
      next: (_) => {
        console.log('getData call successful!');
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
