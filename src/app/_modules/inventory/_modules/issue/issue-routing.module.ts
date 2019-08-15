import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';
import { GoodsReturnRequestComponent } from './goods-return-request/goods-return-request.component';
import { GoodsReturnComponent } from './goods-return/goods-return.component';
import { GoodsIssueComponent } from './goods-issue/goods-issue.component';
import { DeliveryOrderListComponent } from './delivery-order/delivery-order-list/delivery-order-list.component';
import { DeliveryOrderDetailComponent } from './delivery-order/delivery-order-detail/delivery-order-detail.component';
import {GoodsIssueListComponent} from './goods-issue/goods-issue-list/goods-issue-list.component';
import {GoodsIssueDetailComponent} from './goods-issue/goods-issue-detail/goods-issue-detail.component';
import {GoodsReturnListComponent} from './goods-return/goods-return-list/goods-return-list.component';
import {GoodsReturnDetailComponent} from './goods-return/goods-return-detail/goods-return-detail.component';
import {GoodsReturnRequestListComponent} from './goods-return-request/goods-return-request-list/goods-return-request-list.component';
import {GoodsReturnRequestDetailComponent} from './goods-return-request/goods-return-request-detail/goods-return-request-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'delivery-order',
        component: DeliveryOrderComponent,
        children: [
          {
            path: 'delivery-order-list',
            component: DeliveryOrderListComponent,
          },
          {
            path: 'delivery-order-detail',
            component: DeliveryOrderDetailComponent,
          },
          {
            path: '',
            redirectTo: 'delivery-order-list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'goods-return-request',
        component: GoodsReturnRequestComponent,
        children: [
          {
            path: 'goods-return-request-list',
            component: GoodsReturnRequestListComponent,
          },
          {
            path: 'goods-return-request-detail',
            component: GoodsReturnRequestDetailComponent,
          },
          {
            path: '',
            redirectTo: 'goods-return-request-list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'goods-return',
        component: GoodsReturnComponent,
        children: [
          {
            path: 'goods-return-list',
            component: GoodsReturnListComponent,
          },
          {
            path: 'goods-return-detail',
            component: GoodsReturnDetailComponent,
          },
          {
            path: '',
            redirectTo: 'goods-return-list',
            pathMatch: 'full',
          },
        ],
      },
      {
        path: 'goods-issue',
        component: GoodsIssueComponent,
        children: [
          {
            path: 'goods-issue-list',
            component: GoodsIssueListComponent,
          },
          {
            path: 'goods-issue-detail',
            component: GoodsIssueDetailComponent,
          },
          {
            path: '',
            redirectTo: 'goods-issue-list',
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
export class IssueRoutingModule { }
