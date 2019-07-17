import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListOfLegalEntityComponent } from './customer-list-of-legal-entity.component';

describe('CustomerListOfLegalEntityComponent', () => {
  let component: CustomerListOfLegalEntityComponent;
  let fixture: ComponentFixture<CustomerListOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerListOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerListOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
