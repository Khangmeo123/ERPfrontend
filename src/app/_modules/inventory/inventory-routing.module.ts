import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory.component';
import { InventoryRoutingCanActivate } from './inventory-routing.canActivate';

const routes: Routes = [
  {
    path: '',
    component: InventoryComponent,
    canActivate: [
      InventoryRoutingCanActivate,
    ],
    children: [
      {
        path: 'general',
        loadChildren: () => import('./_modules/general/general.module').then(m => m.GeneralModule),
      },
      {
        path: 'receipt',
        loadChildren: () => import('./_modules/receipt/receipt.module').then(m => m.ReceiptModule),
      },
      {
        path: 'issue',
        loadChildren: () => import('./_modules/issue/issue.module').then(m => m.IssueModule),
      },
      {
        path: 'transfer',
        loadChildren: () => import('./_modules/transfer/transfer.module').then(m => m.TransferModule),
      },
      {
        path: 'counting',
        loadChildren: () => import('./_modules/counting/counting.module').then(m => m.CountingModule),
      },
      {
        path: 'permission',
        loadChildren: () => import('./_modules/permission/permission.module').then(m => m.PermissionModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InventoryRoutingModule {
}
