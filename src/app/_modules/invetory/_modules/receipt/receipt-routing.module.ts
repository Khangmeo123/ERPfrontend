import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsReceiptPOComponent } from './goods-receipt-po/goods-receipt-po.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { ReturnComponent } from './return/return.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'goods-receipt-po',
        component: GoodsReceiptPOComponent,
      },
      {
        path: 'goods-receipt',
        component: GoodsReceiptComponent,
      },
      {
        path: 'return-request',
        component: ReturnRequestComponent,
      },
      {
        path: 'return',
        component: ReturnComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptRoutingModule { }
