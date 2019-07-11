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

@NgModule({
  declarations: [StorybookComponent, BankAccountComponent, CoaComponent, AccountantPeriodComponent, CostCenterComponent,
    ExciseTariffComponent, FiscalYearComponent, PaymentMethodComponent, PaymentTermComponent, ResourceTariffComponent, VoucherComponent,
    TariffCoaComponent],
  imports: [
    CommonModule,
    StorybookRoutingModule,
  ]
})
export class StorybookModule { }
