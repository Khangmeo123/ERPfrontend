import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { storiesOf } from '@storybook/angular/dist/client/preview';
import { moduleMetadata } from '@storybook/angular';
import { TableModule } from 'primeng/table';
import { sampleTable } from './advanced-filters.sample';
import { AdvancedFiltersComponent } from './advanced-filters.component';
import { FiltersModule } from '../filters.module';
import { TextFilter } from '../../../models/filters/TextFilter';
import { DateFilter } from '../../../models/filters/DateFilter';
import { NumberFilter } from '../../../models/filters/NumberFilter';

@Component({
  template: `
    <div class="container">
      <div class="row d-flex justify-content-end">
        <button class="btn btn-primary btn-sm mr-2" (click)="search(filter)">Search</button>
        <button class="btn btn-primary btn-sm" (click)="clearFilter()"> Clear</button>
      </div>
      <div class="row mt-4">
        <p-table [value]="users">
          <ng-template pTemplate="header">
            <tr>
              <th pResizableColumn> ID</th>
              <th pResizableColumn> Name</th>
              <th pResizableColumn> Email</th>
              <th pResizableColumn> Birthday</th>
            </tr>
            <tr>
              <th>
                <app-advanced-filters [filter]="filter.id" (changeFilter)="search()"></app-advanced-filters>
              </th>
              <th>
                <app-advanced-filters [filter]="filter.name" (changeFilter)="search()"></app-advanced-filters>
              </th>
              <th>
                <app-advanced-filters [filter]="filter.email" (changeFilter)="search()"></app-advanced-filters>
              </th>
              <th>
                <app-advanced-filters [filter]="filter.birthday" (changeFilter)="search()"></app-advanced-filters>
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
      </div>
    </div>`,
})
class AdvancedFiltersStories {
  users = sampleTable;

  filter = AdvancedFiltersStories.getNewFilter();

  static getNewFilter() {
    return {
      id: new TextFilter(),
      name: new TextFilter(),
      email: new NumberFilter(),
      birthday: new DateFilter(),
    };
  }

  search() {
    console.log('Search');
  }

  clearFilter() {
    this.filter = AdvancedFiltersStories.getNewFilter();
  }
}

storiesOf('Advanced Filters', module)
  .addDecorator(
    moduleMetadata({
      declarations: [
        AdvancedFiltersStories,
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        TableModule,
        FormsModule,
        ReactiveFormsModule,
        FiltersModule,
      ],
    }),
  )
  .add('text', () => ({
    template: `<app-advanced-filters [filter]="filter" (changeFilter)="changeFilter()"></app-advanced-filters>`,
    props: {
      filter: new TextFilter(),
      changeFilter(event) {
        console.log(event);
      },
    },
  }))
  .add('number', () => ({
    template: `<app-advanced-filters [filter]="filter" (changeFilter)="changeFilter()"></app-advanced-filters>`,
    props: {
      filter: new NumberFilter(),
      changeFilter(event) {
        console.log(event);
      },
    },
  }))
  .add('date', () => ({
    template: `<app-advanced-filters [filter]="filter" (changeFilter)="changeFilter()"></app-advanced-filters>`,
    props: {
      filter: new DateFilter(),
      changeFilter(event) {
        console.log(event);
      },
    },
  }))
  .add('table', () => ({
    component: AdvancedFiltersStories,
    props: {},
  }));
