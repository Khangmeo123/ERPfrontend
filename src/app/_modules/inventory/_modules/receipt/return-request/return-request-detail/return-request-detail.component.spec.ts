import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRequestDetailComponent } from './return-request-detail.component';

describe('GoodsIssueDetailComponent', () => {
  let component: ReturnRequestDetailComponent;
  let fixture: ComponentFixture<ReturnRequestDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnRequestDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
