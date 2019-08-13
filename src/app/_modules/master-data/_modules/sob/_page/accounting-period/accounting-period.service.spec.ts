import { TestBed } from '@angular/core/testing';

import { AccountingPeriodService } from './accounting-period.service';

describe('AccountingPeriodService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AccountingPeriodService = TestBed.get(AccountingPeriodService);
    expect(service).toBeTruthy();
  });
});
