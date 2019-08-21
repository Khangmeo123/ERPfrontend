import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './permission/permission.component';
import { PermissionRoutingModule } from './permission-routing.module';
import { MatFormFieldModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { PaginationModule } from '../../../../_shared/modules/pagination/pagination.module';
import { SelectModule } from '../../../../_shared/modules/select/select.module';
import { FiltersModule } from '../../../../_shared/modules/filters/filters.module';
import { PermissionDetailComponent } from './permission-detail/permission-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KeyFilterModule } from 'primeng/keyfilter';
import { EditorModule } from 'primeng/editor';
import { ErrorModule } from '../../../../_shared/components/error/error.module';
import { SelectsModule } from 'jaja-libraries/src/selects/selects.module';

@NgModule({
  declarations: [
    PermissionComponent,
    PermissionDetailComponent,
  ],
  imports: [
    CommonModule,
    PermissionRoutingModule,
    MatIconModule,
    TranslateModule.forChild(),
    MatFormFieldModule,
    TableModule,
    PaginationModule,
    SelectModule,
    FiltersModule,
    ReactiveFormsModule,
    KeyFilterModule,
    EditorModule,
    FormsModule,
    ErrorModule,
    SelectsModule,
  ],
})
export class PermissionModule {
}
