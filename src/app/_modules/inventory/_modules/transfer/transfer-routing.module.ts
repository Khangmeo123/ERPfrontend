import { InventoryTransferComponent } from './inventory-transfer/inventory-transfer.component';
import { InventoryTransferRequestComponent } from './inventory-transfer-request/inventory-transfer-request.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InventoryTransferListComponent} from './inventory-transfer/inventory-transfer-list/inventory-transfer-list.component';
import {InventoryTransferDetailComponent} from './inventory-transfer/inventory-transfer-detail/inventory-transfer-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'inventory-transfer-request',
        component: InventoryTransferRequestComponent,
      },
      {
        path: 'inventory-transfer',
        component: InventoryTransferComponent,
        children: [
          {
            path: 'inventory-transfer-list',
            component: InventoryTransferListComponent,
          },
          {
            path: 'inventory-transfer-detail',
            component: InventoryTransferDetailComponent,
          },
          {
            path: '',
            redirectTo: 'inventory-transfer-list',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferRoutingModule { }
