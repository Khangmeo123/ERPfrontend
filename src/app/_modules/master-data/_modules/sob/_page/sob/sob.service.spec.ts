import { TestBed } from '@angular/core/testing';

import { SobService } from './sob.service';

describe('SobService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SobService = TestBed.get(SobService);
    expect(service).toBeTruthy();
  });
});
