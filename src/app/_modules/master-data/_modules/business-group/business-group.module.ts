import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessGroupRoutingModule } from './buniness-group-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { TableModule } from 'primeng/table';
import { PaginationModule } from 'src/app/_shared/modules/pagination/pagination.module';
import { FiltersModule } from 'src/app/_shared/modules/filters/filters.module';

import { BusinessGroupComponent } from './_page/business-group/business-group.component';
import { AssetComponent } from './_page/asset/asset.component';
import { BankComponent } from './_page/bank/bank.component';
import { CurrencyComponent } from './_page/currency/currency.component';
import { CustomerComponent } from './_page/customer/customer.component';
import { EmployeeComponent } from './_page/employee/employee.component';
import { ProductComponent } from './_page/product/product.component';
import { SupplierComponent } from './_page/supplier/supplier.component';
import { UnitComponent } from './_page/unit/unit.component';
import { DetailCustomerComponent } from './_page/customer/detail-customer/detail-customer.component';
import { ListCustomerComponent } from './_page/customer/list-customer/list-customer.component';
import { DetailSupplierComponent } from './_page/supplier/detail-supplier/detail-supplier.component';
import { ListEmployeeComponent } from './_page/employee/list-employee/list-employee.component';
import { DetailEmployeeComponent } from './_page/employee/detail-employee/detail-employee.component';
import { ListProductComponent } from './_page/product/list-product/list-product.component';
import { DetailProductComponent } from './_page/product/detail-product/detail-product.component';
import { ListSupplierComponent } from './_page/supplier/list-supplier/list-supplier.component';



@NgModule({
  declarations: [BusinessGroupComponent,
    AssetComponent, BankComponent, BusinessGroupComponent, CurrencyComponent, CustomerComponent, EmployeeComponent,
    ProductComponent, SupplierComponent, UnitComponent, DetailCustomerComponent, ListCustomerComponent, ListEmployeeComponent,
    DetailEmployeeComponent, ListProductComponent, DetailProductComponent, ListSupplierComponent, DetailSupplierComponent],
  imports: [
    CommonModule,
    BusinessGroupRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatIconModule,
    TableModule,
    PaginationModule,
    FiltersModule,
  ]
})
export class BusinessGroupModule { }