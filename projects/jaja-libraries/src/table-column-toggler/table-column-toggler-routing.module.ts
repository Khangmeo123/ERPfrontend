import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TableColumnTogglerComponent} from './table-column-toggler/table-column-toggler.component';

const routes: Routes = [
  {
    path: '',
    component: TableColumnTogglerComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class TableColumnTogglerRoutingModule {
}
