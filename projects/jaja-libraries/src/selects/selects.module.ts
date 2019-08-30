import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectListComponent } from './select-list/select-list.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NzEmptyModule, NzSpinModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColumnTogglerComponent } from './column-toggler/column-toggler.component';


@NgModule({
  declarations: [
    SelectListComponent,
    ColumnTogglerComponent,
  ],
  exports: [
    SelectListComponent,
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    NzEmptyModule,
    TranslateModule.forChild(),
    NzSpinModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class SelectsModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SelectsModule,
      providers: [],
    };
  }
}
