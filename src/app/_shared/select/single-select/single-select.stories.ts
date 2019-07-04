import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {SelectModule} from '../select.module';
import {sampleMenuData} from './single-select.sample';

storiesOf('Single-Select', module)
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
            <app-single-select [options]="options" [selectedItem]="value"></app-single-select>
          </div>
        </div>
      </div>`,
    props: {
      options: sampleMenuData,
      selectedItem: null,
    },
  }));
