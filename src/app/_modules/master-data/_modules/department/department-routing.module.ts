import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DepartmentComponent} from './_page/department/department.component';
import {EmployeeComponent} from './_page/employee/employee.component';
import {AssetComponent} from './_page/asset/asset.component';
import {WarehouseComponent} from './_page/warehouse/warehouse.component';
import {ProjectComponent} from './_page/project/project.component';
import {DetailEmployeeComponent} from './_page/employee-list/detail-employee/detail-employee.component';
import {DepartmentRootComponent} from './_page/department-root/department-root.component';
import {WarehouseGroupComponent} from './_page/warehouse-group/warehouse-group.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentRootComponent,
    children: [
      {
        path: 'employee/detail-employee',
        component: DetailEmployeeComponent,
      },
      {
        path: '',
        component: DepartmentComponent,
        children: [
          {
            path: 'employee',
            component: EmployeeComponent,
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
            redirectTo: 'employee',
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
