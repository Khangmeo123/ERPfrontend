import {Component, Input} from '@angular/core';
import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {SelectModule} from '../select.module';
import {SelectMode} from '../select.interface';

const getSampleFlatList = () => [
  {
    id: 1,
    label: 'Item 1',
  },
  {
    id: 2,
    parentId: 1,
    label: 'Item 1.1',
  },
];

@Component({
  template: `
    <app-tree-select [dataSource]="data" [mode]="mode" (firstLoadData)="firstLoadData()" [firstLoad]="true"></app-tree-select>`,
})
export class TreeSelectParentSampleComponent {
  @Input() mode: SelectMode = 'single';

  data = [];

  firstLoadData() {
    setTimeout(() => {
      this.data = getSampleFlatList();
    }, 2000);
  }
}


storiesOf('Tree Select', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        TreeSelectParentSampleComponent,
      ],
      imports: [
        CommonModule,
        SelectModule,
        BrowserAnimationsModule,
      ],
    }),
  )
  .add('single', () => ({
    template: `<div class="container">
  <div class="row">
    <div class="col">
      <app-tree-select (firstLoadData)="null" [mode]="mode" [dataSource]="dataSource"></app-tree-select>
    </div>
  </div>
</div>
`,
    props: {
      mode: 'single',
      dataSource: getSampleFlatList(),
    },
  }))
  .add('multiple', () => ({
    template: `<div class="container">
  <div class="row">
    <div class="col">
      <app-tree-select (firstLoadData)="null" [mode]="mode" [dataSource]="dataSource"></app-tree-select>
    </div>
  </div>
</div>
`,
    props: {
      mode: 'multiple',
      dataSource: getSampleFlatList(),
    },
  }))
  .add('checkbox', () => ({
    template: `<div class="container">
  <div class="row">
    <div class="col">
      <app-tree-select (firstLoadData)="null" [mode]="mode" [dataSource]="dataSource"></app-tree-select>
    </div>
  </div>
</div>
`,
    props: {
      mode: 'checkbox',
      dataSource: getSampleFlatList(),
    },
  }))
  .add('fixed-bottom', () => ({
    template: `<div class="container">
  <div class="row">
    <div class="col fixed-bottom mb-4">
      <app-tree-select (firstLoadData)="null" [mode]="mode" [dataSource]="dataSource"></app-tree-select>
    </div>
  </div>
</div>
`,
    props: {
      mode: 'checkbox',
      dataSource: getSampleFlatList(),
    },
  }))
  .add('inside parent', () => ({
    component: TreeSelectParentSampleComponent,
    props: {
      mode: 'checkbox',
      dataSource: getSampleFlatList(),
    },
  }));
