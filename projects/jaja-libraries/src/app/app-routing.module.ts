import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'table-column-toggler',
        loadChildren: () =>
          import('../table-column-toggler/table-column-toggler.module')
            .then(({TableColumnTogglerModule}) => TableColumnTogglerModule),
      },
      {
        path: '**',
        pathMatch: 'full',
        redirectTo: 'table-column-toggler',
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {
}
