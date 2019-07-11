import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessGroupComponent } from './_page/business-group/business-group.component';
import { BankComponent } from './_page/bank/bank.component';
import { ProductComponent } from './_page/product/product.component';
import { ListProductComponent } from './_page/product/list-product/list-product.component';
import { DetailProductComponent } from './_page/product/detail-product/detail-product.component';
import { UnitComponent } from './_page/unit/unit.component';
import { AssetComponent } from './_page/asset/asset.component';
import { EmployeeComponent } from './_page/employee/employee.component';
import { ListEmployeeComponent } from './_page/employee/list-employee/list-employee.component';
import { DetailEmployeeComponent } from './_page/employee/detail-employee/detail-employee.component';
import { CustomerComponent } from './_page/customer/customer.component';
import { ListCustomerComponent } from './_page/customer/list-customer/list-customer.component';
import { DetailCustomerComponent } from './_page/customer/detail-customer/detail-customer.component';
import { SupplierComponent } from './_page/supplier/supplier.component';
import { ListSupplierComponent } from './_page/supplier/list-supplier/list-supplier.component';
import { DetailSupplierComponent } from './_page/supplier/detail-supplier/detail-supplier.component';
import { CurrencyComponent } from './_page/currency/currency.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: BusinessGroupComponent },
      { path: 'bank', component: BankComponent },
      {
        path: 'product', component: ProductComponent, children: [
          { path: 'list-product', component: ListProductComponent },
          { path: 'detail-product', component: DetailProductComponent },
          { path: '', redirectTo: 'list-product', pathMatch: 'full' }
        ],
      },
      { path: 'unit', component: UnitComponent },
      { path: 'asset', component: AssetComponent },
      {
        path: 'employee', component: EmployeeComponent, children: [
          { path: 'list-employee', component: ListEmployeeComponent },
          { path: 'detail-employee', component: DetailEmployeeComponent },
          { path: '', redirectTo: 'list-employee', pathMatch: 'full' },
        ]
      },
      {
        path: 'customer', component: CustomerComponent, children: [
          { path: 'list-customer', component: ListCustomerComponent },
          { path: 'detail-customer', component: DetailCustomerComponent },
          { path: '', redirectTo: 'list-customer', pathMatch: 'full' },
        ]
      },
      {
        path: 'supplier', component: SupplierComponent, children: [
          { path: 'list-supplier', component: ListSupplierComponent },
          { path: 'detail-supplier', component: DetailSupplierComponent },
          { path: '', redirectTo: 'list-supplier', pathMatch: 'full' },
        ],
      },
      { path: 'currency', component: CurrencyComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessGroupRoutingModule { }
