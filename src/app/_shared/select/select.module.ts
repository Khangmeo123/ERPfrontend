import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material';
import {TreeModule} from 'primeng/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClickOutsideModule} from 'ng-click-outside';
import {TreeSelectComponent} from './tree-select/tree-select.component';

@NgModule({
  declarations: [
    TreeSelectComponent,
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    TreeModule,
    BrowserAnimationsModule,
    ClickOutsideModule,
    MatProgressSpinnerModule,
  ],
  exports: [
    TreeSelectComponent,
  ],
})
export class SelectModule { }
