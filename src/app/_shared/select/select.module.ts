import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material';
import {TreeModule} from 'primeng/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClickOutsideModule} from 'ng-click-outside';
import {TreeSelectComponent} from './tree-select/tree-select.component';
import {MultiSelectComponent} from './multi-select/multi-select.component';
import {BsDropdownModule} from 'ngx-bootstrap';

@NgModule({
  declarations: [
    TreeSelectComponent,
    MultiSelectComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TreeModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    MatProgressSpinnerModule,
    BsDropdownModule,
  ],
  exports: [
    TreeSelectComponent,
    MultiSelectComponent,
  ],
})
export class SelectModule { }
