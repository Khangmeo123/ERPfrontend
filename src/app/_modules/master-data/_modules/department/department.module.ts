import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';

import { DepartmentComponent } from './_page/department/department.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeComponent } from './_page/employee/employee.component';
import { AssetComponent } from './_page/asset/asset.component';
import { WarehouseComponent } from './_page/warehouse/warehouse.component';
import { ProjectComponent } from './_page/project/project.component';
import { MatIconModule } from '@angular/material';
import { SelectModule } from '../../../../_shared/modules/select/select.module';
import { TableModule } from 'primeng/table';
import { FiltersModule } from '../../../../_shared/modules/filters/filters.module';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from '../../../../_shared/modules/date-picker/date-picker.module';
import { DepartmentListComponent } from './_page/department-list/department-list.component';
import { EmployeeListComponent } from './_page/employee-list/employee-list.component';
import { AssetListComponent } from './_page/asset-list/asset-list.component';
import { WarehouseListComponent } from './_page/warehouse-list/warehouse-list.component';
import { ProjectListComponent } from './_page/project-list/project-list.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    EmployeeComponent,
    AssetComponent,
    WarehouseComponent,
    ProjectComponent,
    DepartmentListComponent,
    EmployeeListComponent,
    AssetListComponent,
    WarehouseListComponent,
    ProjectListComponent,
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    TranslateModule,
    MatIconModule,
    SelectModule,
    TableModule,
    FiltersModule,
    DialogModule,
    DatePickerModule,
  ],
})
export class DepartmentModule {
}
