import { WarehouseDetailComponent } from './_page/warehouse-detail/warehouse-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentRoutingModule } from './department-routing.module';

import { DepartmentComponent } from './_page/department/department.component';
import { TranslateModule } from '@ngx-translate/core';
import { HrOrganizationComponent } from './_page/hr-organization/hr-organization.component';
import { AssetOrganizationComponent } from './_page/asset-organization/asset-organization.component';
import { WarehouseComponent } from './_page/warehouse/warehouse.component';
import { ProjectOrganizationComponent } from './_page/project-organization/project-organization.component';
import { MatIconModule } from '@angular/material';
import { SelectModule } from '../../../../_shared/modules/select/select.module';
import { TableModule } from 'primeng/table';
import { FiltersModule } from '../../../../_shared/modules/filters/filters.module';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from '../../../../_shared/modules/date-picker/date-picker.module';
import { AssetListComponent } from './_page/asset-list/asset-list.component';
import { WarehouseListComponent } from './_page/warehouse-list/warehouse-list.component';
import { DepartmentEmployeeDetailComponent } from './_page/employee-detail/employee-detail.component';
import { DepartmentRootComponent } from './_page/department-root/department-root.component';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AccordionModule, BsDropdownModule } from 'ngx-bootstrap';
import { PaginationModule } from 'src/app/_shared/modules/pagination/pagination.module';
import { DepartmentService } from './_page/department/department.service';
import { ErrorModule } from '../../../../_shared/components/error/error.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HrOrganizationRepository } from './_page/hr-organization/hr-organization.repository';
import { GeneralService } from '../../../../_helpers/general-service.service';
import { ChipsModule } from 'primeng/chips';
import {ConfirmationPopoverModule} from 'jaja.vn-angular-confirmation-popover';

@NgModule({
  declarations: [
    DepartmentComponent,
    HrOrganizationComponent,
    AssetOrganizationComponent,
    WarehouseComponent,
    ProjectOrganizationComponent,
    AssetListComponent,
    WarehouseListComponent,
    DepartmentEmployeeDetailComponent,
    DepartmentRootComponent,
    WarehouseComponent,
    WarehouseListComponent,
    WarehouseDetailComponent,
  ],
  imports: [
    CommonModule,
    DepartmentRoutingModule,
    TranslateModule,
    MatIconModule,
    SelectModule,
    TableModule,
    FiltersModule,
    DialogModule,
    DatePickerModule,
    RadioButtonModule,
    ConfirmationPopoverModule.forRoot(),
    BsDropdownModule.forRoot(),
    AccordionModule.forRoot(),
    PaginationModule,
    ErrorModule,
    FormsModule,
    ReactiveFormsModule,
    ChipsModule,

  ],
  providers: [
    DepartmentService,
    HrOrganizationRepository,
    GeneralService,
  ],
})
export class DepartmentModule {
}
