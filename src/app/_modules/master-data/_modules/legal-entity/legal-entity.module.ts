import { CropperModule } from 'src/app/_shared/modules/cropper/cropper.module';
import { LegalEntityRoutingModule } from './legal-entity-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerGroupComponent } from './_page/customer-group/customer-group.component';
import { SupplierGroupComponent } from './_page/supplier-group/supplier-group.component';
import { ItemGroupComponent } from './_page/item-group/item-group.component';
import { SpecialPriceSupplierComponent } from './_page/special-price-supplier/special-price-supplier.component';
import { SpecialPriceCustomerComponent } from './_page/special-price-customer/special-price-customer.component';
import { CustomerDetailComponent } from './_page/customer-detail/customer-detail.component';
import { SupplierDetailComponent } from './_page/supplier-detail/supplier-detail.component';
import { LegalEntityComponent } from './_page/legal-entity/legal-entity.component';
import { TranslateModule } from '@ngx-translate/core';
import { MatIconModule } from '@angular/material';
import { SelectModule } from '../../../../_shared/modules/select/select.module';
import { TableModule } from 'primeng/table';
import { FiltersModule } from '../../../../_shared/modules/filters/filters.module';
import { ErrorModule } from '../../../../_shared/components/error/error.module';
import { DialogModule } from 'primeng/dialog';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AccordionModule, BsDropdownModule } from 'ngx-bootstrap';
import { CustomersInGroupComponent } from './_page/customer-group/customers-in-group/customers-in-group.component';
import { CustomerListOfLegalEntityComponent } from './_page/customer-list-of-legal-entity/customer-list-of-legal-entity.component';
import { SupplierOfLegalEntityComponent } from './_page/supplier-of-legal-entity/supplier-of-legal-entity.component';
import { EmployeeOfLegalEntityComponent } from './_page/employee-of-legal-entity/employee-of-legal-entity.component';
import { ItemOfLegalEntityComponent } from './_page/item-of-legal-entity/item-of-legal-entity.component';
import { EmployeeDetailComponent } from './_page/employee-detail/employee-detail.component';
import { LegalItemDetailComponent } from './_page/item-detail/item-detail.component';
import { PaginationModule } from 'src/app/_shared/modules/pagination/pagination.module';
import { DatePickerModule } from 'src/app/_shared/modules/date-picker/date-picker.module';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ChipsModule } from 'primeng/chips';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeePositionComponent } from './_page/employee-position/employee-position.component';

@NgModule({
  declarations: [
    LegalEntityComponent,
    CustomerGroupComponent,
    SupplierGroupComponent,
    EmployeePositionComponent,
    ItemGroupComponent,
    SpecialPriceSupplierComponent,
    SpecialPriceCustomerComponent,
    CustomerDetailComponent,
    SupplierDetailComponent,
    CustomersInGroupComponent,
    CustomerListOfLegalEntityComponent,
    SupplierOfLegalEntityComponent,
    EmployeeOfLegalEntityComponent,
    ItemOfLegalEntityComponent,
    EmployeeDetailComponent,
    LegalItemDetailComponent],
  imports: [
    CommonModule,
    LegalEntityRoutingModule,
    TranslateModule.forChild(),
    MatIconModule,
    TableModule,
    FiltersModule,
    ErrorModule,
    DialogModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger',
    }),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    PaginationModule,
    DatePickerModule,
    RadioButtonModule,
    FormsModule,
    ReactiveFormsModule,
    CropperModule,
    SelectModule,
    ChipsModule,
    FormsModule,
  ],
})
export class LegalEntityModule {
}
