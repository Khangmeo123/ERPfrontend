import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'business-group', loadChildren: () => import('./_modules/business-group/business-group.module').then(m => m.BusinessGroupModule) },
      { path: 'sob', loadChildren: () => import('./_modules/sob/sob.module').then(m => m.SobModule) },
      { path: 'legal-entity', loadChildren: () => import('./_modules/legal-entity/legal-entity.module').then(m => m.LegalEntityModule) },
      { path: 'division', loadChildren: () => import('./_modules/division/division.module').then(m => m.DivisionModule) },
      { path: 'department', loadChildren: () => import('./_modules/department/department.module').then(m => m.DepartmentModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterDataRoutingModule { }
