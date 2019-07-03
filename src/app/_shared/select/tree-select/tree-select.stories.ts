import {moduleMetadata, storiesOf} from '@storybook/angular';
import {TreeSelectComponent} from './tree-select.component';
import {TreeModule} from 'primeng/tree';
import {sampleTree} from './tree-select.sample';
import {SelectModule} from '../select.module';

storiesOf('Tree Select', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        TreeModule,
        SelectModule,
      ],
    }),
  )
  .add('single', () => ({
    component: TreeSelectComponent,
    props: {
      mode: 'single',
      options: sampleTree,
    },
  }))
  .add('loading', () => ({
    component: TreeSelectComponent,
    props: {
      mode: 'single',
      isLoading: true,
    },
  }))
  .add('initialValue', () => ({
    component: TreeSelectComponent,
    props: {
      mode: 'single',
      options: sampleTree,
      initialValue: sampleTree[0],
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
