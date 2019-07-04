import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {TreeModule} from 'primeng/tree';
import {ListboxModule} from 'primeng/listbox';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ClickOutsideModule} from 'ng-click-outside';
import {MultiSelectComponent} from './multi-select/multi-select.component';
import {TreeSelectComponent} from './tree-select/tree-select.component';
import {SingleSelectComponent} from './single-select/single-select.component';

@NgModule({
  declarations: [
    TreeSelectComponent,
    MultiSelectComponent,
    SingleSelectComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TreeModule,
    ListboxModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    MatProgressSpinnerModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    TreeSelectComponent,
    MultiSelectComponent,
    SingleSelectComponent,
  ],
})
export class SelectModule {}
