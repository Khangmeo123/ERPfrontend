import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentComponent } from './_page/department/department.component';
import { HrOrganizationComponent } from './_page/hr-organization/hr-organization.component';
import { AssetComponent } from './_page/asset/asset.component';
import { WarehouseComponent } from './_page/warehouse/warehouse.component';
import { ProjectComponent } from './_page/project/project.component';
import { DepartmentEmployeeDetailComponent } from './_page/employee-detail/employee-detail.component';
import { DepartmentRootComponent } from './_page/department-root/department-root.component';
import { WarehouseGroupComponent } from './_page/warehouse-group/warehouse-group.component';

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
            path: 'asset',
            component: AssetComponent,
          },
          {
            path: 'warehouse-group',
            component: WarehouseGroupComponent,
          },
          {
            path: 'warehouse-group/warehouse',
            component: WarehouseComponent,
          },
          {
            path: 'project',
            component: ProjectComponent,
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
