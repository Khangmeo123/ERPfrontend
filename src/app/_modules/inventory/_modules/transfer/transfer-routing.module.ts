import { InventoryTransferComponent } from './inventory-transfer/inventory-transfer.component';
import { InventoryTransferRequestComponent } from './inventory-transfer-request/inventory-transfer-request.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferRoutingModule { }
