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
import { BsDropdownModule } from 'ngx-bootstrap';
import { SelectModule } from 'src/app/_shared/modules/select/select.module';
import { DatePickerModule } from 'src/app/_shared/modules/date-picker/date-picker.module';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FiltersModule } from 'src/app/_shared/modules/filters/filters.module';
import { DiscussionModule } from 'src/app/_shared/modules/discussion/discussion.module';
import { ErrorModule } from 'src/app/_shared/components/error/error.module';
import { ReturnListComponent } from './return/return-list/return-list.component';
import { ReturnDetailComponent } from './return/return-detail/return-detail.component';
import { GoodsReceiptDetailComponent } from './goods-receipt/goods-receipt-detail/goods-receipt-detail.component';
import { GoodsReceiptListComponent } from './goods-receipt/goods-receipt-list/goods-receipt-list.component';
import { GoodsReceiptPOApproveComponent } from './goods-receipt-po/goods-receipt-po-approve/goods-receipt-po-approve.component';
import { GoodsReceiptPOReceiveComponent } from './goods-receipt-po/good-receipt-po-receive/goods-receipt-po-receive.component';
import { GoodsReceiptPODetailComponent } from './goods-receipt-po/goods-receipt-po-detail/goods-receipt-po-detail.component';
import { GoodsReceiptPOListComponent } from './goods-receipt-po/goods-receipt-po-list/goods-receipt-po-list.component';
import { ConfirmationPopoverModule } from 'jaja.vn-angular-confirmation-popover';
import {ReturnRequestDetailComponent} from './return-request/return-request-detail/return-request-detail.component';
import {ReturnRequestListComponent} from './return-request/return-request-list/return-request-list.component';
@NgModule({
  declarations: [
    GoodsReceiptPOComponent,
    GoodsReceiptComponent,
    ReturnRequestComponent,
    ReturnComponent,
    GoodsReceiptPODetailComponent,
    GoodsReceiptPOListComponent,
    GoodsReceiptPOApproveComponent,
    GoodsReceiptPOReceiveComponent,
    ReturnListComponent,
    ReturnDetailComponent,
    GoodsReceiptDetailComponent,
    GoodsReceiptListComponent,
    ReturnRequestDetailComponent,
    ReturnRequestListComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
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
    FiltersModule,
    DiscussionModule,
    ErrorModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    }),
  ],
})
export class ReceiptModule { }
