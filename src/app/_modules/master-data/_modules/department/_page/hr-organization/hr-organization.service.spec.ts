import { TestBed } from '@angular/core/testing';

import { HrOrganizationService } from './hr-organization.service';

describe('HrOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HrOrganizationService = TestBed.get(HrOrganizationService);
    expect(service).toBeTruthy();
  });
});
