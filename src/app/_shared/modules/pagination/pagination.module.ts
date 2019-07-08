import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PaginationComponent} from './pagination.component';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'ceilMath'})
export class MathCeilPipe implements PipeTransform {
  transform(value: number): number {
    return Math.ceil(value);
  }
}


@NgModule({
  declarations: [
    PaginationComponent,
    MathCeilPipe,
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
