import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {CropperModule} from './cropper.module';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `<div class="container">
  <div class="row">
  <app-cropper></app-cropper>
  </div>
</div>`,
})
class CropperStories {}

storiesOf('Cropper', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        CropperStories,
      ],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CropperModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        TranslateModule.forRoot(),
      ],
      entryComponents: [
        CropperStories,
      ],
    }),
  )
  .add('default', () => ({
    component: CropperStories,
  }));
