import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsIssueApproveComponent } from './goods-issue-approve.component';

describe('GoodsReturnApproveComponent', () => {
  let component: GoodsIssueApproveComponent;
  let fixture: ComponentFixture<GoodsIssueApproveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsIssueApproveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsIssueApproveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
