import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptPODetailComponent } from './goods-receipt-po-detail.component';

describe('GoodsIssueDetailComponent', () => {
  let component: GoodsReceiptPODetailComponent;
  let fixture: ComponentFixture<GoodsReceiptPODetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoodsReceiptPODetailComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptPODetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
