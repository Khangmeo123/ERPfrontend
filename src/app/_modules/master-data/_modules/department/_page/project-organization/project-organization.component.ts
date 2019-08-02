import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/division.entity';
import { Subject, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../../_helpers/string';
import { ProjectOrganizationEntity } from '../../../../_backend/project-organization/project-organization.entity';
import { ProjectOrganizationSearchEntity } from '../../../../_backend/project-organization/project-organization.search-entity';
import { ProjectOrganizationService } from './project-organization.service';
import { DepartmentService } from '../department/department.service';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { EmployeeEntity } from '../../../../_backend/employee/employee.entity';
import { EmployeeSearchEntity } from '../../../../_backend/employee/employee.searchentity';
import { Router } from '@angular/router';
import { Entities } from '../../../../../../_helpers/entity';

@Component({
  selector: 'app-employee',
  templateUrl: './project-organization.component.html',
  styleUrls: ['./project-organization.component.scss'],
  providers: [
    ToastrService,
    ProjectOrganizationService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ProjectOrganizationComponent implements OnInit, OnDestroy {
  /**
   * Department modal state
   */
  public modal: boolean = false;

  /**
   * ProjectOrganization list
   */
  public projectOrganizationList: ProjectOrganizationEntity[] = [];
  public selectedDepartment: ProjectOrganizationEntity = null;
  public projectOrganizationSearchEntity: ProjectOrganizationSearchEntity = new ProjectOrganizationSearchEntity();
  public projectOrganizationForm: FormGroup;

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
   * Manager list
   */
  public managerList: EmployeeEntity[] = [];
  public selectedManagerList: EmployeeEntity[] = [];
  public managerSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
  public managerTyping: Subject<EmployeeSearchEntity> = new Subject<EmployeeSearchEntity>();

  /**
   * Data subscriptions
   */
  public subscription: Subscription = new Subscription();

  constructor(
    private departmentService: DepartmentService,
    private projectOrganizationService: ProjectOrganizationService,
    private toastrService: ToastrService,
    private generalService: GeneralService,
    private router: Router,
  ) {
    const projectOrganizationFormSub: Subscription = this.projectOrganizationService.projectOrganizationForm.subscribe(
      (form: FormGroup) => {
        this.projectOrganizationForm = form;
      },
    );

    const legalEntitySub: Subscription = this.departmentService.selectedLegalEntity.subscribe((legalEntity: LegalEntity) => {
      if (legalEntity) {
        this.legalEntity = legalEntity;
        this.projectOrganizationSearchEntity.legalEntityId = legalEntity.id;
        this.getList();
      }
    });

    const managerSub: Subscription = this.projectOrganizationService.managerList.subscribe((entities: Entities) => {
      this.managerList = entities.exceptIds;
      this.selectedManagerList = entities.ids;
    });

    const divisionSub: Subscription = this.departmentService.selectedDivision.subscribe((division: DivisionEntity) => {
      if (division) {
        this.division = division;
        this.projectOrganizationSearchEntity.divisionId = division.id;
        this.getList();
      }
    });

    const projectOrganizationListSub: Subscription = this.projectOrganizationService.projectOrganizationList
      .subscribe((projectOrganizationList: ProjectOrganizationEntity[]) => {
        this.projectOrganizationList = projectOrganizationList;
        if (projectOrganizationList.length) {
          this.selectedDepartment = projectOrganizationList[0];
          this.onSelectDepartment(this.selectedDepartment);
        } else {
          this.selectedDepartment = null;
        }
      });

    const projectOrganizationCountSub: Subscription = this.projectOrganizationService.projectOrganizationCount
      .subscribe((count: number) => {
        this.pagination.totalItems = count;
      });

    const employeeListSub: Subscription = this.projectOrganizationService.employeeList.subscribe((list: EmployeeEntity[]) => {
      this.employeeList = list;
    });

    const employeeCountSub: Subscription = this.projectOrganizationService.employeeCount.subscribe((count: number) => {
      this.employeePagination.totalItems = count;
    });

    const employeeNotInDepartmentSub = this.projectOrganizationService.employeeNotInDepartmentList.subscribe((entities: Entities) => {
      this.employeeNotInDepartmentList = entities.exceptIds;
      this.selectedEmployeeToAddToDepartmentList = entities.ids;
    });

    this.subscription
      .add(projectOrganizationFormSub)
      .add(employeeNotInDepartmentSub)
      .add(managerSub)
      .add(legalEntitySub)
      .add(employeeCountSub)
      .add(employeeListSub)
      .add(projectOrganizationListSub)
      .add(projectOrganizationCountSub)
      .add(divisionSub);
  }

  get code(): FormControl {
    return this.projectOrganizationForm.get('code') as FormControl;
  }

  get name(): FormControl {
    return this.projectOrganizationForm.get('name') as FormControl;
  }

  get managerId() {
    return this.projectOrganizationForm.get('managerId') as FormControl;
  }

  get startDate() {
    return this.projectOrganizationForm.get('startDate') as FormControl;
  }

  get endDate() {
    return this.projectOrganizationForm.get('endDate') as FormControl;
  }

  get errors(): FormGroup {
    return this.projectOrganizationForm.get('errors') as FormGroup;
  }

  get disabled() {
    return !this.legalEntity || !this.division;
  }

  cancel() {
    this.projectOrganizationService.cancel();
    this.toggleModal();
  }

  async onAddToDepartment() {
    const {
      ids,
    } = this.employeeNotInDepartmentSearchEntity;
    this.employeeNotInDepartmentSearchEntity = new EmployeeSearchEntity();
    this.projectOrganizationService.addEmployeeToDepartment(ids, this.selectedDepartment.id, this.employeeSearchEntity)
      .then(() => {
        this.selectedEmployeeToAddToDepartmentList = [];
      });
  }

  getEmployeeList() {
    this.projectOrganizationService.getEmployeeList(this.employeeSearchEntity);
  }

  onSearchEmployee() {
    this.searchEmployee();
  }

  searchEmployee() {
    this.employeeNotInDepartmentSearchEntity.projectOrganizationId = this.selectedDepartment.id;
    this.projectOrganizationService.searchEmployee(this.employeeNotInDepartmentSearchEntity);
  }

  searchManager() {
    this.projectOrganizationService.searchManager(this.managerSearchEntity);
  }

  onSelectDepartment(event) {
    if (event) {
      this.employeeSearchEntity.projectOrganizationId = event.id;
      this.getEmployeeList();
    } else {
      this.employeeList = [];
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.projectOrganizationService.getList(this.projectOrganizationSearchEntity);
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  getList() {
    if (this.legalEntity && this.division) {
      this.projectOrganizationService.getList(this.projectOrganizationSearchEntity);
    }
  }

  onPaginationChange(pagination) {
    this.projectOrganizationSearchEntity.skip = pagination.skip;
    this.projectOrganizationSearchEntity.take = pagination.take;
    this.getList();
  }

  add() {
    this.projectOrganizationService.add();
    this.toggleModal();
  }

  save() {
    if (this.projectOrganizationForm.invalid) {
      this.generalService.validateAllFormFields(this.projectOrganizationForm);
    }
    if (this.projectOrganizationForm.valid) {
      const projectOrganizationEntity: ProjectOrganizationEntity = new ProjectOrganizationEntity(this.projectOrganizationForm.value);
      (projectOrganizationEntity.id
        ? this.projectOrganizationService.update(projectOrganizationEntity, this.projectOrganizationSearchEntity)
        : this.projectOrganizationService.create(projectOrganizationEntity, this.projectOrganizationSearchEntity))
        .then(() => {
          this.toastrService.success(translate('general.service.save.success'));
          this.toggleModal();
        })
        .catch((error: Error) => {
          this.toastrService.error(error.message);
        });
    }
  }

  /**
   * Edit selected entity
   *
   * @param id string
   */
  edit(id: string) {
    this.projectOrganizationService.edit(id)
      .then(() => {
        this.toggleModal();
      });
  }

  sort(event) {
    if (event.sortField && event.sortOrder) {
      this.projectOrganizationSearchEntity.orderBy = event.sortField;
      this.projectOrganizationSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  async removeEmployee(id: string) {
    await this.projectOrganizationService.removeEmployee(id, this.selectedDepartment.id, this.employeeSearchEntity);
  }

  /**
   * View details of employee
   *
   * @param employee EmployeeEntity
   */
  async onViewDetail(employee: EmployeeEntity) {
    this.departmentService.selectEmployee(employee);
    await this.router.navigate([
      '/master-data/department/employee-detail',
    ]);
  }

  onSelectEmployeeToAdd(event) {
    this.employeeNotInDepartmentSearchEntity.ids = event;
  }

  searchEmployeeByTyping() {
    this.projectOrganizationService.searchEmployeeByTyping(this.employeeTyping);
  }

  searchManagerByTyping() {
    this.projectOrganizationService.searchManagerByTyping(this.managerTyping);
  }

  onSearchEmployeeByTyping(event) {
    const employeeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
    employeeSearchEntity.ids = this.selectedEmployeeToAddToDepartmentList.map((employee: EmployeeEntity) => employee.id);
    employeeSearchEntity.name.startsWith = event;
    this.employeeTyping.next(employeeSearchEntity);
    this.searchEmployeeByTyping();
  }

  onSearchManagerByTyping(event) {
    const searchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
    searchEntity.ids = this.selectedManagerList.map((employee: EmployeeEntity) => employee.id);
    searchEntity.name.startsWith = event;
    this.managerTyping.next(searchEntity);
    this.searchEmployeeByTyping();
  }

  onSearchManager() {
    this.searchManager();
  }

  onSelectManager(event) {
    if (event && event.length) {
      this.managerId.setValue(event[0]);
    } else {
      this.managerId.setValue(null);
    }
  }
}
