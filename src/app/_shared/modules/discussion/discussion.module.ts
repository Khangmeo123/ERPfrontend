import { InputDiscussionComponent, SafeHtmlPipe } from './input-discussion/input-discussion.component';
import { DiscussionComponent } from './discussion.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TimeAgoPipe } from './backend/time-ago.pipe';
import { DiscussionService } from './backend/discussion.service';
import { TranslateModule } from '@ngx-translate/core';
import { JwtInterceptor, ErrorInterceptor } from 'src/app/_helpers';
import { BsDropdownModule } from 'ngx-bootstrap';
import {ConfirmationPopoverModule} from 'jaja.vn-angular-confirmation-popover';

@NgModule({
  declarations: [DiscussionComponent, InputDiscussionComponent, SafeHtmlPipe, TimeAgoPipe],
  imports: [
    CommonModule,
    HttpClientModule,
    TranslateModule,
    BsDropdownModule.forRoot(),
  ],
  exports: [
    DiscussionComponent, InputDiscussionComponent,
  ],
  providers: [DiscussionService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DiscussionModule { }
