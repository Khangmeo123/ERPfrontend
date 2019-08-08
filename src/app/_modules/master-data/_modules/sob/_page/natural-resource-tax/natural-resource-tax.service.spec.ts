import { TestBed } from '@angular/core/testing';

import { NaturalResourceTaxService } from './natural-resource-tax.service';

describe('NaturalResourceTaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NaturalResourceTaxService = TestBed.get(NaturalResourceTaxService);
    expect(service).toBeTruthy();
  });
});
