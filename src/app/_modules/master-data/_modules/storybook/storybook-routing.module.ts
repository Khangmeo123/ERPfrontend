import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StorybookComponent } from './_page/storybook/storybook.component';
import { BankAccountComponent } from './_page/bank-account/bank-account.component';
import { CoaComponent } from './_page/coa/coa.component';
import { ResourceTariffComponent } from './_page/resource-tariff/resource-tariff.component';
import { CostCenterComponent } from './_page/cost-center/cost-center.component';
import { FiscalYearComponent } from './_page/fiscal-year/fiscal-year.component';
import { AccountantPeriodComponent } from './_page/accountant-period/accountant-period.component';
import { VoucherComponent } from './_page/voucher/voucher.component';
import { PaymentMethodComponent } from './_page/payment-method/payment-method.component';
import { ExciseTariffComponent } from './_page/excise-tariff/excise-tariff.component';
import { PaymentTermComponent } from './_page/payment-term/payment-term.component';
import { TariffCoaComponent } from './_page/tariff-coa/tariff-coa.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: StorybookComponent },
      { path: 'bank-account', component: BankAccountComponent },
      { path: 'tariff-coa', component: TariffCoaComponent },
      { path: 'coa', component: CoaComponent },
      { path: 'excise-tariff', component: ExciseTariffComponent },
      { path: 'resource-tariff', component: ResourceTariffComponent },
      { path: 'cost-center', component: CostCenterComponent },
      { path: 'fiscal-year', component: FiscalYearComponent },
      { path: 'accountant-period', component: AccountantPeriodComponent },
      { path: 'voucher', component: VoucherComponent },
      { path: 'payment-method', component: PaymentMethodComponent },
      { path: 'payment-term', component: PaymentTermComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StorybookRoutingModule { }
