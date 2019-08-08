import { TestBed } from '@angular/core/testing';

import { CoaService } from './coa.service';

describe('CoaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CoaService = TestBed.get(CoaService);
    expect(service).toBeTruthy();
  });
});
