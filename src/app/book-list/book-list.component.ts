import { Component } from '@angular/core';
import { Book } from 'src/data/book';

@Component({
  // selector: 'olv-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css'],
})
export class BookListComponent {
  books: Book[] = [
    {
      title: 'A Odisséia',
      author: 'Homero',
      price: 'R$ 53,00',
    },
    {
      title: 'A Ilíada',
      author: 'Homero',
      price: 'R$ 50,00',
    },
    {
      title: 'A Ilíada',
      author: 'Homero',
      price: 'R$ 50,00',
    },
    {
      title: 'A Ilíada',
      author: 'Homero',
      price: 'R$ 50,00',
    },
    {
      title: 'A Ilíada',
      author: 'Homero',
      price: 'R$ 50,00',
    },
    {
      title: 'A Ilíada',
      author: 'Homero',
      price: 'R$ 50,00',
    },
    {
      title: 'A Ilíada',
      author: 'Homero',
      price: 'R$ 50,00',
    },
  ];
}
