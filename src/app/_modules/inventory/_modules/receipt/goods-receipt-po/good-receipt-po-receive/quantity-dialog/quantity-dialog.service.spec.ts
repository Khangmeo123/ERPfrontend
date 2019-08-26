import {TestBed} from '@angular/core/testing';

import {QuantityDialogService} from './quantity-dialog.service';

describe('QuantityDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: QuantityDialogService = TestBed.get(QuantityDialogService);
    expect(service).toBeTruthy();
  });
});
