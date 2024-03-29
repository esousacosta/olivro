import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Route, RouterModule } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material/material.module';
import { BookPageComponent } from './components/book-page/book-page.component';
import { FetchBookDataService } from './services/fetch-book-data.service';
import { ResultsSidebarComponent } from './components/results-sidebar/results-sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

const routes: Route[] = [
  { path: 'results', component: ResultsSidebarComponent },
  { path: 'results/:isbn', component: BookPageComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    NavbarComponent,
    BookPageComponent,
    ResultsSidebarComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [FetchBookDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
