import {NgModule} from '@angular/core';
import { SafeHtml } from './salehtml.pipe';


@NgModule({
  declarations: [
    SafeHtml,
  ],
  imports: [
  ],
  exports: [
    SafeHtml,
  ],
})
export class PipeModule {}
