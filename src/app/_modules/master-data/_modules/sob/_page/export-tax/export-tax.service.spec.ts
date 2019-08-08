import { TestBed } from '@angular/core/testing';

import { ExportTaxService } from './export-tax.service';

describe('ExportTaxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExportTaxService = TestBed.get(ExportTaxService);
    expect(service).toBeTruthy();
  });
});
