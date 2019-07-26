import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CropperModule } from './cropper.module';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  template: `
    <div class="container">
      <div class="row">
        <app-cropper [control]="image" (output)="onChange($event)"></app-cropper>
      </div>
    </div>`,
})
class CropperStories {
  form: FormGroup = new FormGroup({
    image: new FormControl(),
  });

  get image() {
    return this.form.get('image') as FormControl;
  }

  onChange(data) {
    console.log(data);
    console.log(this.image.value);
  }
}

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
        FormsModule,
        ReactiveFormsModule,
      ],
      entryComponents: [
        CropperStories,
      ],
    }),
  )
  .add('default', () => ({
    component: CropperStories,
  }));
