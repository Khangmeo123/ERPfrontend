import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/division.entity';
import { ProjectOrganizationEntity } from '../../../../_backend/project-organization/project-organization.entity';
import { ProjectOrganizationRepository } from './project-organization.repository';
import { ProjectOrganizationForm } from '../../../../_backend/project-organization/project-organization.form';
import { ProjectOrganizationSearchEntity } from '../../../../_backend/project-organization/project-organization.search-entity';
import { DepartmentService } from '../department/department.service';
import { translate } from '../../../../../../_helpers/string';
import { EmployeeSearchEntity } from '../../../../_backend/employee/employee.searchentity';
import { EmployeeEntity } from '../../../../_backend/employee/employee.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProjectOrganizationService {

  public projectOrganizationList: BehaviorSubject<ProjectOrganizationEntity[]> = new BehaviorSubject<ProjectOrganizationEntity[]>([]);

  public projectOrganizationCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public employeeList: BehaviorSubject<EmployeeEntity[]> = new BehaviorSubject<EmployeeEntity[]>([]);

  public employeeCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public projectOrganizationForm: BehaviorSubject<FormGroup>;

  public employeeNotInDepartmentList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public managerList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private projectOrganizationRepository: ProjectOrganizationRepository,
    private toastrService: ToastrService,
    private departmentService: DepartmentService,
  ) {
    this.projectOrganizationForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new ProjectOrganizationForm(),
      ),
    );
  }

  getList(projectOrganizationSearchEntity: ProjectOrganizationSearchEntity): void {
    forkJoin(
      this.projectOrganizationRepository.getList(projectOrganizationSearchEntity),
      this.projectOrganizationRepository.count(projectOrganizationSearchEntity),
    )
      .subscribe(([list, count]) => {
        if (list) {
          this.projectOrganizationList.next(list);
        }
        if (count) {
          this.projectOrganizationCount.next(count);
        }
      });
  }

  /**
   * Cancel a projectOrganization form, create a new one
   *
   * @return void
   */
  cancel() {
    this.projectOrganizationForm.next(
      this.fb.group(
        this.newProjectOrganizationForm(),
      ),
    );
  }

  /**
   * Click a new form for adding projectOrganization
   *
   * @return void
   */
  add() {
    this.projectOrganizationForm.next(
      this.fb.group(
        this.newProjectOrganizationForm(),
      ),
    );
  }

  /**
   * Create new projectOrganization
   *
   * @param projectOrganizationEntity ProjectOrganizationEntity
   * @param projectOrganizationSearchEntity ProjectOrganizationSearchEntity
   * @return Observable<ProjectOrganizationEntity>
   */
  create(
    projectOrganizationEntity: ProjectOrganizationEntity,
    projectOrganizationSearchEntity: ProjectOrganizationSearchEntity,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.projectOrganizationRepository.create(projectOrganizationEntity)
        .subscribe(
          () => {
            this.getList(projectOrganizationSearchEntity);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  /**
   * Update an existing projectOrganization
   *
   * @param projectOrganizationEntity ProjectOrganizationEntity
   * @param projectOrganizationSearchEntity ProjectOrganizationSearchEntity
   * @return Observable<ProjectOrganizationEntity>
   */
  update(
    projectOrganizationEntity: ProjectOrganizationEntity,
    projectOrganizationSearchEntity: ProjectOrganizationSearchEntity,
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.projectOrganizationRepository.update(projectOrganizationEntity)
        .subscribe(
          () => {
            this.getList(projectOrganizationSearchEntity);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  /**
   * Get entity by id for updating
   *
   * @param id string
   * @return Promise<void>
   */
  edit(id: string): Promise<void> {
    return this.projectOrganizationRepository.getById(id)
      .then(
        (projectOrganizationEntity: ProjectOrganizationEntity) => {
          this.projectOrganizationForm.next(
            this.fb.group(
              new ProjectOrganizationForm(projectOrganizationEntity),
            ),
          );
        },
      )
      .catch(() => {
        this.toastrService.error(translate('general.service.update.getFailed'));
      });
  }

  /**
   * Remove employee from department
   *
   * @param employeeId string
   * @param projectOrganizationId string
   * @param employeeSearchEntity EmployeeSearchEntity
   * @return Promise<void>
   */
  removeEmployee(employeeId: string, projectOrganizationId: string, employeeSearchEntity: EmployeeSearchEntity): Promise<void> {
    return this.projectOrganizationRepository.removeEmployeeFromOrganization(employeeId, projectOrganizationId)
      .then(
        (employeeEntity: EmployeeEntity) => {
          this.toastrService.success(translate('general.service.update.success'));
          this.getEmployeeList(employeeSearchEntity);
        },
      )
      .catch(() => {
        this.toastrService.error(translate('general.service.update.getFailed'));
      });
  }

  /**
   * Create new projectOrganization form
   *
   * @return ProjectOrganizationForm
   */
  newProjectOrganizationForm(): ProjectOrganizationForm {
    const projectOrganizationForm: ProjectOrganizationForm = new ProjectOrganizationForm();
    const legalEntity: LegalEntity = this.departmentService.selectedLegalEntity.value;
    const division: DivisionEntity = this.departmentService.selectedDivision.value;
    if (legalEntity) {
      projectOrganizationForm.legalEntityId.setValue(legalEntity.id);
    }
    if (division) {
      projectOrganizationForm.divisionId.setValue(division.id);
    }
    return projectOrganizationForm;
  }

  getEmployeeList(employeeSearchEntity: EmployeeSearchEntity): void {
    forkJoin(
      this.projectOrganizationRepository.getEmployeeList(employeeSearchEntity),
      this.projectOrganizationRepository.countEmployee(employeeSearchEntity),
    )
      .subscribe(([list, count]) => {
        if (list) {
          this.employeeList.next(list);
        }
        if (count) {
          this.employeeCount.next(count);
        }
      });
  }

  searchEmployee(employeeSearchEntity: EmployeeSearchEntity): void {
    this.projectOrganizationRepository.searchEmployee(employeeSearchEntity)
      .subscribe((entities: Entities) => {
        this.employeeNotInDepartmentList.next(entities);
      });
  }

  /**
   * @param employeeIds list of employee to add to organization
   * @param projectOrganizationId organizationId to add the list of employees to
   * @param employeeSearchEntity searchEntity to get the list after adding
   *
   * @return Promise<void>
   */
  addEmployeeToDepartment(employeeIds: string[], projectOrganizationId: string, employeeSearchEntity: EmployeeSearchEntity): Promise<void> {
    return this.projectOrganizationRepository.addEmployeeToDepartment(employeeIds, projectOrganizationId, employeeSearchEntity)
      .then(() => {
        this.toastrService.success(translate('department.addToDepartment.success'));
        this.getEmployeeList(employeeSearchEntity);
      })
      .catch((error: Error) => {
        this.toastrService.error(translate('department.addToDepartment.error'));
        /* tslint:disable-next-line */
        console.log(error);
      });
  }

  searchEmployeeByTyping(employeeSearchEntity: Observable<EmployeeSearchEntity>): void {
    employeeSearchEntity.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchEntity: EmployeeSearchEntity) => {
        return this.projectOrganizationRepository.searchEmployee(searchEntity);
      }),
    )
      .subscribe(
        (list: Entities) => {
          this.employeeNotInDepartmentList.next(list);
        },
      );
  }

  searchManagerByTyping(managerSearchEntity: Observable<EmployeeSearchEntity>): void {
    managerSearchEntity.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((searchEntity: EmployeeSearchEntity) => {
        return this.projectOrganizationRepository.searchEmployee(searchEntity);
      }),
    )
      .subscribe(
        (list: Entities) => {
          this.managerList.next(list);
        },
      );
  }

  searchManager(managerSearchEntity: EmployeeSearchEntity): void {
    this.projectOrganizationRepository.searchEmployee(managerSearchEntity)
      .subscribe((entities: Entities) => {
        this.managerList.next(entities);
      });
  }
}
