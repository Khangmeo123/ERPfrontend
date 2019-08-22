import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PermissionListComponent} from './permission-list/permission-list.component';
import {PermissionDetailComponent} from './permission-detail/permission-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'permission-list',
        component: PermissionListComponent,
      },
      {
        path: 'permission-detail',
        component: PermissionDetailComponent,
      },
      {
        path: '**',
        redirectTo: 'permission-list',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermissionRoutingModule {
}
