import { TestBed } from '@angular/core/testing';

import { BinLocationService } from './bin-location.service';

describe('BinLocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BinLocationService = TestBed.get(BinLocationService);
    expect(service).toBeTruthy();
  });
});
