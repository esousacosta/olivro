import { Injectable } from '@angular/core';
import { Book } from '../../data/book';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchBookDataService {
  private bookUrl: string = 'api/books/books.json';
  private serverUrl: string = 'http://localhost:8080/ping';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.bookUrl).pipe(
      tap((data) => console.log('All: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getData(): Observable<string> {
    return this.http.get<string>(this.serverUrl).pipe(
      tap((data) => console.log('Now: ', JSON.stringify(data))),
      catchError(this.handleError)
    );
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
