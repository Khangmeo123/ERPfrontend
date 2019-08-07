import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';
import { GoodsReturnRequestComponent } from './goods-return-request/goods-return-request.component';
import { GoodsReturnComponent } from './goods-return/goods-return.component';
import { GoodsIssueComponent } from './goods-issue/goods-issue.component';
import { DeliveryOrderListComponent } from './delivery-order/delivery-order-list/delivery-order-list.component';
import { DeliveryOrderDetailComponent } from './delivery-order/delivery-order-detail/delivery-order-detail.component';

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
      },
      {
        path: 'goods-return',
        component: GoodsReturnComponent,
      },
      {
        path: 'goods-issue',
        component: GoodsIssueComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IssueRoutingModule { }
