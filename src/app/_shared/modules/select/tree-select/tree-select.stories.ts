import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {CommonModule} from '@angular/common';
import {SelectModule} from '../select.module';
import {sampleTree} from '../sample/tree.sample';
import {sampleList} from '../sample/list.sample';

storiesOf('Tree Select', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        SelectModule,
        BrowserAnimationsModule,
      ],
    }),
  )
  .add('default', () => ({
    template: `<div class="container">
  <div class="row">
    <div class="col">
      <app-tree-select [dataSource]="dataSource" [selected]="selected"></app-tree-select>
    </div>
  </div>
</div>
`,
    props: {
      dataSource: sampleTree,
      selected: sampleList,
    },
  }));
