import { Component, Output, EventEmitter } from '@angular/core';
import { FetchBookDataService } from '../services/fetch-book-data.service';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/data/book';

@Component({
  selector: 'olv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  constructor(private bookService: FetchBookDataService) {}

  errorMessage: string = '';
  message: string = '';
  private _sub!: Subscription;

  contactServer(iBookTitle: string): void {
    console.log("We're here!");
    this._sub = this.bookService.getData(iBookTitle).subscribe({
      next: (_) => {
        console.log('getData call successful!');
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
