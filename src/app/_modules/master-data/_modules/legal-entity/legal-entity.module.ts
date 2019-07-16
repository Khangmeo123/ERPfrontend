import { LegalEntityRoutingModule } from './legal-entity-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerGroupComponent } from './_page/customer-group/customer-group.component';
import { SupplierGroupComponent } from './_page/supplier-group/supplier-group.component';
import { CompanyPositionComponent } from './_page/company-position/company-position.component';
import { ProductGroupComponent } from './_page/product-group/product-group.component';
import { SpecialPriceSupplierComponent } from './_page/special-price-supplier/special-price-supplier.component';
import { SpecialPriceCustomerComponent } from './_page/special-price-customer/special-price-customer.component';
import { ConfigureCustomerGroupComponent } from './_page/customer-group/configure-customer-group/configure-customer-group.component';
import { ListCustomerGroupComponent } from './_page/customer-group/list-customer-group/list-customer-group.component';
import { DetailCustomerGroupComponent } from './_page/customer-group/detail-customer-group/detail-customer-group.component';
import { ConfigureSupplierGroupComponent } from './_page/supplier-group/configure-supplier-group/configure-supplier-group.component';
import { ListSupplierGroupComponent } from './_page/supplier-group/list-supplier-group/list-supplier-group.component';
import { DetailSupplierGroupComponent } from './_page/supplier-group/detail-supplier-group/detail-supplier-group.component';
import { ConfigureProductGroupComponent } from './_page/product-group/configure-product-group/configure-product-group.component';
import { ListProductGroupComponent } from './_page/product-group/list-product-group/list-product-group.component';
import { DetailProductGroupComponent } from './_page/product-group/detail-product-group/detail-product-group.component';
import { ConfigureCompanyPositionComponent } from './_page/company-position/configure-company-position/configure-company-position.component';
import { ListCompanyPositionComponent } from './_page/company-position/list-company-position/list-company-position.component';
import { DetailCompanyPositionComponent } from './_page/company-position/detail-company-position/detail-company-position.component';
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

@NgModule({
  declarations: [LegalEntityComponent, CustomerGroupComponent, SupplierGroupComponent, CompanyPositionComponent, ProductGroupComponent,
    SpecialPriceSupplierComponent, SpecialPriceCustomerComponent, ConfigureCustomerGroupComponent, ListCustomerGroupComponent,
    DetailCustomerGroupComponent, ConfigureSupplierGroupComponent, ListSupplierGroupComponent, DetailSupplierGroupComponent,
    ConfigureProductGroupComponent, ListProductGroupComponent, DetailProductGroupComponent, ConfigureCompanyPositionComponent,
    ListCompanyPositionComponent, DetailCompanyPositionComponent, CustomersInGroupComponent],
  imports: [
    CommonModule,
    LegalEntityRoutingModule,
    TranslateModule.forChild(),
    MatIconModule,
    SelectModule,
    TableModule,
    FiltersModule,
    ErrorModule,
    DialogModule,
    ConfirmationPopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
  ],
})
export class LegalEntityModule {
}
