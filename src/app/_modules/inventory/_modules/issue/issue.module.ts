import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';
import { GoodsReturnRequestComponent } from './goods-return-request/goods-return-request.component';
import { GoodsReturnComponent } from './goods-return/goods-return.component';
import { GoodsIssueComponent } from './goods-issue/goods-issue.component';
import { IssueRoutingModule } from './issue-routing.module';

@NgModule({
  declarations: [DeliveryOrderComponent, GoodsReturnRequestComponent, GoodsReturnComponent, GoodsIssueComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
  ]
})
export class IssueModule { }
