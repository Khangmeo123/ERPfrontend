import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {MultiSelectComponent} from './multi-select.component';
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
    component: MultiSelectComponent,
    props: {
      options: sampleMenuData,
    },
  }));
