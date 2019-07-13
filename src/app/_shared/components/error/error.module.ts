import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ErrorComponent } from './error.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ErrorComponent],
  imports: [
    CommonModule,
    TooltipModule.forRoot(),
    TranslateModule.forRoot(),
  ],
  exports: [
    ErrorComponent,
  ],
})
export class ErrorModule {
}
