import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorybookRoutingModule } from './storybook-routing.module';

import { StorybookComponent } from './_page/storybook/storybook.component';
import { PaymentMethodComponent } from './_page/payment-method/payment-method.component';
import { PaymentTermComponent } from './_page/payment-term/payment-term.component';
import { BankAccountComponent } from './_page/bank-account/bank-account.component';
import { CoaComponent } from './_page/coa/coa.component';
import { AccountantPeriodComponent } from './_page/accountant-period/accountant-period.component';
import { CostCenterComponent } from './_page/cost-center/cost-center.component';
import { ExciseTariffComponent } from './_page/excise-tariff/excise-tariff.component';
import { FiscalYearComponent } from './_page/fiscal-year/fiscal-year.component';
import { ResourceTariffComponent } from './_page/resource-tariff/resource-tariff.component';
import { VoucherComponent } from './_page/voucher/voucher.component';
import { TariffCoaComponent } from './_page/tariff-coa/tariff-coa.component';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'src/app/_shared/modules/date-picker/date-picker.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { PaginationModule } from 'src/app/_shared/modules/pagination/pagination.module';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { MatIconModule } from '@angular/material';

import { FiltersModule } from 'src/app/_shared/modules/filters/filters.module';

@NgModule({
  declarations: [StorybookComponent, BankAccountComponent, CoaComponent, AccountantPeriodComponent, CostCenterComponent,
    ExciseTariffComponent, FiscalYearComponent, PaymentMethodComponent, PaymentTermComponent, ResourceTariffComponent, VoucherComponent,
    TariffCoaComponent],
  imports: [
    CommonModule,
    StorybookRoutingModule,
    TranslateModule,
    TableModule,
    FormsModule,
    DialogModule,
    TranslateModule.forChild(),
    DatePickerModule,
    KeyFilterModule,
    ReactiveFormsModule,
    PaginationModule,
    FiltersModule,
    DialogModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    }),
    // tslint:disable-next-line: trailing-comma
    MatIconModule
  ]
})
export class StorybookModule { }
