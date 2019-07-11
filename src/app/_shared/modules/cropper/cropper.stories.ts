import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {Component} from '@angular/core';
import {CropperModule} from './cropper.module';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

@Component({
  template: `<div class="container">
  <div class="row">
  <app-cropper>
    <button class="btn btn-primary">
      Upload
    </button>
  </app-cropper>
  </div>
</div>`,
})
class CropperStories {

}

storiesOf('Cropper', module)
  .addDecorator(
    moduleMetadata({
      declarations: [],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CropperModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
      ],
      entryComponents: [
        CropperStories,
      ],
    }),
  )
  .add('default', () => ({
    component: CropperStories,
  }));
