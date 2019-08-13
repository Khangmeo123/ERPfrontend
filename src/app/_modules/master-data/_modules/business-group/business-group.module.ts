import { CustomerDetailComponent } from './_page/customer/customer-detail/customer-detail.component';
import { EmployeeDetailComponent } from './_page/employee/employee-detail/employee-detail.component';
import { DirectiveModule } from './../../../../_shared/directive/directive.module';
import { ItemDetailComponent } from './_page/item/item-detail/item-detail.component';
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
import { SupplierComponent } from './_page/supplier/supplier.component';
import { UomComponent } from './_page/uom/uom.component';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationPopoverModule } from 'jaja.vn-angular-confirmation-popover';
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
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/_helpers';
import { ItemComponent } from './_page/item/item.component';
import { ItemListComponent } from './_page/item/item-list/item-list.component';
import { EmployeeListComponent } from './_page/employee/employee-list/employee-list.component';
import { SupplierListComponent } from './_page/supplier/supplier-list/supplier-list.component';
import { SupplierDetailComponent } from './_page/supplier/supplier-detail/supplier-detail.component';
import { CustomerListComponent } from './_page/customer/customer-list/customer-list.component';
import { InputNumberModule } from 'src/app/_shared/modules/input-number/input-number.module';
import { PipeModule } from 'src/app/_shared/pipe/pipe.module';
import { ProvinceComponent } from './_page/province/province.component';
import { TaxTemplateComponent } from './_page/tax-template/tax-template.component';
import { TaxTemplateDetailComponent } from './_page/tax-template/tax-template-detail/tax-template-detail.component';

@NgModule({
  declarations: [
    BusinessGroupComponent,
    AssetComponent,
    BankComponent,
    BusinessGroupComponent,
    CurrencyComponent,
    CustomerComponent,
    EmployeeComponent,
    ItemComponent,
    SupplierComponent,
    UomComponent,
    CustomerDetailComponent,
    CustomerListComponent,
    EmployeeListComponent,
    EmployeeDetailComponent,
    ItemListComponent,
    ItemDetailComponent,
    SupplierListComponent,
    SupplierDetailComponent,
    CurrencyComponent,
    JobLevelComponent,
    JobTitleComponent,
    ProvinceComponent,
    TaxTemplateComponent,
    TaxTemplateDetailComponent,
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
    ToastrModule,
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
    DirectiveModule,
    InputNumberModule,
    PipeModule,
    CropperModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
})
export class BusinessGroupModule { }
