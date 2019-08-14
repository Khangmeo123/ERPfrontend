import { InvetoryRoutingModule } from './invetory-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvetoryComponent } from './invetory.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [InvetoryComponent],
  imports: [
    CommonModule,
    InvetoryRoutingModule,
    TranslateModule.forChild(),
  ]
})
export class InventoryModule { }
