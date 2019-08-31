import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableColumnTogglerComponent } from './table-column-toggler.component';

describe('TableColumnTogglerComponent', () => {
  let component: TableColumnTogglerComponent;
  let fixture: ComponentFixture<TableColumnTogglerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableColumnTogglerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableColumnTogglerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
