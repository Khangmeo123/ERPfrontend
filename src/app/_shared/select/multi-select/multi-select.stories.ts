import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {SelectModule} from '../select.module';
import {sampleMenuData} from './multi-select.sample';

storiesOf('Multi-Select', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        SelectModule,
      ],
    }),
  )
  .add('default', () => ({
    template:
      `<div class="container">
        <app-multi-select [options]="options"></app-multi-select>
      </div>`,
    props: {
      options: sampleMenuData,
    },
  }));
