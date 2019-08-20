import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptPOListComponent } from './goods-receipt-po-list.component';

describe('GoodsIssueListComponent', () => {
  let component: GoodsReceiptPOListComponent;
  let fixture: ComponentFixture<GoodsReceiptPOListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GoodsReceiptPOListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptPOListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
