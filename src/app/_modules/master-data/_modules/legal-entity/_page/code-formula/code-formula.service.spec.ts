import { TestBed } from '@angular/core/testing';

import { CodeFormulaService } from './code-formula.service';

describe('CodeFormulaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeFormulaService = TestBed.get(CodeFormulaService);
    expect(service).toBeTruthy();
  });
});
