import { ListCompanyPositionComponent } from './_page/company-position/list-company-position/list-company-position.component';
import { ConfigureCompanyPositionComponent } from './_page/company-position/configure-company-position/configure-company-position.component';
import { ListProductGroupComponent } from './_page/product-group/list-product-group/list-product-group.component';
import { ConfigureProductGroupComponent } from './_page/product-group/configure-product-group/configure-product-group.component';
import { ConfigureSupplierGroupComponent } from './_page/supplier-group/configure-supplier-group/configure-supplier-group.component';
import { ListCustomerGroupComponent } from './_page/customer-group/list-customer-group/list-customer-group.component';
import { ConfigureCustomerGroupComponent } from './_page/customer-group/configure-customer-group/configure-customer-group.component';
import { SpecialPriceSupplierComponent } from './_page/special-price-supplier/special-price-supplier.component';
import { CompanyPositionComponent } from './_page/company-position/company-position.component';
import { SupplierGroupComponent } from './_page/supplier-group/supplier-group.component';
import { CustomerGroupComponent } from './_page/customer-group/customer-group.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductGroupComponent } from './_page/product-group/product-group.component';
import { SpecialPriceCustomerComponent } from './_page/special-price-customer/special-price-customer.component';
import { DetailCustomerGroupComponent } from './_page/customer-group/detail-customer-group/detail-customer-group.component';
import { DetailProductGroupComponent } from './_page/product-group/detail-product-group/detail-product-group.component';
import { DetailCompanyPositionComponent } from './_page/company-position/detail-company-position/detail-company-position.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'customer-group', component: CustomerGroupComponent, children: [
          { path: 'configure-customer-group', component: ConfigureCustomerGroupComponent },
          { path: 'list-customer-group', component: ListCustomerGroupComponent },
          { path: 'detail-customer-group', component: DetailCustomerGroupComponent },
        ],
      },
      {
        path: 'supplier-group', component: SupplierGroupComponent, children: [
          { path: 'configure-supplier-group', component: ConfigureSupplierGroupComponent },
          { path: 'list-supplier-group', component: ConfigureSupplierGroupComponent },
          { path: 'detail-supplier-group', component: ConfigureSupplierGroupComponent },
        ],
      },
      {
        path: 'company-position', component: CompanyPositionComponent, children: [
          { path: 'configure-company-position', component: ConfigureCompanyPositionComponent },
          { path: 'list-company-position', component: ListCompanyPositionComponent },
          { path: 'detail-company-position', component: DetailCompanyPositionComponent },
        ]
      },
      {
        path: 'product-group', component: ProductGroupComponent, children: [
          { path: 'configure-product-group', component: ConfigureProductGroupComponent },
          { path: 'list-product-group', component: ListProductGroupComponent },
          { path: 'detail-product-group', component: DetailProductGroupComponent },
        ]
      },
      { path: 'special-price-supplier', component: SpecialPriceCustomerComponent },
      { path: 'special-price-customer', component: SpecialPriceSupplierComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LegalEntityRoutingModule { }
