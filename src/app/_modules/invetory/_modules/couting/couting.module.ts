import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvetoryCountingCycleComponent } from './invetory-counting-cycle/invetory-counting-cycle.component';
import { InventoryCountingComponent } from './inventory-counting/inventory-counting.component';
import { InventoryPostingComponent } from './inventory-posting/inventory-posting.component';
import { InventoryCountingCycleComponent } from './inventory-counting-cycle/inventory-counting-cycle.component';

@NgModule({
  declarations: [InvetoryCountingCycleComponent, InventoryCountingComponent, InventoryPostingComponent, InventoryCountingCycleComponent],
  imports: [
    CommonModule
  ]
})
export class CoutingModule { }
