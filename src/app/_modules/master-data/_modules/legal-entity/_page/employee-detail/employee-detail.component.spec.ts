import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmployeeOfLegalEntityComponent } from './detail-employee-of-legal-entity.component';

describe('DetailEmployeeOfLegalEntityComponent', () => {
  let component: DetailEmployeeOfLegalEntityComponent;
  let fixture: ComponentFixture<DetailEmployeeOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailEmployeeOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmployeeOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
