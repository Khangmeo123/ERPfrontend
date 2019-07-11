import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DivisionComponent } from './_page/division/division.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: '', component: DivisionComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DivisionRoutingModule { }
