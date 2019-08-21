import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryCountingCycleComponent } from './inventory-counting-cycle/inventory-counting-cycle.component';
import { InventoryCountingComponent } from './inventory-counting/inventory-counting.component';
import { InventoryPostingComponent } from './inventory-posting/inventory-posting.component';
import { InventoryCountingListComponent } from './inventory-counting/inventory-counting-list/inventory-counting-list.component';
import { InventoryCountingDetailComponent } from './inventory-counting/inventory-counting-detail/inventory-counting-detail.component';
import { InventoryCountingPendingComponent } from './inventory-counting/inventory-counting-pending/inventory-counting-pending.component';
import { InventoryCountingDoneComponent } from './inventory-counting/inventory-counting-done/inventory-counting-done.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'inventory-couting-cycle',
        component: InventoryCountingCycleComponent,
      },
      {
        path: 'inventory-counting',
        component: InventoryCountingComponent,
        children: [
          {
            path: 'inventory-counting-list',
            component: InventoryCountingListComponent,
          },
          {
            path: 'inventory-counting-detail',
            component: InventoryCountingDetailComponent,
          },
          {
            path: 'inventory-counting-pending',
            component: InventoryCountingPendingComponent,
          },
          {
            path: 'inventory-counting-done',
            component: InventoryCountingDoneComponent,
          },
          {
            path: '',
            redirectTo: 'inventory-counting-list',
            pathMatch: 'full',
          },
        ],
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
