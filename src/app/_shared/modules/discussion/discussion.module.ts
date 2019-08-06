import { InputDiscussionComponent, SafeHtmlPipe } from './input-discussion/input-discussion.component';
import { DiscussionComponent } from './discussion.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from './backend/time-ago.pipe';
import { DiscussionService } from './backend/discussion.service';

@NgModule({
  declarations: [DiscussionComponent, InputDiscussionComponent, SafeHtmlPipe, TimeAgoPipe],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    DiscussionComponent, InputDiscussionComponent,
  ],
  providers: [DiscussionService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DiscussionModule { }
