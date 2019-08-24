import { InventoryRoutingModule } from './inventory-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InventoryComponent } from './inventory.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    InventoryComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    TranslateModule.forChild(),
  ],
})
export class InventoryModule {
}
