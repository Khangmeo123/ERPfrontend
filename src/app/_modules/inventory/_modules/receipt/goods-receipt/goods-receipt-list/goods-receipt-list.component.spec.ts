import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsReceiptListComponent } from './goods-receipt-list.component';

describe('GoodsIssueListComponent', () => {
  let component: GoodsReceiptListComponent;
  let fixture: ComponentFixture<GoodsReceiptListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoodsReceiptListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoodsReceiptListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
