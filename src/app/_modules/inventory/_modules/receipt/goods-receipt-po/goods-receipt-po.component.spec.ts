import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptPOComponent } from './goods-receipt-po.component';

describe('GoodsReceiptPOComponent', () => {
  let component: GoodsReceiptPOComponent;
  let fixture: ComponentFixture<GoodsReceiptPOComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceiptPOComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptPOComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
