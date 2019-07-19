import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { DatePickerModule } from './date-picker.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { dateField } from '../../../_helpers';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `
    <div class="container">
      <div class="row">
        <div class="col-12">
          <form [formGroup]="form">
            <app-date-picker [control]="date"></app-date-picker>
          </form>
        </div>
        <div class="col-12 mt-2">
          <span>
            Value: {{date.value}}
          </span>
        </div>
        <div class="col-12 mt-2" *ngIf="date.errors?.invalidDate">
          <div class="alert alert-danger">
            {{date.errors?.invalidDate}}
          </div>
        </div>
      </div>
    </div>`,
})
export class DatePickerStories {
  form = new FormGroup({
    date: new FormControl(null, dateField),
  });

  get date(): FormControl {
    return this.form.get('date') as FormControl;
  }
}

storiesOf('DatePicker', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        DatePickerStories,
      ],
      imports: [
        CommonModule,
        DatePickerModule,
        MomentDateModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({}),
      ],
    }),
  )
  .add('default', () => ({
    component: DatePickerStories,
    props: {},
  }));
