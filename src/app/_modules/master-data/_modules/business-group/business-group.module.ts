import { JobTitleComponent } from './_page/job-title/job-title.component';
import { JobLevelComponent } from './_page/job-level/job-level.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessGroupRoutingModule } from './buniness-group-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { UomComponent } from './_page/uom/uom.component';
import { DetailCustomerComponent } from './_page/customer/detail-customer/detail-customer.component';
import { ListCustomerComponent } from './_page/customer/list-customer/list-customer.component';
import { DetailSupplierComponent } from './_page/supplier/detail-supplier/detail-supplier.component';
import { ListEmployeeComponent } from './_page/employee/list-employee/list-employee.component';
import { DetailEmployeeComponent } from './_page/employee/detail-employee/detail-employee.component';
import { ListProductComponent } from './_page/product/list-product/list-product.component';
import { DetailProductComponent } from './_page/product/detail-product/detail-product.component';
import { ListSupplierComponent } from './_page/supplier/list-supplier/list-supplier.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AccordionModule, BsDropdownModule } from 'ngx-bootstrap';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DatePickerModule } from 'src/app/_shared/modules/date-picker/date-picker.module';
import { KeyFilterModule } from 'primeng/keyfilter';
import { InputTextModule } from 'primeng/inputtext';
import { ErrorModule } from 'src/app/_shared/components/error/error.module';
import { SelectModule } from '../../../../_shared/modules/select/select.module';
import { CropperModule } from 'src/app/_shared/modules/cropper/cropper.module';
import { DropdownModule } from 'primeng/dropdown';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/_helpers';

@NgModule({
  declarations: [
    BusinessGroupComponent,
    AssetComponent,
    BankComponent,
    BusinessGroupComponent,
    CurrencyComponent,
    CustomerComponent,
    EmployeeComponent,
    ProductComponent,
    SupplierComponent,
    UomComponent,
    DetailCustomerComponent,
    ListCustomerComponent,
    ListEmployeeComponent,
    DetailEmployeeComponent,
    ListProductComponent,
    DetailProductComponent,
    ListSupplierComponent,
    DetailSupplierComponent,
    CurrencyComponent,
    JobLevelComponent,
    JobTitleComponent,
  ],
  imports: [
    CommonModule,
    BusinessGroupRoutingModule,
    TranslateModule.forChild(),
    ReactiveFormsModule,
    MatIconModule,
    TableModule,
    PaginationModule,
    FiltersModule,
    DialogModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    }),
    ToastrModule.forRoot({
      timeOut: 1000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    AccordionModule.forRoot(),
    RadioButtonModule,
    DatePickerModule,
    KeyFilterModule,
    FormsModule,
    InputTextModule,
    ErrorModule,
    SelectModule,
    BsDropdownModule.forRoot(),
    DropdownModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class BusinessGroupModule { }
