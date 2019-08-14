import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {BusinessGroupComponent} from './_page/business-group/business-group.component';
import {BankComponent} from './_page/bank/bank.component';
import {ItemComponent} from './_page/item/item.component';
import {UomComponent} from './_page/uom/uom.component';
import {AssetComponent} from './_page/asset/asset.component';
import {EmployeeComponent} from './_page/employee/employee.component';
import {CustomerComponent} from './_page/customer/customer.component';
import {SupplierComponent} from './_page/supplier/supplier.component';
import {CurrencyComponent} from './_page/currency/currency.component';
import {JobLevelComponent} from './_page/job-level/job-level.component';
import {JobTitleComponent} from './_page/job-title/job-title.component';
import {ItemListComponent} from './_page/item/item-list/item-list.component';
import {ItemDetailComponent} from './_page/item/item-detail/item-detail.component';
import {EmployeeListComponent} from './_page/employee/employee-list/employee-list.component';
import {EmployeeDetailComponent} from './_page/employee/employee-detail/employee-detail.component';
import {SupplierListComponent} from './_page/supplier/supplier-list/supplier-list.component';
import {SupplierDetailComponent} from './_page/supplier/supplier-detail/supplier-detail.component';
import {CustomerDetailComponent} from './_page/customer/customer-detail/customer-detail.component';
import {CustomerListComponent} from './_page/customer/customer-list/customer-list.component';
import {ProvinceComponent} from './_page/province/province.component';

const routes: Routes = [
  {
    path: '', children: [
      {path: '', component: BusinessGroupComponent},
      {path: 'bank', component: BankComponent},
      {
        path: 'item', component: ItemComponent, children: [
          {path: 'item-list', component: ItemListComponent},
          {path: 'item-detail', component: ItemDetailComponent},
          {path: '', redirectTo: 'item-list', pathMatch: 'full'},
        ],
      },
      {path: 'unit', component: UomComponent},
      {path: 'asset', component: AssetComponent},
      {
        path: 'employee', component: EmployeeComponent, children: [
          {path: 'employee-list', component: EmployeeListComponent},
          {path: 'employee-detail', component: EmployeeDetailComponent},
          {path: '', redirectTo: 'employee-list', pathMatch: 'full'},
        ],
      },
      {
        path: 'customer', component: CustomerComponent, children: [
          {path: 'customer-list', component: CustomerListComponent},
          {path: 'customer-detail', component: CustomerDetailComponent},
          {path: '', redirectTo: 'customer-list', pathMatch: 'full'},
        ],
      },
      {
        path: 'supplier', component: SupplierComponent, children: [
          {path: 'supplier-list', component: SupplierListComponent},
          {path: 'supplier-detail', component: SupplierDetailComponent},
          {path: '', redirectTo: 'supplier-list', pathMatch: 'full'},
        ],
      },
      {path: 'job-level', component: JobLevelComponent},
      {path: 'job-title', component: JobTitleComponent},
      {path: 'currency', component: CurrencyComponent},
      {
        path: 'province',
        component: ProvinceComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BusinessGroupRoutingModule {
}
