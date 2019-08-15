import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';
import { GoodsReturnRequestComponent } from './goods-return-request/goods-return-request.component';
import { GoodsReturnComponent } from './goods-return/goods-return.component';
import { GoodsIssueComponent } from './goods-issue/goods-issue.component';
import { IssueRoutingModule } from './issue-routing.module';
import {DeliveryOrderListComponent} from './delivery-order/delivery-order-list/delivery-order-list.component';
import {DeliveryOrderDetailComponent} from './delivery-order/delivery-order-detail/delivery-order-detail.component';
import { MatIconModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatTabsModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TableModule } from 'primeng/table';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SelectModule } from 'src/app/_shared/modules/select/select.module';
import { DatePickerModule } from 'src/app/_shared/modules/date-picker/date-picker.module';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { PaginationModule } from 'src/app/_shared/modules/pagination/pagination.module';
import { DiscussionModule } from 'src/app/_shared/modules/discussion/discussion.module';
import {GoodsIssueDetailComponent} from './goods-issue/goods-issue-detail/goods-issue-detail.component';
import {GoodsIssueListComponent} from './goods-issue/goods-issue-list/goods-issue-list.component';
import {GoodsReturnDetailComponent} from './goods-return/goods-return-detail/goods-return-detail.component';
import {GoodsReturnListComponent} from './goods-return/goods-return-list/goods-return-list.component';
import {GoodsReturnRequestListComponent} from './goods-return-request/goods-return-request-list/goods-return-request-list.component';
import {GoodsReturnRequestDetailComponent} from './goods-return-request/goods-return-request-detail/goods-return-request-detail.component';

@NgModule({
  declarations: [
    DeliveryOrderComponent,
    GoodsReturnRequestComponent,
    GoodsReturnComponent,
    GoodsIssueComponent,
    DeliveryOrderListComponent,
    DeliveryOrderDetailComponent,
    GoodsIssueDetailComponent,
    GoodsIssueListComponent,
    GoodsReturnDetailComponent,
    GoodsReturnListComponent,
    GoodsReturnRequestListComponent,
    GoodsReturnRequestDetailComponent],
  imports: [
    CommonModule,
    IssueRoutingModule,
    MatIconModule,
    TranslateModule.forChild(),
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatFormFieldModule,
    TableModule,
    PaginationModule,
    BsDropdownModule.forRoot(),
    SelectModule,
    DatePickerModule,
    MatTabsModule,
    DialogModule,
    InputSwitchModule,
    DiscussionModule,
  ]
})
export class IssueModule { }
