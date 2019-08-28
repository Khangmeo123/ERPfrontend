import { TestBed } from '@angular/core/testing';

import { SeriralNumberService } from './seriral-number.service';

describe('SeriralNumberService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SeriralNumberService = TestBed.get(SeriralNumberService);
    expect(service).toBeTruthy();
  });
});
