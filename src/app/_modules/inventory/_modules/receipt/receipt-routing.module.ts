import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoodsReceiptPOComponent } from './goods-receipt-po/goods-receipt-po.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { ReturnComponent } from './return/return.component';
import { GoodsReceiptPoListComponent } from './goods-receipt-po/goods-receipt-po-list/goods-receipt-po-list.component';
import { GoodsReceiptPoDetailComponent } from './goods-receipt-po/goods-receipt-po-detail/goods-receipt-po-detail.component';
import { ReturnListComponent} from './return/return-list/return-list.component';
import { ReturnDetailComponent} from './return/return-detail/return-detail.component';
import { GoodsReceiptListComponent } from './goods-receipt/goods-receipt-list/goods-receipt-list.component';
import { GoodsReceiptDetailComponent } from './goods-receipt/goods-receipt-detail/goods-receipt-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'goods-receipt-po',
        component: GoodsReceiptPOComponent,
        children: [
          {
            path: 'goods-receipt-po-list',
            component: GoodsReceiptPoListComponent,
          },
          {
            path: 'goods-receipt-po-detail',
            component: GoodsReceiptPoDetailComponent,
          },
          {
            path: '',
            redirectTo: 'goods-receipt-po-list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'goods-receipt',
        component: GoodsReceiptComponent,
        children: [
          {
            path: 'goods-receipt-list',
            component: GoodsReceiptListComponent,
          },
          {
            path: 'goods-receipt-detail',
            component: GoodsReceiptDetailComponent,
          },
          {
            path: '',
            redirectTo: 'goods-receipt-list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'return-request',
        component: ReturnRequestComponent,
      },
      {
        path: 'return',
        component: ReturnComponent,
        children: [
          {
            path: 'return-list',
            component: ReturnListComponent,
          },
          {
            path: 'return-detail',
            component: ReturnDetailComponent,
          },
          {
            path: '',
            redirectTo: 'return-list',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceiptRoutingModule { }
