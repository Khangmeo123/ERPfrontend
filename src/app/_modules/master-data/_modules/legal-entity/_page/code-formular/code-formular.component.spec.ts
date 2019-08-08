import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeFormularComponent } from './code-formular.component';

describe('CodeFormularComponent', () => {
  let component: CodeFormularComponent;
  let fixture: ComponentFixture<CodeFormularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeFormularComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
