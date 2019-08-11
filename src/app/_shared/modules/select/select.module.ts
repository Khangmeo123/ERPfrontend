import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TreeSelectComponent} from './components/tree-select/tree-select.component';
import {SelectHeadComponent} from './components/select-head/select-head.component';
import {BsDropdownModule, TooltipModule} from 'ngx-bootstrap';
import {SelectBodyComponent} from './components/select-body/select-body.component';
import {SelectComponent} from './components/select/select.component';
import {TreeModule} from 'primeng/tree';
import {SelectListComponent} from './components/select-list/select-list.component';
import {SingleSelectComponent} from './components/single-select/single-select.component';
import {MultiSelectComponent} from './components/multi-select/multi-select.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SelectSpinnerComponent} from './components/select-spinner/select-spinner.component';
import {SelectSearchComponent} from './components/select-search/select-search.component';
import {MatIconModule} from '@angular/material/icon';
import {ClickOutsideModule} from 'ng-click-outside';
import {TranslateModule} from '@ngx-translate/core';
import {SimpleSelectComponent} from './components/simple-select/simple-select.component';
import {NoDataModule} from '../no-data/no-data.module';

@NgModule({
  declarations: [
    TreeSelectComponent,
    SelectHeadComponent,
    SelectBodyComponent,
    SelectComponent,
    SelectListComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    SelectSpinnerComponent,
    SelectSearchComponent,
    SimpleSelectComponent,
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    TreeModule,
    TooltipModule.forRoot(),
    MatProgressSpinnerModule,
    MatIconModule,
    ClickOutsideModule,
    TranslateModule,
    NoDataModule,
  ],
  exports: [
    TreeSelectComponent,
    SingleSelectComponent,
    MultiSelectComponent,
    SimpleSelectComponent,
  ],
})
export class SelectModule {
}
