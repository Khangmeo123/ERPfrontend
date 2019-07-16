import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerComponent} from './date-picker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatDatepickerModule, MatFormFieldModule, MatIconModule, MatNativeDateModule } from '@angular/material';
import {MatMomentDateModule} from '@angular/material-moment-adapter';

@NgModule({
  declarations: [
    DatePickerComponent,
  ],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
  ],
  exports: [
    DatePickerComponent,
  ],
  providers: [],
})
export class DatePickerModule {
}
