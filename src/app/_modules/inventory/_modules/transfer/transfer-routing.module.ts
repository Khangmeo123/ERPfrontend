import { InventoryTransferComponent } from './inventory-transfer/inventory-transfer.component';
import { InventoryTransferRequestComponent } from './inventory-transfer-request/inventory-transfer-request.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InventoryTransferListComponent} from './inventory-transfer/inventory-transfer-list/inventory-transfer-list.component';
import {InventoryTransferDetailComponent} from './inventory-transfer/inventory-transfer-detail/inventory-transfer-detail.component';
import {InventoryTransferRequestListComponent} from './inventory-transfer-request/inventory-transfer-request-list/inventory-transfer-request-list.component';
import {InventoryTransferRequestDetailComponent} from './inventory-transfer-request/inventory-transfer-request-detail/inventory-transfer-request-detail.component';

const routes: Routes = [
  {
    path: '', children: [
      {
        path: 'inventory-transfer-request',
        component: InventoryTransferRequestComponent,
        children: [
          {
            path: 'inventory-transfer-request-list',
            component: InventoryTransferRequestListComponent,
          },
          {
            path: 'inventory-transfer-request-detail',
            component: InventoryTransferRequestDetailComponent,
          },
          {
            path: '',
            redirectTo: 'inventory-transfer-request-list',
            pathMatch: 'full',
          },
        ],
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
