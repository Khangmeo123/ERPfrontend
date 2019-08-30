import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColumnTogglerComponent } from './column-toggler.component';

describe('ColumnTogglerComponent', () => {
  let component: ColumnTogglerComponent;
  let fixture: ComponentFixture<ColumnTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColumnTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
