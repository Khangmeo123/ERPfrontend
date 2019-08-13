import { TestBed } from '@angular/core/testing';

import { EnvironmentTaxService } from './environment-tax.service';

describe('EnvironmentTaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvironmentTaxService = TestBed.get(EnvironmentTaxService);
    expect(service).toBeTruthy();
  });
});
