import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TableColumnTogglerComponent} from './table-column-toggler/table-column-toggler.component';
import {BsDropdownModule} from 'ngx-bootstrap';
import {NzButtonModule, NzCheckboxModule} from 'ng-zorro-antd';
import {TableColumnTogglerRoutingModule} from './table-column-toggler-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    TableColumnTogglerComponent,
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    NzCheckboxModule,
    TableColumnTogglerRoutingModule,
    NzButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    TableColumnTogglerComponent,
  ],
})
export class TableColumnTogglerModule {
}
