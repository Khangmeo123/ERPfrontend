import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCustomerGroupComponent } from './list-customer-group.component';

describe('ListCustomerGroupComponent', () => {
  let component: ListCustomerGroupComponent;
  let fixture: ComponentFixture<ListCustomerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCustomerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCustomerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
