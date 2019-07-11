import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeparmentRoutingModule } from './department-routing.module';

import { DepartmentComponent } from './_page/department/department.component';


@NgModule({
  declarations: [DepartmentComponent],
  imports: [
    CommonModule,
    DeparmentRoutingModule,
  ]
})
export class DepartmentModule { }
