import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { InputNumberModule } from './input-number.module';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  template: `
      <div class="container">
          <div class="row">
              <div class="col-4 offset-4">
                  <div class="form-group">
                      <label for="input-number"></label>
                      <app-input-number [onlyInteger]="onlyInteger" inputId="input-number"
                                        (numberChange)="numberChange.emit($event)"></app-input-number>
                  </div>
              </div>
          </div>
      </div>
  `,

})
class InputNumberSampleComponent {
  @Input() onlyInteger = false;

  @Output() numberChange: EventEmitter<number> = new EventEmitter<number>();
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
    props: {
      numberChange(event) {
        console.log(event);
      },
    },
  }));
