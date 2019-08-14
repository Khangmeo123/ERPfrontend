import { TestBed } from '@angular/core/testing';

import { PaymentTermService } from './payment-term.service';

describe('PaymentTermService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentTermService = TestBed.get(PaymentTermService);
    expect(service).toBeTruthy();
  });
});
