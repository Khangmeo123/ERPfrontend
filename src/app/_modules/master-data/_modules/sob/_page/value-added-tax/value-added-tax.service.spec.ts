import { TestBed } from '@angular/core/testing';

import { ValueAddedTaxService } from './value-added-tax.service';

describe('ValueAddedTaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ValueAddedTaxService = TestBed.get(ValueAddedTaxService);
    expect(service).toBeTruthy();
  });
});
