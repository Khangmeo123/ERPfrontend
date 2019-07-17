import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
import { SobRoutingModule } from './sob-routing.module';
import { SobComponent } from './_page/sob/sob.component';
import { SelectModule } from 'src/app/_shared/modules/select/select.module';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ValueAddedTaxComponent } from './_page/value-added-tax/value-added-tax.component';
import { EnvironmentTaxComponent } from './_page/environment-tax/environment-tax.component';
import { ImportTaxComponent } from './_page/import-tax/import-tax.component';
import { ExportTaxComponent } from './_page/export-tax/export-tax.component';
import { SpecialConsumptionTaxComponent } from './_page/special-consumption-tax/special-consumption-tax.component';
import { BsDropdownModule } from 'ngx-bootstrap';

@NgModule({
  declarations: [
    SobComponent,
    BankAccountComponent,
    CoaComponent,
    AccountantPeriodComponent,
    CostCenterComponent,
    ExciseTariffComponent,
    FiscalYearComponent,
    PaymentMethodComponent,
    PaymentTermComponent,
    ResourceTariffComponent,
    VoucherComponent,
    ValueAddedTaxComponent,
    EnvironmentTaxComponent,
    ImportTaxComponent,
    ExportTaxComponent,
    SpecialConsumptionTaxComponent,
  ],
  imports: [
    CommonModule,
    SobRoutingModule,
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
    MatIconModule,
    CheckboxModule,
    SelectModule,
    RadioButtonModule,
    BsDropdownModule.forRoot()
  ]
})
export class SobModule { }
