import { Component } from '@angular/core';
import { FetchBookDataService } from '../services/fetch-book-data.service';
import { Observable, Subscription } from 'rxjs';

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

  contactServer(): void {
    console.log("We're here!");
    this._sub = this.bookService.getData().subscribe({
      next: (message) => (this.message = message),
      error: (err) => (this.errorMessage = err),
    });
  }
}
