import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectModule} from '../../select.module';
import {sampleList} from '../../sample/list.sample';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateModule} from '@ngx-translate/core';

@Component({
  template: `
      <app-multi-select [list]="list"
                        (selectionChange)="onChange($event)"
                        key="label"
                        (listOpen)="onOpen($event)"
      ></app-multi-select>`,
})
class MultiSelectStoriesComponent {
  @Input() list = [];

  @Input() sampleList = sampleList;

  @Output() listChange = new EventEmitter();

  @Output() listOpen = new EventEmitter();

  onChange(event) {
    this.listChange.emit(event);
  }

  @Input()
  onOpen(event) {
    setTimeout(() => {
      this.list = [
        ...this.sampleList,
      ];
    }, 1000);
  }
}

storiesOf('Multi Select', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        MultiSelectStoriesComponent,
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
    component: MultiSelectStoriesComponent,
    props: {
      list: sampleList,
    },
  }))
  .add('no-data', () => ({
    component: MultiSelectStoriesComponent,
    props: {
      list: sampleList,
      sampleList: [],
    },
  }));
