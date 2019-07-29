import { SpecialPriceSupplierComponent } from './_page/special-price-supplier/special-price-supplier.component';
import { SupplierGroupComponent } from './_page/supplier-group/supplier-group.component';
import { CustomerGroupComponent } from './_page/customer-group/customer-group.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemGroupComponent } from './_page/item-group/item-group.component';
import { SpecialPriceCustomerComponent } from './_page/special-price-customer/special-price-customer.component';
import { CustomerDetailComponent } from './_page/customer-detail/customer-detail.component';
import { LegalEntityComponent } from './_page/legal-entity/legal-entity.component';
import { CustomerListOfLegalEntityComponent } from './_page/customer-list-of-legal-entity/customer-list-of-legal-entity.component';
import { SupplierOfLegalEntityComponent } from './_page/supplier-of-legal-entity/supplier-of-legal-entity.component';
import { EmployeeOfLegalEntityComponent } from './_page/employee-of-legal-entity/employee-of-legal-entity.component';
import { EmployeePositionComponent } from './_page/employee-position/employee-position.component';
import { SupplierDetailComponent } from './_page/supplier-detail/supplier-detail.component';
import { ItemDetailComponent } from './_page/item-detail/item-detail.component';
import { EmployeeDetailComponent } from './_page/employee-detail/employee-detail.component';
import { ItemOfLegalEntityComponent } from './_page/item-of-legal-entity/item-of-legal-entity.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: LegalEntityComponent },

      { path: 'customer-group', component: CustomerGroupComponent },
      { path: 'customer-group/customer-detail', component: CustomerDetailComponent },
      { path: 'customer-of-legal-entity/customer-detail', component: CustomerDetailComponent },

      { path: 'supplier-group', component: SupplierGroupComponent },
      { path: 'supplier-group/supplier-detail', component: SupplierDetailComponent },
      { path: 'supplier-of-legal-entity/supplier-detail', component: SupplierDetailComponent },

      { path: 'employee-position', component: EmployeePositionComponent },
      { path: 'employee-position/employee-detail', component: EmployeeDetailComponent },
      { path: 'employee-of-legal-entity/employee-detail', component: EmployeeDetailComponent },

      { path: 'item-group', component: ItemGroupComponent },
      {
        path: 'item-of-legal-entity', component: ItemOfLegalEntityComponent,
      },
      { path: 'item-group/item-detail', component: ItemDetailComponent },
      { path: 'item-of-legal-entity/item-detail', component: ItemDetailComponent },

      { path: 'special-price-supplier', component: SpecialPriceSupplierComponent },
      { path: 'special-price-customer', component: SpecialPriceCustomerComponent },
      {
        path: 'customer-of-legal-entity', component: CustomerListOfLegalEntityComponent
      },
      {
        path: 'supplier-of-legal-entity', component: SupplierOfLegalEntityComponent,
      },
      {
        path: 'employee-of-legal-entity', component: EmployeeOfLegalEntityComponent,
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
