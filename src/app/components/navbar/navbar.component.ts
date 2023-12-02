import { Component, Output, EventEmitter } from '@angular/core';
import { FetchBookDataService } from '../../services/fetch-book-data.service';
import { Observable, Subscription } from 'rxjs';
import { Book } from 'src/models/book';
import { Router } from '@angular/router';

@Component({
  selector: 'olv-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private bookService: FetchBookDataService,
    private router: Router
  ) {}

  errorMessage: string = '';
  message: string = '';
  private _sub!: Subscription;

  private navigateToResultsPage() {
    this.router.navigate(['/books']);
  }

  bookSearch(iBookTitle: string): void {
    this.navigateToResultsPage();
    this._sub = this.bookService.getData(iBookTitle).subscribe({
      next: (_) => {
        console.log('getData call successful!');
      },
      error: (err) => (this.errorMessage = err),
    });
  }
}
