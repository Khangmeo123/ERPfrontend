import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCustomerOfLegalEntityComponent } from './detail-customer-of-legal-entity.component';

describe('DetailCustomerOfLegalEntityComponent', () => {
  let component: DetailCustomerOfLegalEntityComponent;
  let fixture: ComponentFixture<DetailCustomerOfLegalEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCustomerOfLegalEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCustomerOfLegalEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
