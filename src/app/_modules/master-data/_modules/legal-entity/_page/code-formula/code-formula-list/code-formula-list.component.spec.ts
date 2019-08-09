import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeFormulaListComponent } from './code-formula-list.component';

describe('CodeFormulaComponent', () => {
  let component: CodeFormulaListComponent;
  let fixture: ComponentFixture<CodeFormulaListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeFormulaListComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeFormulaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
