import { ListCompanyPositionComponent } from './_page/company-position/list-company-position/list-company-position.component';
import { ConfigureCompanyPositionComponent } from './_page/company-position/configure-company-position/configure-company-position.component';
import { ListItemGroupComponent } from './_page/item-group/list-item-group/list-item-group.component';
import { ConfigureItemGroupComponent } from './_page/item-group/configure-item-group/configure-item-group.component';
import { ConfigureSupplierGroupComponent } from './_page/supplier-group/configure-supplier-group/configure-supplier-group.component';
import { ListCustomerGroupComponent } from './_page/customer-group/list-customer-group/list-customer-group.component';
import { ConfigureCustomerGroupComponent } from './_page/customer-group/configure-customer-group/configure-customer-group.component';
import { SpecialPriceSupplierComponent } from './_page/special-price-supplier/special-price-supplier.component';
import { CompanyPositionComponent } from './_page/company-position/company-position.component';
import { SupplierGroupComponent } from './_page/supplier-group/supplier-group.component';
import { CustomerGroupComponent } from './_page/customer-group/customer-group.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemGroupComponent } from './_page/item-group/item-group.component';
import { SpecialPriceCustomerComponent } from './_page/special-price-customer/special-price-customer.component';
import { DetailCustomerGroupComponent } from './_page/customer-group/detail-customer-group/detail-customer-group.component';
import { DetailItemGroupComponent } from './_page/item-group/detail-item-group/detail-item-group.component';
import { DetailCompanyPositionComponent } from './_page/company-position/detail-company-position/detail-company-position.component';
import { LegalEntityComponent } from './_page/legal-entity/legal-entity.component';
import { CustomerListOfLegalEntityComponent } from './_page/customer-list-of-legal-entity/customer-list-of-legal-entity.component';
import { SupplierOfLegalEntityComponent } from './_page/supplier-of-legal-entity/supplier-of-legal-entity.component';
import { EmployeeOfLegalEntityComponent } from './_page/employee-of-legal-entity/employee-of-legal-entity.component';
import { CustomerListComponent } from './_page/customer-list-of-legal-entity/customer-list/customer-list.component';
import { DetailCustomerOfLegalEntityComponent } from './_page/customer-list-of-legal-entity/detail-customer-of-legal-entity/detail-customer-of-legal-entity.component';
import { ListSupplierOfLegalEntityComponent } from './_page/supplier-of-legal-entity/list-supplier-of-legal-entity/list-supplier-of-legal-entity.component';
import { DetailSupplierOfLegalEntityComponent } from './_page/supplier-of-legal-entity/detail-supplier-of-legal-entity/detail-supplier-of-legal-entity.component';
import { ListEmployeeOfLegalEntityComponent } from './_page/employee-of-legal-entity/list-employee-of-legal-entity/list-employee-of-legal-entity.component';
import { DetailEmployeeOfLegalEntityComponent } from './_page/employee-of-legal-entity/detail-employee-of-legal-entity/detail-employee-of-legal-entity.component';
import { ListItemOfLegalEntityComponent } from './_page/item-of-legal-entity/list-item-of-legal-entity/list-item-of-legal-entity.component';
import { DetailItemOfLegalEntityComponent } from './_page/item-of-legal-entity/detail-item-of-legal-entity/detail-item-of-legal-entity.component';
import { ListSupplierGroupComponent } from './_page/supplier-group/list-supplier-group/list-supplier-group.component';
import { DetailSupplierGroupComponent } from './_page/supplier-group/detail-supplier-group/detail-supplier-group.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: LegalEntityComponent },
      {
        path: 'customer-group', component: CustomerGroupComponent, children: [
          { path: 'configure-customer-group', component: ConfigureCustomerGroupComponent },
          { path: 'list-customer-group', component: ListCustomerGroupComponent },
          { path: 'detail-customer-group', component: DetailCustomerGroupComponent },
          { path: '**', redirectTo: 'list-customer-group' },
        ],
      },
      {
        path: 'supplier-group', component: SupplierGroupComponent, children: [
          { path: 'configure-supplier-group', component: ConfigureSupplierGroupComponent },
          { path: 'list-supplier-group', component: ListSupplierGroupComponent },
          { path: 'detail-supplier-group', component: DetailSupplierGroupComponent },
          { path: '', redirectTo: 'list-supplier-group', pathMatch: 'full' }
        ],
      },
      {
        path: 'company-position', component: CompanyPositionComponent, children: [
          { path: 'configure-company-position', component: ConfigureCompanyPositionComponent },
          { path: 'list-company-position', component: ListCompanyPositionComponent },
          { path: 'detail-company-position', component: DetailCompanyPositionComponent },
          { path: '', redirectTo: 'list-company-position', pathMatch: 'full' }
        ],
      },
      {
        path: 'item-group', component: ItemGroupComponent, children: [
          { path: 'configure-item-group', component: ConfigureItemGroupComponent },
          { path: 'list-item-group', component: ListItemGroupComponent },
          { path: 'detail-item-group', component: DetailItemGroupComponent },
          { path: '', redirectTo: 'list-item-group', pathMatch: 'full' }
        ],
      },
      { path: 'special-price-supplier', component: SpecialPriceSupplierComponent },
      { path: 'special-price-customer', component: SpecialPriceCustomerComponent },
      {
        path: 'customer-list-of-legal-entity', component: CustomerListOfLegalEntityComponent, children: [
          { path: 'list-customer-legal-entity', component: CustomerListComponent },
          { path: 'detail-customer-legal-entity', component: DetailCustomerOfLegalEntityComponent },
          { path: '', redirectTo: 'list-customer-legal-entity', pathMatch: 'full' }
        ]
      },
      {
        path: 'supplier-of-legal-entity', component: SupplierOfLegalEntityComponent, children: [
          { path: 'list-supplier-legal-entity', component: ListSupplierOfLegalEntityComponent },
          { path: 'detail-supplier-legal-entity', component: DetailSupplierOfLegalEntityComponent },
          { path: '', redirectTo: 'list-supplier-legal-entity', pathMatch: 'full' }
        ]
      },
      {
        path: 'employee-of-legal-entity', component: EmployeeOfLegalEntityComponent, children: [
          { path: 'list-employee-legal-entity', component: ListEmployeeOfLegalEntityComponent },
          { path: 'detail-employee-legal-entity', component: DetailEmployeeOfLegalEntityComponent },
          { path: '', redirectTo: 'list-employee-legal-entity', pathMatch: 'full' }
        ]
      },
      {
        path: 'item-of-legal-entity', component: EmployeeOfLegalEntityComponent, children: [
          { path: 'list-item-legal-entity', component: ListItemOfLegalEntityComponent },
          { path: 'detail-item-legal-entity', component: DetailItemOfLegalEntityComponent },
          { path: '', redirectTo: 'list-item-legal-entity', pathMatch: 'full' }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalEntityRoutingModule {
}
