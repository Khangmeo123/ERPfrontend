import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/division.entity';
import { Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../../_helpers/string';
import { HrOrganizationEntity } from '../../../../_backend/hr-organization/hr-organization.entity';
import { HrOrganizationSearchEntity } from '../../../../_backend/hr-organization/hr-organization.search-entity';
import { HrOrganizationService } from './hr-organization.service';
import { DepartmentService } from '../department/department.service';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { EmployeeEntity } from '../../../../_backend/employee/employee.entity';
import { EmployeeSearchEntity } from '../../../../_backend/employee/employee.searchentity';
import { Router } from '@angular/router';
import { Entities } from '../../../../../../_helpers/entity';

@Component({
  selector: 'app-hr-organization',
  templateUrl: './hr-organization.component.html',
  styleUrls: ['./hr-organization.component.scss'],
  providers: [
    ToastrService,
    HrOrganizationService,
  ],
})
export class HrOrganizationComponent implements OnInit, OnDestroy {
  /**
   * Department modal state
   */
  public modal: boolean = false;

  /**
   * HrOrganization list
   */
  public hrOrganizationList: HrOrganizationEntity[] = [];
  public selectedDepartment: HrOrganizationEntity = null;
  public hrOrganizationSearchEntity: HrOrganizationSearchEntity = new HrOrganizationSearchEntity();
  public hrOrganizationForm: FormGroup;

  /**
   * Employees in selected department
   */
  public employeeList: EmployeeEntity[] = [];
  public employeeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
  public employeePagination: PaginationModel = new PaginationModel();

  /**
   * Employees not in selected department
   */
  public employeeNotInDepartmentList: EmployeeEntity[] = [];
  public selectedEmployeeToAddToDepartmentList: EmployeeEntity[] = [];
  public employeeNotInDepartmentSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
  public employeeTyping: Subject<EmployeeSearchEntity> = new Subject<EmployeeSearchEntity>();

  /**
   * Pagination model
   */
  public pagination: PaginationModel = new PaginationModel();
  public legalEntity: LegalEntity = null;
  public division: DivisionEntity = null;

  /**
   * Data subscriptions
   */
  public subscription: Subscription = new Subscription();

  constructor(
    private departmentService: DepartmentService,
    private hrOrganizationService: HrOrganizationService,
    private toastrService: ToastrService,
    private generalService: GeneralService,
    private router: Router,
  ) {
    const hrOrganizationFormSub: Subscription = this.hrOrganizationService.hrOrganizationForm.subscribe((form: FormGroup) => {
      this.hrOrganizationForm = form;
    });

    const legalEntitySub: Subscription = this.departmentService.selectedLegalEntity.subscribe((legalEntity: LegalEntity) => {
      if (legalEntity) {
        this.legalEntity = legalEntity;
        this.hrOrganizationSearchEntity.legalEntityId = legalEntity.id;
        this.getList();
      }
    });

    const divisionSub: Subscription = this.departmentService.selectedDivision.subscribe((division: DivisionEntity) => {
      if (division) {
        this.division = division;
        this.hrOrganizationSearchEntity.divisionId = division.id;
        this.getList();
      }
    });

    const hrOrganizationListSub: Subscription = this.hrOrganizationService.hrOrganizationList
      .subscribe((hrOrganizationList: HrOrganizationEntity[]) => {
        this.hrOrganizationList = hrOrganizationList;
        if (hrOrganizationList.length) {
          this.selectedDepartment = hrOrganizationList[0];
          this.onSelectDepartment(this.selectedDepartment);
        } else {
          this.selectedDepartment = null;
        }
      });

    const hrOrganizationCountSub: Subscription = this.hrOrganizationService.hrOrganizationCount
      .subscribe((count: number) => {
        this.pagination.totalItems = count;
      });

    const employeeListSub: Subscription = this.hrOrganizationService.employeeList.subscribe((list: EmployeeEntity[]) => {
      this.employeeList = list;
    });

    const employeeCountSub: Subscription = this.hrOrganizationService.employeeCount.subscribe((count: number) => {
      this.employeePagination.totalItems = count;
    });

    const employeeNotInDepartmentSub = this.hrOrganizationService.employeeNotInDepartmentList.subscribe((entities: Entities) => {
      this.employeeNotInDepartmentList = entities.exceptIds;
      this.selectedEmployeeToAddToDepartmentList = entities.ids;
    });

    this.subscription
      .add(hrOrganizationFormSub)
      .add(employeeNotInDepartmentSub)
      .add(legalEntitySub)
      .add(employeeCountSub)
      .add(employeeListSub)
      .add(hrOrganizationListSub)
      .add(hrOrganizationCountSub)
      .add(divisionSub);
  }

  get code(): FormControl {
    return this.hrOrganizationForm.get('code') as FormControl;
  }

  get name(): FormControl {
    return this.hrOrganizationForm.get('name') as FormControl;
  }

  get errors(): FormGroup {
    return this.hrOrganizationForm.get('errors') as FormGroup;
  }

  get disabled() {
    return !this.legalEntity || !this.division;
  }

  async onAddToDepartment() {
    const {
      ids,
    } = this.employeeNotInDepartmentSearchEntity;
    this.employeeNotInDepartmentSearchEntity = new EmployeeSearchEntity();
    this.hrOrganizationService.addEmployeeToDepartment(ids, this.selectedDepartment.id, this.employeeSearchEntity)
      .then(() => {
        this.selectedEmployeeToAddToDepartmentList = [];
      });
  }

  getEmployeeList() {
    this.hrOrganizationService.getEmployeeList(this.employeeSearchEntity);
  }

  onSearchEmployee() {
    this.searchEmployee();
  }

  searchEmployee() {
    this.employeeNotInDepartmentSearchEntity.hrOrganizationId = this.selectedDepartment.id;
    this.hrOrganizationService.searchEmployee(this.employeeNotInDepartmentSearchEntity);
  }

  onSelectDepartment(event) {
    if (event) {
      this.employeeSearchEntity.hrOrganizationId = event.id;
      this.getEmployeeList();
    } else {
      this.employeeList = [];
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.hrOrganizationService.getList(this.hrOrganizationSearchEntity);
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  getList() {
    if (this.legalEntity && this.division) {
      this.hrOrganizationService.getList(this.hrOrganizationSearchEntity);
    }
  }

  onPaginationChange(pagination) {
    this.hrOrganizationSearchEntity.skip = pagination.skip;
    this.hrOrganizationSearchEntity.take = pagination.take;
    this.getList();
  }

  add() {
    this.hrOrganizationService.add();
    this.toggleModal();
  }

  save() {
    if (this.hrOrganizationForm.invalid) {
      this.generalService.validateAllFormFields(this.hrOrganizationForm);
    }
    if (this.hrOrganizationForm.valid) {
      const hrOrganizationEntity: HrOrganizationEntity = new HrOrganizationEntity(this.hrOrganizationForm.value);
      (hrOrganizationEntity.id
        ? this.hrOrganizationService.update(hrOrganizationEntity, this.hrOrganizationSearchEntity)
        : this.hrOrganizationService.create(hrOrganizationEntity, this.hrOrganizationSearchEntity))
        .then(() => {
          this.toastrService.success(translate('general.service.save.success'));
          this.toggleModal();
        })
        .catch((error: Error) => {
          this.toastrService.error(error.message);
        });
    }
  }

  cancel() {
    this.hrOrganizationService.cancel();
    this.toggleModal();
  }

  /**
   * Edit selected entity
   *
   * @param id string
   */
  edit(id: string) {
    this.hrOrganizationService.edit(id)
      .then(() => {
        this.toggleModal();
      });
  }

  sort(event) {
    if (event.sortField && event.sortOrder) {
      this.hrOrganizationSearchEntity.orderBy = event.sortField;
      this.hrOrganizationSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  async removeEmployee(id: string) {
    await this.hrOrganizationService.removeEmployee(id, this.selectedDepartment.id, this.employeeSearchEntity);
  }

  toDepartmentEmployeeDetail(employeeId: string) {
    this.router.navigate(['/master-data/department/employee-detail'], {queryParams: {id: employeeId, route: 'hr-organization'}});
  }

  onSelectEmployeeToAdd(event) {
    this.employeeNotInDepartmentSearchEntity.ids = event;
  }

  searchEmployeeByTyping() {
    this.hrOrganizationService.searchEmployeeByTyping(this.employeeTyping);
  }

  onSearchEmployeeByTyping(event) {
    const employeeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
    employeeSearchEntity.ids = this.selectedEmployeeToAddToDepartmentList.map((employee: EmployeeEntity) => employee.id);
    employeeSearchEntity.name.startsWith = event;
    this.employeeTyping.next(employeeSearchEntity);
    this.searchEmployeeByTyping();
  }
}
