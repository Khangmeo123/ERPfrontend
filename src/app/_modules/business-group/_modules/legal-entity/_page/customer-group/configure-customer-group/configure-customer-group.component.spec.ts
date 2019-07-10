import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureCustomerGroupComponent } from './configure-customer-group.component';

describe('ConfigureCustomerGroupComponent', () => {
  let component: ConfigureCustomerGroupComponent;
  let fixture: ComponentFixture<ConfigureCustomerGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigureCustomerGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigureCustomerGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
