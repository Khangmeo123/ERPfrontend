import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {InputNumberModule} from './input-number.module';
import {InputNumberComponent} from './input-number.component';

storiesOf('InputNumber', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        InputNumberModule,
      ],
    }),
  )
  .add('default', () => ({
    component: InputNumberComponent,
  }));
