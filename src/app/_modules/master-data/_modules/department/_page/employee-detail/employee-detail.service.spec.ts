import { TestBed } from '@angular/core/testing';

import { DepartmentEmployeeDetailService } from './employee-detail.service';

describe('EmployeeDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DepartmentEmployeeDetailService = TestBed.get(DepartmentEmployeeDetailService);
    expect(service).toBeTruthy();
  });
});
