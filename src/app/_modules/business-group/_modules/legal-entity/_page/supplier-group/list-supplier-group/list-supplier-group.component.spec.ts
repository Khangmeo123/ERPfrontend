import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplierGroupComponent } from './list-supplier-group.component';

describe('ListSupplierGroupComponent', () => {
  let component: ListSupplierGroupComponent;
  let fixture: ComponentFixture<ListSupplierGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSupplierGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupplierGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
