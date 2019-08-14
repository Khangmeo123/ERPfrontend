import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryCountingComponent } from './inventory-counting/inventory-counting.component';
import { InventoryPostingComponent } from './inventory-posting/inventory-posting.component';
import { InventoryCountingCycleComponent } from './inventory-counting-cycle/inventory-counting-cycle.component';
import { CountingRoutingModule } from './counting-routing.module';
import { InventoryCountingListComponent } from './inventory-counting/inventory-counting-list/inventory-counting-list.component';
import { InventoryCountingDetailComponent } from './inventory-counting/inventory-counting-detail/inventory-counting-detail.component';
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
import { FiltersModule } from 'src/app/_shared/modules/filters/filters.module';
import { DiscussionModule } from 'src/app/_shared/modules/discussion/discussion.module';
import { ErrorModule } from 'src/app/_shared/components/error/error.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/_helpers';
import { FormsModule } from '@angular/forms';
import {ConfirmationPopoverModule} from 'jaja.vn-angular-confirmation-popover';

@NgModule({
  declarations: [
    InventoryCountingCycleComponent,
    InventoryCountingListComponent,
    InventoryCountingDetailComponent,
    InventoryCountingComponent,
    InventoryPostingComponent,
    InventoryCountingCycleComponent],
  imports: [
    CommonModule,
    CountingRoutingModule,
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
    FormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class CountingModule { }
