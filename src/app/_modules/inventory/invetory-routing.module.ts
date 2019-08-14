import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', children: [
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
        path: 'couting',
        loadChildren: () => import('./_modules/couting/couting.module').then(m => m.CoutingModule),
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
export class InvetoryRoutingModule { }
