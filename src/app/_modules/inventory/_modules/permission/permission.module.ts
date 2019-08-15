import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PermissionComponent } from './permission.component';
import {PermissionRoutingModule} from './permission-routing.module';
import {MatFormFieldModule, MatIconModule} from '@angular/material';
import {TranslateModule} from '@ngx-translate/core';
import {TableModule} from 'primeng/table';
import {PaginationModule} from '../../../../_shared/modules/pagination/pagination.module';
import {SelectModule} from '../../../../_shared/modules/select/select.module';

@NgModule({
    declarations: [PermissionComponent],
    imports: [
      CommonModule,
      PermissionRoutingModule,
      MatIconModule,
      TranslateModule.forChild(),
      MatFormFieldModule,
      TableModule,
      PaginationModule,
      SelectModule,
    ]
  })
  export class PermissionModule {}
