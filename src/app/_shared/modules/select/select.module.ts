import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeSelectComponent} from './tree-select/tree-select.component';
import {SelectHeadComponent} from './select-head/select-head.component';
import {BsDropdownModule, TooltipModule} from 'ngx-bootstrap';
import {SelectBodyComponent} from './select-body/select-body.component';
import {SelectComponent} from './select/select.component';
import {TreeModule} from 'primeng/tree';
import {SelectListComponent} from './select-list/select-list.component';

@NgModule({
  declarations: [
    TreeSelectComponent,
    SelectHeadComponent,
    SelectBodyComponent,
    SelectComponent,
    SelectListComponent,
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TreeModule,
    TooltipModule.forRoot(),
  ],
  exports: [
    TreeSelectComponent,
  ],
})
export class SelectModule {
}
