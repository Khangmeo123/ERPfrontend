import {TestBed} from '@angular/core/testing';

import {CodeFormulaListService} from './code-formula-list.service';

describe('CodeFormulaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CodeFormulaListService = TestBed.get(CodeFormulaListService);
    expect(service).toBeTruthy();
  });
});
