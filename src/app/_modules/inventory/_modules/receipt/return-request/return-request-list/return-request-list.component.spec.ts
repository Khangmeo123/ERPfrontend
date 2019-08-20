import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnRequestListComponent } from './return-request-list.component';

describe('GoodsIssueListComponent', () => {
  let component: ReturnRequestListComponent;
  let fixture: ComponentFixture<ReturnRequestListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ReturnRequestListComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnRequestListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
