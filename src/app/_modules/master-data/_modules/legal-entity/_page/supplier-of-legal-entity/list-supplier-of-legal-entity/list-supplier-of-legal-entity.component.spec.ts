import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSupplierOfLegalEntityComponent } from './list-supplier-of-legal-entity.component';

describe('ListSupplierOfLegalEntityComponent', () => {
  let component: ListSupplierOfLegalEntityComponent;
  let fixture: ComponentFixture<ListSupplierOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListSupplierOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSupplierOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
