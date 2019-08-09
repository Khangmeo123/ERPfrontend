import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeFormulaComponent } from './code-formula.component';

describe('CodeFormulaComponent', () => {
  let component: CodeFormulaComponent;
  let fixture: ComponentFixture<CodeFormulaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeFormulaComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeFormulaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
