import {Component} from '@angular/core';
import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectModule} from '../../select.module';
import {sampleList} from '../../sample/list.sample';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  template: `
      <app-simple-select key="label"
                         [list]="list"
                         [initialValue]="selectedData?.label"
                         [valueSelector]="nodeSelector"
                         (selectionChange)="onChange($event)"
                         (listOpen)="open($event)"
      ></app-simple-select>`,
})
class SimpleSelectStories {
  list = [];

  selectedData: any = null;

  nodeSelector = node => node;

  onChange(event) {
    this.selectedData = event;
  }

  open(event) {
    setTimeout(() => {
      console.log(event);
      this.list = [
        ...sampleList,
      ];
    }, 2000);
  }
}

storiesOf('Simple Select', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        SimpleSelectStories,
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SelectModule,
        TranslateModule.forRoot({}),
      ],
    }),
  )
  .add('default', () => ({
    component: SimpleSelectStories,
    props: {
      list: sampleList,
    },
  }));
