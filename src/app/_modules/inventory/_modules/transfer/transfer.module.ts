import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryTransferRequestComponent } from './inventory-transfer-request/inventory-transfer-request.component';
import { InventoryTransferComponent } from './inventory-transfer/inventory-transfer.component';

@NgModule({
  declarations: [InventoryTransferRequestComponent, InventoryTransferComponent],
  imports: [
    CommonModule
  ]
})
export class TransferModule { }
