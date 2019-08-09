import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeFormulaDetailComponent } from './code-formula-detail.component';

describe('CodeFormulaDetailComponent', () => {
  let component: CodeFormulaDetailComponent;
  let fixture: ComponentFixture<CodeFormulaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CodeFormulaDetailComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeFormulaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
