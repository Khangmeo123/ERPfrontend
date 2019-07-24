import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NoDataModule } from './no-data.module';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `
    <app-no-data></app-no-data>`,
})
export class NoDataStoriesComponent {

}

storiesOf('No Data', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        NoDataStoriesComponent
      ],
      imports: [
        CommonModule,
        NoDataModule,
        TranslateModule.forRoot(),
      ]
    })
  )
  .add('default', () => ({
    component: NoDataStoriesComponent,
    props: {}
  }));
