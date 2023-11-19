import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AppComponent, BookListComponent, NavbarComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([{ path: 'books', component: BookListComponent }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
