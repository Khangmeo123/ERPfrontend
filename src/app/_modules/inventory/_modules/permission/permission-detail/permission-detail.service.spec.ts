import { TestBed } from '@angular/core/testing';

import { PermissionDetailService } from './permission-detail.service';

describe('PermissionDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissionDetailService = TestBed.get(PermissionDetailService);
    expect(service).toBeTruthy();
  });
});
