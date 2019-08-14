import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryCountingCycleComponent } from './inventory-counting-cycle/inventory-counting-cycle.component';
import { InventoryCountingComponent } from './inventory-counting/inventory-counting.component';
import { InventoryPostingComponent } from './inventory-posting/inventory-posting.component';
import {InventoryCountingListComponent} from './inventory-counting/inventory-counting-list/inventory-counting-list.component';
import {InventoryCountingDetailComponent} from './inventory-counting/inventory-counting-detail/inventory-counting-detail.component';

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
