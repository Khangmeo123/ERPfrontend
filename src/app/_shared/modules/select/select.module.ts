import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeSelectComponent} from './tree-select/tree-select.component';
import {SelectHeadComponent} from './select-head/select-head.component';
import {BsDropdownModule, TooltipModule} from 'ngx-bootstrap';
import {SelectBodyComponent} from './select-body/select-body.component';
import {SelectComponent} from './select/select.component';
import {TreeModule} from 'primeng/tree';
import {SelectListComponent} from './select-list/select-list.component';
import { SingleSelectComponent } from './single-select/single-select.component';
import { MultiSelectComponent } from './multi-select/multi-select.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { SelectSpinnerComponent } from './select-spinner/select-spinner.component';
import { SelectSearchComponent } from './select-search/select-search.component';
import {MatIconModule} from '@angular/material/icon';
import {ClickOutsideModule} from 'ng-click-outside';

@NgModule({
  declarations: [
    TreeSelectComponent,
    SelectHeadComponent,
    SelectBodyComponent,
    SelectComponent,
    SelectListComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    SelectSpinnerComponent,
    SelectSearchComponent,
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TreeModule,
    TooltipModule.forRoot(),
    MatProgressSpinnerModule,
    MatIconModule,
    ClickOutsideModule,
  ],
  exports: [
    TreeSelectComponent,
    SingleSelectComponent,
    MultiSelectComponent,
  ],
})
export class SelectModule {
}
