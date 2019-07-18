import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectModule} from '../../select.module';
import {sampleList} from '../../sample/list.sample';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `
    <app-multi-select [list]="list" (selectionChange)="onChange($event)" (listOpen)="onOpen($event)"></app-multi-select>`,
})
class MultiSelectStories {
  @Input() list = [];

  @Output() listChange = new EventEmitter();

  @Output() listOpen = new EventEmitter();

  onChange(event) {
    this.listChange.emit(event);
  }

  onOpen(event) {
    setTimeout(() => {
      this.list = [
        ...sampleList,
      ];
    }, 2000);
  }
}

storiesOf('Multi Select', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        MultiSelectStories,
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
    component: MultiSelectStories,
    props: {
      list: sampleList,
      listChange: (event) => {
        console.log(event);
      },
      listOpen: (event) => {
        console.log(event);
      },
    },
  }));
