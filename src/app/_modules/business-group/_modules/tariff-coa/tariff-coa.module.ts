import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TariffCoaComponent } from './tariff-coa.component';
import { CoaComponent } from './_page/coa/coa.component';
import { ExciseTariffComponent } from './_page/excise-tariff/excise-tariff.component';
import { ResourceTariffComponent } from './_page/resource-tariff/resource-tariff.component';
import { TariffCoaRoutingModule } from './tariff-coa-routing.module';

@NgModule({
  declarations: [TariffCoaComponent, CoaComponent, ExciseTariffComponent, ResourceTariffComponent],
  imports: [
    CommonModule,
    TariffCoaRoutingModule
  ]
})
export class TariffCoaModule { }
