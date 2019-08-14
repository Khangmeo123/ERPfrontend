import {Component} from '@angular/core';
import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SelectModule} from '../../select.module';
import {TranslateModule} from '@ngx-translate/core';
import {sampleList} from '../../sample/list.sample';

@Component({
  template: `
      <div class="container">
          <div class="row">
              <div class="col">
                  <app-single-select key="label"
                                     initialValue="Hello"
                                     [list]="list"
                                     [selectedList]="selectedList"
                                     (selectionChange)="onChange($event)"
                                     [disabled]="disabled"
                                     (listOpen)="open($event)"></app-single-select>
              </div>
          </div>
      </div>`,
})
class SingleSelectStories {
  list = [];

  selectedList = [];

  disabled: boolean = false;

  onChange(event) {
    console.log(event);
  }

  open(event) {
    setTimeout(() => {
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
  }))
  .add('disabled', () => ({
    component: SingleSelectStories,
    props: {
      disabled: true,
    },
  }))
  .add('table', () => ({
    template: `<div class="container">
<div class="row">
<div class="col">
<table class="table">
  <thead>
  <tr>
    <th>Status</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
      <app-multi-select [list]="list" [selectedList]="selectedList"></app-multi-select>
    </td>
  </tr>
  <tr>
    <td>
      <app-multi-select [list]="list" [selectedList]="selectedList"></app-multi-select>
    </td>
  </tr>
  <tr>
    <td>
      <app-multi-select [list]="list" [selectedList]="selectedList"></app-multi-select>
    </td>
  </tr>
  </tbody>
</table>
</div>
</div>
</div>`,
    props: {
      list: sampleList,
      selectedList: [],
    },
  }));
