import {Component} from '@angular/core';
import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectModule} from '../../select.module';
import {sampleList} from '../../sample/list.sample';

@Component({
  template: `
    <app-single-select key="label" [list]="list" (selectionChange)="onChange($event)" (listOpen)="open($event)"></app-single-select>`,
})
class Props {
  list = [];

  onChange(event) {
    console.log('Selection changed');
    console.log(event);
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
storiesOf('Single Select', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        Props,
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SelectModule,
      ],
    }),
  )
  .add('default', () => ({
    component: Props,
    props: {},
  }));
