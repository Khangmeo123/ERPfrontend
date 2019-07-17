import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmployeeOfLegalEntityComponent } from './list-employee-of-legal-entity.component';

describe('ListEmployeeOfLegalEntityComponent', () => {
  let component: ListEmployeeOfLegalEntityComponent;
  let fixture: ComponentFixture<ListEmployeeOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListEmployeeOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListEmployeeOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
