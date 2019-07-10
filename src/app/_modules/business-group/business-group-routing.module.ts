import { ListCustomerComponent } from './_pages/customer/list-customer/list-customer.component';
import { ListSupplierComponent } from './_pages/supplier/list-supplier/list-supplier.component';
import { VoucherComponent } from './_pages/voucher/voucher.component';
import { AccountantPeriodComponent } from './_pages/accountant-period/accountant-period.component';
import { AssetComponent } from './_pages/asset/asset.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnitComponent } from './_pages/product/unit/unit.component';
import { ProductComponent } from './_pages/product/product.component';
import { ListProductComponent } from './_pages/product/list-product/list-product.component';
import { BankComponent } from './_pages/bank/bank.component';
import { EmployeeComponent } from './_pages/employee/employee.component';
import { CustomerComponent } from './_pages/customer/customer.component';
import { SupplierComponent } from './_pages/supplier/supplier.component';
import { CurrencyComponent } from './_pages/currency/currency.component';
import { StorybookComponent } from './_pages/storybook/storybook.component';
import { CostCenterComponent } from './_pages/cost-center/cost-center.component';
import { FiscalYearComponent } from './_pages/fiscal-year/fiscal-year.component';
import { PaymentMethodComponent } from './_pages/payment-method/payment-method.component';
import { PaymentTermComponent } from './_pages/payment-term/payment-term.component';
import { DivisionComponent } from './_pages/division/division.component';
import { DeparmentComponent } from './_pages/deparment/deparment.component';
import { DetailProductComponent } from './_pages/product/detail-product/detail-product.component';
import { DetailSupplierComponent } from './_pages/supplier/detail-supplier/detail-supplier.component';
import { ListEmployeeComponent } from './_pages/employee/list-employee/list-employee.component';
import { DetailEmployeeComponent } from './_pages/employee/detail-employee/detail-employee.component';
import { DetailCustomerComponent } from './_pages/customer/detail-customer/detail-customer.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'bank', component: BankComponent },
      {
        path: 'product', component: ProductComponent, children: [
          { path: 'list-product', component: ListProductComponent },
          { path: 'detail-product', component: DetailProductComponent },
          { path: 'unit', component: UnitComponent },
        ],
      },
      { path: 'asset', component: AssetComponent },
      {
        path: 'employee', component: EmployeeComponent, children: [
          { path: 'list-employee', component: ListEmployeeComponent },
          { path: 'detail-employee', component: DetailEmployeeComponent },
        ]
      },
      {
        path: 'customer', component: CustomerComponent, children: [
          { path: 'list-customer', component: ListCustomerComponent },
          { path: 'detail-customer', component: DetailCustomerComponent },
        ]
      },
      {
        path: 'supplier', component: SupplierComponent, children: [
          { path: 'list-supplier', component: ListSupplierComponent },
          { path: 'detail-supplier', component: DetailSupplierComponent },
        ],
      },
      { path: 'currency', component: CurrencyComponent },
      { path: 'storybook', component: StorybookComponent },
      { path: 'tariff-coa', loadChildren: () => import('./_modules/tariff-coa/tariff-coa.module').then(m => m.TariffCoaModule) },
      { path: 'cost-center', component: CostCenterComponent },
      { path: 'fiscal-year', component: FiscalYearComponent },
      { path: 'accountant-period', component: AccountantPeriodComponent },
      { path: 'voucher', component: VoucherComponent },
      { path: 'payment-method', component: PaymentMethodComponent },
      { path: 'payment-term', component: PaymentTermComponent },
      { path: 'legal-entity', loadChildren: () => import('./_modules/legal-entity/legal-entity.module').then(m => m.LegalEntityModule) },
      { path: 'division', component: DivisionComponent },
      { path: 'department', component: DeparmentComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessGroupRoutingModule { }
