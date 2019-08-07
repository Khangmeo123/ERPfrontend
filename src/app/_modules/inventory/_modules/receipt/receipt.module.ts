import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoodsReceiptPOComponent } from './goods-receipt-po/goods-receipt-po.component';
import { GoodsReceiptComponent } from './goods-receipt/goods-receipt.component';
import { ReturnRequestComponent } from './return-request/return-request.component';
import { ReturnComponent } from './return/return.component';
import { ReceiptRoutingModule } from './receipt-routing.module';
import { MatIconModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatTabsModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { TableModule } from 'primeng/table';
import { PaginationModule } from 'src/app/_shared/modules/pagination/pagination.module';
import { GoodsReceiptPoDetailComponent } from './goods-receipt-po/goods-receipt-po-detail/goods-receipt-po-detail.component';
import { GoodsReceiptPoListComponent } from './goods-receipt-po/goods-receipt-po-list/goods-receipt-po-list.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { SelectModule } from 'src/app/_shared/modules/select/select.module';
import { DatePickerModule } from 'src/app/_shared/modules/date-picker/date-picker.module';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { DiscussionModule } from 'src/app/_shared/modules/discussion/discussion.module';
import {ReturnListComponent} from './return/return-list/return-list.component';
import {ReturnDetailComponent} from './return/return-detail/return-detail.component';
import { GoodsReceiptDetailComponent } from './goods-receipt/goods-receipt-detail/goods-receipt-detail.component';
import { GoodsReceiptListComponent } from './goods-receipt/goods-receipt-list/goods-receipt-list.component';

@NgModule({
  declarations: [
    GoodsReceiptPOComponent,
    GoodsReceiptComponent,
    ReturnRequestComponent,
    ReturnComponent,
    GoodsReceiptPoDetailComponent,
    GoodsReceiptPoListComponent,
    ReturnListComponent,
    ReturnDetailComponent,
    GoodsReceiptDetailComponent,
    GoodsReceiptListComponent,],
  imports: [
    CommonModule,
    ReceiptRoutingModule,
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
export class ReceiptModule { }
