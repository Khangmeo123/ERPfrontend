import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeOfLegalEntityComponent } from './employee-of-legal-entity.component';

describe('EmployeeOfLegalEntityComponent', () => {
  let component: EmployeeOfLegalEntityComponent;
  let fixture: ComponentFixture<EmployeeOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
