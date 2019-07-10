import { CoaComponent } from './_page/coa/coa.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExciseTariffComponent } from './_page/excise-tariff/excise-tariff.component';
import { ResourceTariffComponent } from './_page/resource-tariff/resource-tariff.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: 'coa', component: CoaComponent },
      { path: 'excise-tariff', component: ExciseTariffComponent },
      { path: 'resoure-tariff', component: ResourceTariffComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TariffCoaRoutingModule { }
