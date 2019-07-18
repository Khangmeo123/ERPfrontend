import { moduleMetadata, storiesOf } from '@storybook/angular';
import { PaginationModule } from './pagination.module';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';


storiesOf('Pagination', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        PaginationModule,
        FormsModule,
        MatIconModule,
        TranslateModule.forRoot(),
      ],
    }),
  )
  .add('defaults', () => ({
    template:
      `<div class="container">
        <div class="row">
          <div class="col">
            <app-pagination [pagination]="pagination" (paginationOut)="event($event)"></app-pagination>
          </div>
        </div>
      </div>`,
    props: {
      pagination: {
        pageNumber: 1,
        take: 50,
        totalItems: 20,
        skip: 0,
      },
      event: (event) => {
        console.log(event);
      },
    },
  }));
