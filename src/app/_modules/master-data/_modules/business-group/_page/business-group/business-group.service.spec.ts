import { TestBed } from '@angular/core/testing';

import { BusinessGroupService } from './business-group.service';

describe('BusinessGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BusinessGroupService = TestBed.get(BusinessGroupService);
    expect(service).toBeTruthy();
  });
});
