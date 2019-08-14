import { TestBed } from '@angular/core/testing';

import { CodeFormulaDetailService } from './code-formula-detail.service';

describe('CodeFormulaDetailService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeFormulaDetailService = TestBed.get(CodeFormulaDetailService);
    expect(service).toBeTruthy();
  });
});
