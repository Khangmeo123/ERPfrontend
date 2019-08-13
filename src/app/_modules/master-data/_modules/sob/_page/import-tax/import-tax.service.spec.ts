import { TestBed } from '@angular/core/testing';

import { ImportTaxService } from './import-tax.service';

describe('ImportTaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImportTaxService = TestBed.get(ImportTaxService);
    expect(service).toBeTruthy();
  });
});
