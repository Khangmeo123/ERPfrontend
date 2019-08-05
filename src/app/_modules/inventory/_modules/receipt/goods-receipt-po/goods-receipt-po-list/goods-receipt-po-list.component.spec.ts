import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptPoListComponent } from './goods-receipt-po-list.component';

describe('GoodsReceiptPoListComponent', () => {
  let component: GoodsReceiptPoListComponent;
  let fixture: ComponentFixture<GoodsReceiptPoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceiptPoListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptPoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
