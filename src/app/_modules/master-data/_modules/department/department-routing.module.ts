import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentComponent } from './_page/department/department.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: DepartmentComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DeparmentRoutingModule { }
