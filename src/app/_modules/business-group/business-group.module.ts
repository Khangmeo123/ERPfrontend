import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Import component:
import { ProductComponent } from './_pages/product/product.component';
import { UnitComponent } from './_pages/product/unit/unit.component';
import { BankComponent } from './_pages/bank/bank.component';
import { ListProductComponent } from './_pages/product/list-product/list-product.component';
import { BusinessGroupComponent } from './business-group.component';
import { AssetComponent } from './_pages/asset/asset.component';
import { EmployeeComponent } from './_pages/employee/employee.component';
import { CustomerComponent } from './_pages/customer/customer.component';
import { SupplierComponent } from './_pages/supplier/supplier.component';
import { CurrencyComponent } from './_pages/currency/currency.component';
import { StorybookComponent } from './_pages/storybook/storybook.component';
import { CostCenterComponent } from './_pages/cost-center/cost-center.component';
import { FiscalYearComponent } from './_pages/fiscal-year/fiscal-year.component';
import { AccountantPeriodComponent } from './_pages/accountant-period/accountant-period.component';
import { VoucherComponent } from './_pages/voucher/voucher.component';
import { PaymentMethodComponent } from './_pages/payment-method/payment-method.component';
import { PaymentTermComponent } from './_pages/payment-term/payment-term.component';
import { DivisionComponent } from './_pages/division/division.component';
import { DeparmentComponent } from './_pages/deparment/deparment.component';
import { DetailProductComponent } from './_pages/product/detail-product/detail-product.component';
import { ListSupplierComponent } from './_pages/supplier/list-supplier/list-supplier.component';
import { DetailSupplierComponent } from './_pages/supplier/detail-supplier/detail-supplier.component';
import { ListEmployeeComponent } from './_pages/employee/list-employee/list-employee.component';
import { DetailEmployeeComponent } from './_pages/employee/detail-employee/detail-employee.component';
import { ListCustomerComponent } from './_pages/customer/list-customer/list-customer.component';
import { DetailCustomerComponent } from './_pages/customer/detail-customer/detail-customer.component';


@NgModule({
  declarations: [BusinessGroupComponent, UnitComponent, ProductComponent, ListProductComponent, BankComponent, AssetComponent, EmployeeComponent, CustomerComponent, SupplierComponent, CurrencyComponent, StorybookComponent, CostCenterComponent, FiscalYearComponent, AccountantPeriodComponent, VoucherComponent, PaymentMethodComponent, PaymentTermComponent, DivisionComponent, DeparmentComponent, DetailProductComponent, ListSupplierComponent, DetailSupplierComponent, ListEmployeeComponent, DetailEmployeeComponent, ListCustomerComponent, DetailCustomerComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MatTableModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class BusinessgroupModule { }
