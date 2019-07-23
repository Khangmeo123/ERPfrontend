import { Component } from '@angular/core';
import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SelectModule } from '../../select.module';
import { TranslateModule } from '@ngx-translate/core';
import { sampleList } from '../../sample/list.sample';

@Component({
  template: `
    <app-single-select key="label"
                       initialValue="Hello"
                       [list]="list"
                       [selectedList]="selectedList"
                       (selectionChange)="onChange($event)"
                       (listOpen)="open($event)"></app-single-select>`,
})
class SingleSelectStories {
  list = [];

  selectedList = [];

  onChange(event) {
    console.log(event);
  }

  open(event) {
    setTimeout(() => {
      // console.log(event);
      this.list = [
        ...sampleList,
      ];
      this.selectedList = [];
    }, 1000);
  }
}

storiesOf('Single Select', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        SingleSelectStories,
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SelectModule,
        TranslateModule.forRoot(),
      ],
    }),
  )
  .add('default', () => ({
    component: SingleSelectStories,
    props: {},
  }));
