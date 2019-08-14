import { TestBed } from '@angular/core/testing';

import { AssetOrganizationService } from './asset-organization.service';

describe('AssetOrganizationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssetOrganizationService = TestBed.get(AssetOrganizationService);
    expect(service).toBeTruthy();
  });
});
