import {moduleMetadata, storiesOf} from '@storybook/angular';
import {PaginationModule} from './pagination.module';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material';


storiesOf('Pagination', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        PaginationModule,
        FormsModule,
        MatIconModule,
      ],
    }),


  )
  .add('defaults', () => ({
    template:
      `<div class="container">
        <div class="row">
          <div class="col">
            <app-pagination></app-pagination>
          </div>
        </div>
      </div>`,
    props: {
      // pagination: sampleTree,
    },
  }));
