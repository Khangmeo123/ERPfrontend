import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BankAccountComponent } from './_page/bank-account/bank-account.component';
import { CoaComponent } from './_page/coa/coa.component';
import { ResourceTaxComponent } from './_page/resource-tax/resource-tax.component';
import { CostCenterComponent } from './_page/cost-center/cost-center.component';
import { FiscalYearComponent } from './_page/fiscal-year/fiscal-year.component';
import { AccountingPeriodComponent } from './_page/accounting-period/accounting-period.component';
import { VoucherComponent } from './_page/voucher/voucher.component';
import { PaymentMethodComponent } from './_page/payment-method/payment-method.component';
import { PaymentTermComponent } from './_page/payment-term/payment-term.component';
import { SobComponent } from './_page/sob/sob.component';
import {ValueAddedTaxComponent} from './_page/value-added-tax/value-added-tax.component';
import {EnvironmentTaxComponent} from './_page/environment-tax/environment-tax.component';
import {ImportTaxComponent} from './_page/import-tax/import-tax.component';
import {ExportTaxComponent} from './_page/export-tax/export-tax.component';
import {SpecialConsumptionTaxComponent} from './_page/special-consumption-tax/special-consumption-tax.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: SobComponent },
      { path: 'bank-account', component: BankAccountComponent },
      { path: 'coa', component: CoaComponent },
      { path: 'special-consumption-tax', component: SpecialConsumptionTaxComponent },
      { path: 'resource-tax', component: ResourceTaxComponent },
      { path: 'cost-center', component: CostCenterComponent },
      { path: 'fiscal-year', component: FiscalYearComponent },
      { path: 'accounting-period', component: AccountingPeriodComponent },
      { path: 'voucher', component: VoucherComponent },
      { path: 'payment-method', component: PaymentMethodComponent },
      { path: 'value-added-tax', component: ValueAddedTaxComponent },
      { path: 'environment-tax', component: EnvironmentTaxComponent },
      { path: 'import-tax', component: ImportTaxComponent },
      { path: 'export-tax', component: ExportTaxComponent },
      { path: 'payment-term', component: PaymentTermComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SobRoutingModule { }
