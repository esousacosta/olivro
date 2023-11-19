import { TestBed } from '@angular/core/testing';

import { FetchBookDataService } from './fetch-book-data.service';

describe('FetchBookDataService', () => {
  let service: FetchBookDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FetchBookDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
