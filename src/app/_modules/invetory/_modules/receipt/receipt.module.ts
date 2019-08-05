import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsReceiptPOComponent } from './goods-receipt-po/goods-receipt-po.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { ReturnComponent } from './return/return.component';

@NgModule({
  declarations: [GoodsReceiptPOComponent, GoodsReceiptComponent, ReturnRequestComponent, ReturnComponent],
  imports: [
    CommonModule
  ]
})
export class ReceiptModule { }
