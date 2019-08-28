import { TestBed } from '@angular/core/testing';

import { BatchDialogService } from './batch-dialog.service';

describe('BatchDialogService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BatchDialogService = TestBed.get(BatchDialogService);
    expect(service).toBeTruthy();
  });
});
