import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PermissionComponent} from './permission/permission.component';
import {PermissionDetailComponent} from './permission-detail/permission-detail.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'permission-list',
        component: PermissionComponent,
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
