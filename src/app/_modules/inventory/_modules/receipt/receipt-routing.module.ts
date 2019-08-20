import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoodsReceiptPOComponent } from './goods-receipt-po/goods-receipt-po.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { ReturnComponent } from './return/return.component';
import { ReturnListComponent } from './return/return-list/return-list.component';
import { ReturnDetailComponent } from './return/return-detail/return-detail.component';
import { GoodsReceiptListComponent } from './goods-receipt/goods-receipt-list/goods-receipt-list.component';
import { GoodsReceiptDetailComponent } from './goods-receipt/goods-receipt-detail/goods-receipt-detail.component';
import { GoodsReceiptPOApproveComponent } from './goods-receipt-po/goods-receipt-po-approve/goods-receipt-po-approve.component';
import { GoodsReceiptPOReceiveComponent } from './goods-receipt-po/good-receipt-po-receive/goods-receipt-po-receive.component';
import { GoodsReceiptPOListComponent } from './goods-receipt-po/goods-receipt-po-list/goods-receipt-po-list.component';
import { ReturnRequestListComponent } from './return-request/return-request-list/return-request-list.component';
import { ReturnRequestDetailComponent } from './return-request/return-request-detail/return-request-detail.component';
import { GoodsReceiptPoDetailComponent } from './goods-receipt-po/goods-receipt-po-detail/goods-receipt-po-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'goods-receipt-po',
        component: GoodsReceiptPOComponent,
        children: [
          {
            path: 'goods-receipt-po-list',
            component: GoodsReceiptPOListComponent,
          },
          {
            path: 'goods-receipt-po-detail',
            component: GoodsReceiptPoDetailComponent,
          },
          {
            path: 'goods-receipt-po-approve',
            component: GoodsReceiptPOApproveComponent,
          },
          {
            path: 'goods-receipt-po-receive',
            component: GoodsReceiptPOReceiveComponent,
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
        children: [
          {
            path: 'return-request-list',
            component: ReturnRequestListComponent,
          },
          {
            path: 'return-request-detail',
            component: ReturnRequestDetailComponent,
          },
          {
            path: '',
            redirectTo: 'return-request-list',
            pathMatch: 'full',
          },
        ],
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
export class ReceiptRoutingModule {
}
