import { WarehouseListComponent } from './_page/warehouse-list/warehouse-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './_page/department/department.component';
import { HrOrganizationComponent } from './_page/hr-organization/hr-organization.component';
import { AssetOrganizationComponent } from './_page/asset-organization/asset-organization.component';
import { WarehouseComponent } from './_page/warehouse/warehouse.component';
import { ProjectOrganizationComponent } from './_page/project-organization/project-organization.component';
import { DepartmentEmployeeDetailComponent } from './_page/employee-detail/employee-detail.component';

import { DepartmentRootComponent } from './_page/department-root/department-root.component';
import { WarehouseDetailComponent } from './_page/warehouse-detail/warehouse-detail.component';

const routes: Routes = [
  {
    path: 'employee-detail',
    component: DepartmentEmployeeDetailComponent,
  },
  {
    path: '',
    component: DepartmentRootComponent,
    children: [
      {
        path: '',
        component: DepartmentComponent,
        children: [
          {
            path: 'hr-organization',
            component: HrOrganizationComponent,
          },
          {
            path: 'asset-organization',
            component: AssetOrganizationComponent,
          },
          {
            path: 'warehouse',
            component: WarehouseComponent,
            children: [
              {
                path: '',
                redirectTo: 'warehouse-list',
                pathMatch: 'full',
              },
              {
                path: 'warehouse-detail',
                component: WarehouseDetailComponent,
              },
              {
                path: 'warehouse-list',
                component: WarehouseListComponent,
              },
            ],
          },
          {
            path: 'project-organization',
            component: ProjectOrganizationComponent,
          },
          {
            path: '**',
            redirectTo: 'hr-organization',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DepartmentRoutingModule {
}
