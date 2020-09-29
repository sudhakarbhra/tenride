import { TestBed } from '@angular/core/testing';

import { TripRemoveService } from './trip-remove.service';

describe('TripRemoveService', () => {
  let service: TripRemoveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripRemoveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
