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

  private navigateToResultsPage() {
    this.router.navigate(['/results']);
  }

  bookSearch(iBookTitle: string): void {
    this.navigateToResultsPage();
    this.bookService
      .getData(iBookTitle)
      .then((data) => {
        console.log('getData call successful!');
      })
      .catch((err) => console.log(err));
  }
}
