import { InvetoryRoutingModule } from './invetory-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvetoryComponent } from './invetory.component';

@NgModule({
  declarations: [InvetoryComponent],
  imports: [
    CommonModule,
    InvetoryRoutingModule,
  ]
})
export class InventoryModule { }
