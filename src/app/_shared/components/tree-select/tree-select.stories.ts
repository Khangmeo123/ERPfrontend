import {moduleMetadata, storiesOf} from '@storybook/angular';
import {TreeSelectComponent} from './tree-select.component';
import {TreeModule} from 'primeng/tree';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ClickOutsideModule} from 'ng-click-outside';
import {sampleTree} from '../sample-data/tree.sample';

storiesOf('Tree Select', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        TreeModule,
        BrowserAnimationsModule,
        ClickOutsideModule,
      ]
    })
  )
  .add('single', () => ({
    component: TreeSelectComponent,
    props: {
      mode: 'single',
      options: sampleTree,
    },
  }))
  .add('multiple', () => ({
    component: TreeSelectComponent,
    props: {
      mode: 'multiple',
      options: sampleTree,
    },
  }))
  .add('checkbox', () => ({
    component: TreeSelectComponent,
    props: {
      mode: 'checkbox',
      options: sampleTree,
    },
  }));
