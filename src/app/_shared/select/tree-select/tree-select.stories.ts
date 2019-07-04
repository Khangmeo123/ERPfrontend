import {moduleMetadata, storiesOf} from '@storybook/angular';
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
    template:
      `<div class="container">
        <div class="row">
          <div class="col">
            <app-tree-select [mode]="mode" [options]="options"></app-tree-select>
          </div>
        </div>
      </div>`,
    props: {
      mode: 'single',
      options: sampleTree,
    },
  }))
  .add('loading', () => ({
    template:
      `<div class="container">
        <div class="row">
          <div class="col">
            <app-tree-select [mode]="mode" [isLoading]="isLoading"></app-tree-select>
          </div>
        </div>
      </div>`,
    props: {
      mode: 'single',
      isLoading: true,
    },
  }))
  .add('initialValue', () => ({
    template:
      `<div class="container">
        <div class="row">
          <div class="col">
            <app-tree-select [mode]="mode" [options]="options" [initialValue]="initialValue"></app-tree-select>
          </div>
        </div>
      </div>`,
    props: {
      mode: 'single',
      options: sampleTree,
      initialValue: sampleTree[0],
    },
  }))
  .add('multiple', () => ({
    template:
      `<div class="container">
        <div class="row">
          <div class="col">
            <app-tree-select [mode]="mode" [options]="options"></app-tree-select>
          </div>
        </div>
      </div>`,
    props: {
      mode: 'multiple',
      options: sampleTree,
    },
  }))
  .add('checkbox', () => ({
    template:
      `<div class="container">
        <div class="row">
          <div class="col">
            <app-tree-select [mode]="mode" [options]="options"></app-tree-select>
          </div>
        </div>
      </div>`,
    props: {
      mode: 'checkbox',
      options: sampleTree,
    },
  }));
