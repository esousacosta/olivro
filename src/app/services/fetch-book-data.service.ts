import { Injectable } from '@angular/core';
import { Book } from '../../models/book';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class FetchBookDataService {
  private bookUrl: string = 'api/books/books.json';
  private serverUrl: string = 'http://localhost:8080/results/';

  bookData$: Subject<Book[]> = new Subject<Book[]>();
  latestSearchResults!: Book[];
  searchCriteria: string = '';

  constructor(
    private http: HttpClient,
    private readonly supabase: SupabaseService
  ) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl).pipe(
      tap((data) => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  async getData(iBookTitle: string): Promise<Book[]> {
    this.searchCriteria = iBookTitle;

    try {
      let data = await this.supabase.getBooksByTitle(iBookTitle);
      let books: Book[] = JSON.parse(JSON.stringify(data));
      this.bookData$.next(books);
      this.latestSearchResults = books;
      return books;
    } catch (err) {
      console.log(`Cascading supabase error: ${err}`);
      return [];
    }
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string = '';
    if (err.error instanceof ErrorEvent) {
      // Client side error
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // Server side issue
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(() => errorMessage);
  }
}
