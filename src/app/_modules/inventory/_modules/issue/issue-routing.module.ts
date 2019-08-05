import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';
import { GoodsReturnRequestComponent } from './goods-return-request/goods-return-request.component';
import { GoodsReturnComponent } from './goods-return/goods-return.component';
import { GoodsIssueComponent } from './goods-issue/goods-issue.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'delivery-order',
        component: DeliveryOrderComponent,
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
