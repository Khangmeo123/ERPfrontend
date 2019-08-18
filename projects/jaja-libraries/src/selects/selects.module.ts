import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropListSelectComponent } from './drop-list-select/drop-list-select.component';
import { EnumListSelectComponent } from './enum-list-select/enum-list-select.component';
import { BsDropdownModule } from 'ngx-bootstrap';
import { NzEmptyModule, NzSpinModule } from 'ng-zorro-antd';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    DropListSelectComponent,
    EnumListSelectComponent
  ],
  exports: [
    DropListSelectComponent,
    EnumListSelectComponent,
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
      providers: []
    };
  }
}
