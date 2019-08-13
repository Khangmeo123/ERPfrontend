import { TestBed } from '@angular/core/testing';

import { TaxTemplateDetailService } from './tax-template-detail.service';

describe('TaxTemplateDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxTemplateDetailService = TestBed.get(TaxTemplateDetailService);
    expect(service).toBeTruthy();
  });
});
