import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {InputNumberModule} from './input-number.module';
import {Component, Input} from '@angular/core';

@Component({
  template: `
    <div class="container">
      <div class="row">
        <div class="col-4 offset-4">
          <div class="form-group">
            <label for="input-number"></label>
            <app-input-number [onlyInteger]="onlyInteger" inputId="input-number"></app-input-number>
          </div>
        </div>
      </div>
    </div>
  `,

})
class InputNumberSampleComponent {
  @Input() onlyInteger = false;
}

storiesOf('InputNumber', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        InputNumberSampleComponent,
      ],
      imports: [
        CommonModule,
        InputNumberModule,
      ],
    }),
  )
  .add('default', () => ({
    component: InputNumberSampleComponent,
    props: {},
  }));
