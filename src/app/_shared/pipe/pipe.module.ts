import { Gender } from './gender.pipe';
import { NgModule } from '@angular/core';
import { SafeHtml } from './salehtml.pipe';


@NgModule({
  declarations: [
    SafeHtml, Gender,
  ],
  imports: [
  ],
  exports: [
    SafeHtml, Gender,
  ],
})
export class PipeModule { }
