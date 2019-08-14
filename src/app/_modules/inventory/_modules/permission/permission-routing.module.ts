import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {PermissionComponent} from './permission/permission.component';

const routes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'permission',
                 component: PermissionComponent,
            },
        ],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PermissionRoutingModule { }
