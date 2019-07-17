import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AdvancedFiltersComponent } from './advanced-filters/advanced-filters.component';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
    ClickOutsideModule,
    DatePickerModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdvancedFiltersComponent,
  ],
})
export class FiltersModule {
}
