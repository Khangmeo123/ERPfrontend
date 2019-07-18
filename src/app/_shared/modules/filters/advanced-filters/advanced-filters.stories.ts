import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { FiltersModule } from '../filters.module';
import { TableModule } from 'primeng/table';
import { sampleTable } from './advanced-filters.sample';
import { TextFilter } from '../../../models/filters/TextFilter';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AdvancedFiltersComponent } from './advanced-filters.component';
import { DateFilter } from '../../../models/filters/DateFilter';
import { NumberFilter } from '../../../models/filters/NumberFilter';
import { TranslateModule } from '@ngx-translate/core';

storiesOf('Advanced Filters', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        FiltersModule,
        TableModule,
        BrowserAnimationsModule,
        FormsModule,
        FiltersModule,
        TranslateModule.forRoot(),
      ],
    }),
  )
  .add('text', () => ({
    component: AdvancedFiltersComponent,
    props: {
      filter: new TextFilter(),
    },
  }))
  .add('number', () => ({
    component: AdvancedFiltersComponent,
    props: {
      filter: new NumberFilter(),
    },
  }))
  .add('date', () => ({
    component: AdvancedFiltersComponent,
    props: {
      filter: new DateFilter(),
    },
  }))
  .add('dropdown-left', () => ({
    template: `<div class="d-flex justify-content-end">
      <app-advanced-filters [filter]="filter"></app-advanced-filters>
    </div>`,
    props: {
      filter: new TextFilter(),
    },
  }))
  .add('table', () => ({
    template: `
    <div class="container">
    <button (click)="Seach(filter)">Search</button>
    <p-table [value]="users">
      <ng-template pTemplate="header">
          <tr>
              <th pResizableColumn>
              ID
              </th>
              <th pResizableColumn> Name </th>
              <th pResizableColumn> Email </th>
              <th pResizableColumn> Birthday </th>
          </tr>
          <tr>
            <th>
              <app-advanced-filters [filter]="filter.id" (changeFilter)="Seach($event)"></app-advanced-filters>
            </th>
            <th>
              <app-advanced-filters [filter]="filter.name" (changeFilter)="Seach($event)"></app-advanced-filters>
            </th>
            <th>
              <app-advanced-filters [filter]="filter.email" (changeFilter)="Seach($event)"></app-advanced-filters>
            </th>
            <th>
              <app-advanced-filters [filter]="filter.birthday" (changeFilter)="Seach($event)"></app-advanced-filters>
            </th>
          </tr>
      </ng-template>
      <ng-template pTemplate="body" let-user>
          <tr>
              <td> {{user.id}} </td>
              <td> {{user.name}} </td>
              <td> {{user.email}} </td>
              <td> {{user.birthday}} </td>
          </tr>
      </ng-template>
    </p-table>
</div>`,
    props: {
      users: sampleTable,
      filter: {
        id: new TextFilter(),
        name: new TextFilter(),
        email: new NumberFilter(),
        birthday: new DateFilter(),
      },
      Seach: (event) => {
        console.log(event);
      },
    },
  }));
