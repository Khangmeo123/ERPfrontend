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
        <div class="row">
          <div class="col">
            <app-multi-select [options]="options" [values]="values"></app-multi-select>
          </div>
        </div>
      </div>`,
    props: {
      options: sampleMenuData,
      values: [],
    },
  }));
