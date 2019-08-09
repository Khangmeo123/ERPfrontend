import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptPoDetailComponent } from './goods-receipt-po-detail.component';

describe('GoodsIssueDetailComponent', () => {
  let component: GoodsReceiptPoDetailComponent;
  let fixture: ComponentFixture<GoodsReceiptPoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceiptPoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptPoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
