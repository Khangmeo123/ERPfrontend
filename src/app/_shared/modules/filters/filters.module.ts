import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap';
import { AdvancedFiltersComponent } from './advanced-filters/advanced-filters.component';
import { ListboxModule } from 'primeng/listbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { DatePickerModule } from '../date-picker/date-picker.module';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
  ],
  exports: [
    AdvancedFiltersComponent,
  ],
})
export class FiltersModule {
}
