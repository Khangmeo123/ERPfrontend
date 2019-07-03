import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material';
import {TreeModule} from 'primeng/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ClickOutsideModule} from 'ng-click-outside';
import {TreeSelectComponent} from './tree-select/tree-select.component';
import {MultiSelectComponent} from './multi-select/multi-select.component';

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
    BsDropdownModule.forRoot(),
  ],
  exports: [
    TreeSelectComponent,
    MultiSelectComponent,
  ],
})
export class SelectModule { }
