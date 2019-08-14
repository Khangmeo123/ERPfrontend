import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryCountingCycleComponent } from './inventory-counting-cycle/inventory-counting-cycle.component';
import { InventoryCountingComponent } from './inventory-counting/inventory-counting.component';
import { InventoryPostingComponent } from './inventory-posting/inventory-posting.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inventory-couting-cycle',
        component: InventoryCountingCycleComponent,
      },
      {
        path: 'inventory-couting',
        component: InventoryCountingComponent,
      },
      {
        path: 'inventory-posting',
        component: InventoryPostingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountingRoutingModule { }
