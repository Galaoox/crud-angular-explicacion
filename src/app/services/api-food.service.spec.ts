import { TestBed } from '@angular/core/testing';

import { ApiFoodService } from './api-food.service';

describe('ApiFoodService', () => {
  let service: ApiFoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
