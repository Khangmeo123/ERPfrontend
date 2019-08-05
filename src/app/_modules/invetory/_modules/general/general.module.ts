import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { InventoryStatusComponent } from './inventory-status/inventory-status.component';

@NgModule({
  declarations: [DashboardComponent, InventoryStatusComponent],
  imports: [
    CommonModule
  ]
})
export class GeneralModule { }
