import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/division.entity';
import { HrOrganizationEntity } from '../../../../_backend/hr-organization/hr-organization.entity';
import { HrOrganizationRepository } from './hr-organization.repository';
import { HrOrganizationForm } from '../../../../_backend/hr-organization/hr-organization.form';
import { HrOrganizationSearchEntity } from '../../../../_backend/hr-organization/hr-organization.search-entity';
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
export class HrOrganizationService {

  public hrOrganizationList: BehaviorSubject<HrOrganizationEntity[]> = new BehaviorSubject<HrOrganizationEntity[]>([]);

  public hrOrganizationCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public employeeList: BehaviorSubject<EmployeeEntity[]> = new BehaviorSubject<EmployeeEntity[]>([]);

  public employeeCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public hrOrganizationForm: BehaviorSubject<FormGroup>;

  public employeeNotInDepartmentList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private hrOrganizationRepository: HrOrganizationRepository,
    private toastrService: ToastrService,
    private departmentService: DepartmentService,
  ) {
    this.hrOrganizationForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new HrOrganizationForm(),
      ),
    );
  }

  getList(hrOrganizationSearchEntity: HrOrganizationSearchEntity): void {
    forkJoin(
      this.hrOrganizationRepository.getList(hrOrganizationSearchEntity),
      this.hrOrganizationRepository.count(hrOrganizationSearchEntity),
    )
      .subscribe(([list, count]) => {
        if (list) {
          this.hrOrganizationList.next(list);
        }
        if (count) {
          this.hrOrganizationCount.next(count);
        }
      });
  }

  /**
   * Cancel a hrOrganization form, create a new one
   *
   * @return void
   */
  cancel() {
    this.hrOrganizationForm.next(
      this.fb.group(
        this.newHrOrganizationForm(),
      ),
    );
  }

  /**
   * Click a new form for adding hrOrganization
   *
   * @return void
   */
  add() {
    this.hrOrganizationForm.next(
      this.fb.group(
        this.newHrOrganizationForm(),
      ),
    );
  }

  /**
   * Create new hrOrganization
   *
   * @param hrOrganizationEntity HrOrganizationEntity
   * @param hrOrganizationSearchEntity HrOrganizationSearchEntity
   * @return Observable<HrOrganizationEntity>
   */
  create(hrOrganizationEntity: HrOrganizationEntity, hrOrganizationSearchEntity: HrOrganizationSearchEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.hrOrganizationRepository.create(hrOrganizationEntity)
        .subscribe(
          () => {
            this.getList(hrOrganizationSearchEntity);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  /**
   * Update an existing hrOrganization
   *
   * @param hrOrganizationEntity HrOrganizationEntity
   * @param hrOrganizationSearchEntity HrOrganizationSearchEntity
   * @return Observable<HrOrganizationEntity>
   */
  update(hrOrganizationEntity: HrOrganizationEntity, hrOrganizationSearchEntity: HrOrganizationSearchEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.hrOrganizationRepository.update(hrOrganizationEntity)
        .subscribe(
          () => {
            this.getList(hrOrganizationSearchEntity);
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
    return this.hrOrganizationRepository.getById(id)
      .then(
        (hrOrganizationEntity: HrOrganizationEntity) => {
          this.hrOrganizationForm.next(
            this.fb.group(
              new HrOrganizationForm(hrOrganizationEntity),
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
   * @param hrOrganizationId string
   * @param employeeSearchEntity EmployeeSearchEntity
   * @return Promise<void>
   */
  removeEmployee(employeeId: string, hrOrganizationId: string, employeeSearchEntity: EmployeeSearchEntity): Promise<void> {
    return this.hrOrganizationRepository.removeEmployeeFromOrganization(employeeId, hrOrganizationId)
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
   * Create new hrOrganization form
   *
   * @return HrOrganizationForm
   */
  newHrOrganizationForm(): HrOrganizationForm {
    const hrOrganizationForm: HrOrganizationForm = new HrOrganizationForm();
    const legalEntity: LegalEntity = this.departmentService.selectedLegalEntity.value;
    const division: DivisionEntity = this.departmentService.selectedDivision.value;
    if (legalEntity) {
      hrOrganizationForm.legalEntityId.setValue(legalEntity.id);
    }
    if (division) {
      hrOrganizationForm.divisionId.setValue(division.id);
    }
    return hrOrganizationForm;
  }

  getEmployeeList(employeeSearchEntity: EmployeeSearchEntity): void {
    forkJoin(
      this.hrOrganizationRepository.getEmployeeList(employeeSearchEntity),
      this.hrOrganizationRepository.countEmployee(employeeSearchEntity),
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
    this.hrOrganizationRepository.searchEmployee(employeeSearchEntity)
      .subscribe((entities: Entities) => {
        this.employeeNotInDepartmentList.next(entities);
      });
  }

  /**
   *
   * @param employeeIds list of employee to add to organization
   * @param hrOrganizationId organizationId to add the list of employees to
   * @param employeeSearchEntity searchEntity to get the list after adding
   *
   * @return Promise<void>
   */
  addEmployeeToDepartment(employeeIds: string[], hrOrganizationId: string, employeeSearchEntity: EmployeeSearchEntity): Promise<void> {
    return this.hrOrganizationRepository.addEmployeeToDepartment(employeeIds, hrOrganizationId, employeeSearchEntity)
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
        return this.hrOrganizationRepository.searchEmployee(searchEntity);
      }),
    )
      .subscribe(
        (list: Entities) => {
          this.employeeNotInDepartmentList.next(list);
        },
      );
  }
}
