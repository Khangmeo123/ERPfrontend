import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersInGroupComponent } from './customers-in-group.component';

describe('CustomersInGroupComponent', () => {
  let component: CustomersInGroupComponent;
  let fixture: ComponentFixture<CustomersInGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersInGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersInGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
