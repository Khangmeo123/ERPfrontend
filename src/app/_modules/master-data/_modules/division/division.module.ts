import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionRoutingModule } from './division-routing.module';
import { MatIconModule } from '@angular/material';
import { DivisionComponent } from './_page/division/division.component';
import { TranslateModule } from '@ngx-translate/core';
import { SelectModule } from '../../../../_shared/modules/select/select.module';
import { FiltersModule } from '../../../../_shared/modules/filters/filters.module';
import { TableModule } from 'primeng/table';
import { PaginationModule } from 'src/app/_shared/modules/pagination/pagination.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ErrorModule } from 'src/app/_shared/components/error/error.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
  declarations: [DivisionComponent],
  imports: [
    CommonModule,
    DivisionRoutingModule,
    TranslateModule.forChild(),
    MatIconModule,
    SelectModule,
    FiltersModule,
    TableModule,
    PaginationModule,
    DialogModule,
    ConfirmationPopoverModule.forRoot(),
    ErrorModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class DivisionModule { }
