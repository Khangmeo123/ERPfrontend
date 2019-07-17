import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierOfLegalEntityComponent } from './supplier-of-legal-entity.component';

describe('SupplierOfLegalEntityComponent', () => {
  let component: SupplierOfLegalEntityComponent;
  let fixture: ComponentFixture<SupplierOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
