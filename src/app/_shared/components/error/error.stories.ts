import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {Component} from '@angular/core';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ErrorModule} from './error.module';
import {requiredField} from '../../../_helpers';
import {TooltipModule} from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `
    <div class="container">
      <div class="row">
        <form [formGroup]="formGroup">
          <div class="form-group row">
            <label for="email">Email</label>
            <input type="email" class="form-control" id="email" formControlName="email">
            <app-error [formGroup]="formGroup" property="email"  *ngIf="formGroup.controls.email.errors"></app-error>
          </div>
        </form>
      </div>
    </div>`,
})
class ErrorStories {
  formGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.email,
      requiredField,
    ]),
  });
}

storiesOf('Error', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        ErrorStories,
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ErrorModule,
        TooltipModule.forRoot(),
        TranslateModule.forRoot(),
      ],
    }),
  )
  .add('default', () => ({
    component: ErrorStories,
    props: {},
  }));
