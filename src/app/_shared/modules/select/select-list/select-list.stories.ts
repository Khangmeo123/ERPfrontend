import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {SelectModule} from '../select.module';
import {SelectListComponent} from './select-list.component';
import {sampleList} from '../sample/list.sample';

storiesOf('Select List', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        SelectModule,
      ],
    }),
  )
  .add('default', () => ({
    component: SelectListComponent,
    props: {
      dataSource: sampleList,
    },
  }))
  .add('selected', () => ({
    component: SelectListComponent,
    props: {
      dataSource: sampleList,
      selected: true,
    },
  }));
