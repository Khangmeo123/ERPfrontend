import {TestBed} from '@angular/core/testing';

import {PermissionListService} from './permission-list.service';

describe('PermissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PermissionListService = TestBed.get(PermissionListService);
    expect(service).toBeTruthy();
  });
});
