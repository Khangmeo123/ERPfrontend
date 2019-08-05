import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryCountingComponent } from './inventory-counting/inventory-counting.component';
import { InventoryPostingComponent } from './inventory-posting/inventory-posting.component';
import { InventoryCountingCycleComponent } from './inventory-counting-cycle/inventory-counting-cycle.component';
import { CountingRoutingModule } from './couting-routing.module';

@NgModule({
  declarations: [InventoryCountingCycleComponent, InventoryCountingComponent, InventoryPostingComponent, InventoryCountingCycleComponent],
  imports: [
    CommonModule,
    CountingRoutingModule,
  ]
})
export class CoutingModule { }
