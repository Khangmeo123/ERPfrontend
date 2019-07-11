import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionRoutingModule } from './division-routing.module';

import { DivisionComponent } from './_page/division/division.component';

@NgModule({
  declarations: [DivisionComponent],
  imports: [
    CommonModule,
    DivisionRoutingModule,
  ]
})
export class DivisionModule { }
