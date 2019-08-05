import { TestBed } from '@angular/core/testing';

import { SpecialConsumptionTaxService } from './special-consumption-tax.service';

describe('SpecialConsumptionTaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpecialConsumptionTaxService = TestBed.get(SpecialConsumptionTaxService);
    expect(service).toBeTruthy();
  });
});
