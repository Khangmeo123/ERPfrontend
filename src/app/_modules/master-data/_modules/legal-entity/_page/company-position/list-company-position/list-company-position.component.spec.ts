import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCompanyPositionComponent } from './list-company-position.component';

describe('ListCompanyPositionComponent', () => {
  let component: ListCompanyPositionComponent;
  let fixture: ComponentFixture<ListCompanyPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCompanyPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCompanyPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
