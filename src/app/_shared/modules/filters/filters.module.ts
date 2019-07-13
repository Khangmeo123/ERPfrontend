import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AdvancedFiltersComponent } from './advanced-filters/advanced-filters.component';
import { ListboxModule } from 'primeng/listbox';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { ClickOutsideModule } from 'ng-click-outside';
import { DatePickerModule } from '../date-picker/date-picker.module';

@NgModule({
  declarations: [
    AdvancedFiltersComponent,
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ListboxModule,
    InputTextModule,
    FormsModule,
    CalendarModule,
    ClickOutsideModule,
    DatePickerModule,
  ],
  exports: [
    AdvancedFiltersComponent,
  ],
})
export class FiltersModule {
}
