import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CropperComponent} from './cropper.component';
import {DialogModule} from 'primeng/dialog';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from 'primeng/tooltip';

@NgModule({
  declarations: [
    CropperComponent,
  ],
  imports: [
    CommonModule,
    DialogModule,
    TranslateModule,
    TooltipModule,
  ],
  exports: [
    CropperComponent,
  ],
})
export class CropperModule {
}
