import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsIssueSendComponent } from './goods-issue-send.component';

describe('GoodsReturnApproveComponent', () => {
  let component: GoodsIssueSendComponent;
  let fixture: ComponentFixture<GoodsIssueSendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsIssueSendComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsIssueSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
