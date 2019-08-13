import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryTransferRequestComponent } from './inventory-transfer-request/inventory-transfer-request.component';
import { InventoryTransferComponent } from './inventory-transfer/inventory-transfer.component';
import {TransferRoutingModule} from './transfer-routing.module';
import {InventoryTransferListComponent} from './inventory-transfer/inventory-transfer-list/inventory-transfer-list.component';
import {InventoryTransferDetailComponent} from './inventory-transfer/inventory-transfer-detail/inventory-transfer-detail.component';
import {MatDatepickerModule, MatFormFieldModule, MatIconModule, MatNativeDateModule, MatTabsModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {TableModule} from 'primeng/table';
import {PaginationModule} from '../../../../_shared/modules/pagination/pagination.module';
import {BsDropdownModule} from 'ngx-bootstrap';
import {SelectModule} from '../../../../_shared/modules/select/select.module';
import {DatePickerModule} from '../../../../_shared/modules/date-picker/date-picker.module';
import {DialogModule} from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import {DiscussionModule} from '../../../../_shared/modules/discussion/discussion.module';
import {InventoryTransferRequestDetailComponent} from './inventory-transfer-request/inventory-transfer-request-detail/inventory-transfer-request-detail.component';
import {InventoryTransferRequestListComponent} from './inventory-transfer-request/inventory-transfer-request-list/inventory-transfer-request-list.component';

@NgModule({
  declarations: [
    InventoryTransferRequestComponent,
    InventoryTransferComponent,
    InventoryTransferListComponent,
    InventoryTransferDetailComponent,
    InventoryTransferRequestDetailComponent,
    InventoryTransferRequestListComponent],
  imports: [
    CommonModule,
    TransferRoutingModule,
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
export class TransferModule { }
