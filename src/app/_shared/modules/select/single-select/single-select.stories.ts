import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectModule} from '../select.module';
import {sampleList} from '../sample/list.sample';

storiesOf('Single Select', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        SelectModule,
      ],
    }),
  )
  .add('default', () => ({
    template: `
    <app-single-select [list]="list" (selectionChange)="onChange($event)" (listOpen)="open($event)"></app-single-select>`,
    props: {
      list: sampleList,
      onChange: (event) => {
        console.log(event);
      },
      open: (event) => {
        console.log(event);
      },
    },
  }));
