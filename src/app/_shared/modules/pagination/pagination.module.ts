import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';

@NgModule({
  declarations: [
    PaginationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
  ],
  exports: [
    PaginationComponent,
  ],
})
export class PaginationModule {}
