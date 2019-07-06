import {storiesOf} from '@storybook/angular/dist/client/preview';
import {moduleMetadata} from '@storybook/angular';
import {FiltersModule} from '../filters.module';
import {TableModule} from 'primeng/table';
import {sampleTable} from './advanced-filters.sample';
import {TextFilter} from '../../../filters/TextFilter';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import {AdvancedFiltersComponent} from './advanced-filters.component';
import {DateFilter} from '../../../filters/DateFilter';
import {NumberFilter} from '../../../filters/NumberFilter';

storiesOf('Advanced Filters', module)
  .addDecorator(
    moduleMetadata({
      imports: [
        FiltersModule,
        TableModule,
        BrowserAnimationsModule,
        FormsModule,
        FiltersModule,
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
    },
  }));
