import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrOrganizationComponent } from './hr-organization.component';

describe('EmployeeComponent', () => {
  let component: HrOrganizationComponent;
  let fixture: ComponentFixture<HrOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
