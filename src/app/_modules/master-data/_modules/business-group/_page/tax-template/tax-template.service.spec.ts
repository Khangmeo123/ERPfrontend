import {TestBed} from '@angular/core/testing';

import {TaxTemplateService} from './tax-template.service';

describe('TaxTemplateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxTemplateService = TestBed.get(TaxTemplateService);
    expect(service).toBeTruthy();
  });
});
