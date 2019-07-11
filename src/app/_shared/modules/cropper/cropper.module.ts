import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CropperComponent} from './cropper.component';
import {DialogModule} from 'primeng/dialog';

@NgModule({
  declarations: [
    CropperComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
  ],
  exports: [
    CropperComponent,
  ],
})
export class CropperModule {
}
