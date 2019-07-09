import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBodyComponent } from './select-body.component';

describe('SelectBodyComponent', () => {
  let component: SelectBodyComponent;
  let fixture: ComponentFixture<SelectBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
