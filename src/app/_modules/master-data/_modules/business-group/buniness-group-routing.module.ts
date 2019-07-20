import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BusinessGroupComponent } from './_page/business-group/business-group.component';
import { BankComponent } from './_page/bank/bank.component';
import { ItemComponent } from './_page/item/item.component';
import { UomComponent } from './_page/uom/uom.component';
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
import { JobLevelComponent } from './_page/job-level/job-level.component';
import { JobTitleComponent } from './_page/job-title/job-title.component';
import { ItemListComponent } from './_page/item/item-list/item-list.component';
import { ItemDetailComponent } from './_page/item/item-detail/item-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: BusinessGroupComponent },
      { path: 'bank', component: BankComponent },
      {
        path: 'item', component: ItemComponent, children: [
          { path: 'item-list', component: ItemListComponent },
          { path: 'item-detail', component: ItemDetailComponent },
          { path: '', redirectTo: 'item-list', pathMatch: 'full' }
        ],
      },
      { path: 'unit', component: UomComponent },
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
      { path: 'job-level', component: JobLevelComponent },
      { path: 'job-title', component: JobTitleComponent },
      { path: 'currency', component: CurrencyComponent },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessGroupRoutingModule { }
