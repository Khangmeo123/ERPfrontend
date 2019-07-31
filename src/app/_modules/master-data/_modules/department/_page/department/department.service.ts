import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentEntity } from '../../../../_backend/department/department.entity';
import { DepartmentRepository } from './department.repository';
import { DepartmentForm } from '../../../../_backend/department/department.form';
import { DepartmentSearchEntity } from '../../../../_backend/department/department.search-entity';
import { Entities } from '../../../../../../_helpers/entity';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';
import { DivisionSearchEntity } from '../../../../_backend/division/division.searchentity';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/divisionl.entity';
import { GeneralService } from '../../../../../../_helpers/general-service.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends GeneralService {

  public departmentList: BehaviorSubject<DepartmentEntity[]> = new BehaviorSubject<DepartmentEntity[]>([]);

  public departmentCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public departmentForm: BehaviorSubject<FormGroup>;

  public legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  /**
   * Current legal entity
   */
  public selectedLegalEntity: BehaviorSubject<LegalEntity> = new BehaviorSubject<LegalEntity>(null);

  public divisionList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  /**
   * Current division
   */
  public selectedDivision: BehaviorSubject<DivisionEntity> = new BehaviorSubject<DivisionEntity>(null);

  constructor(private fb: FormBuilder, private departmentRepository: DepartmentRepository, private toastrService: ToastrService) {
    super();
    this.departmentForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new DepartmentForm(),
      ),
    );
  }

  getList(departmentSearchEntity: DepartmentSearchEntity): void {
    forkJoin(
      this.departmentRepository.getList(departmentSearchEntity),
      this.departmentRepository.count(departmentSearchEntity),
    )
      .subscribe(([list, count]) => {
        if (list) {
          this.departmentList.next(list);
        }
        if (count) {
          this.departmentCount.next(count);
        }
      });
  }

  /**
   * Handle error for data retrieving
   *
   * @param error Error
   * @return void
   */
  handleError(error: Error) {
    this.toastrService.error(error.message);
    return error;
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): void {
    this.departmentRepository.getLegalEntityList(legalSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.legalEntityList.next(list);
        }
      });
  }

  getDivisionList(divisionSearchEntity: DivisionSearchEntity): void {
    this.departmentRepository.getDivisionList(divisionSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.divisionList.next(list);
        }
      });
  }

  /**
   * Select division for all tabs
   *
   * @param division DivisionEntity
   * @return void
   */
  selectDivision(division: DivisionEntity) {
    this.selectedDivision.next(division);
  }

  /**
   * Select legal entity for all tabs
   *
   * @param legalEntity LegalEntity
   * @return void
   */
  selectLegalEntity(legalEntity: LegalEntity) {
    this.selectedLegalEntity.next(legalEntity);
  }

  /**
   * Cancel a department form, create a new one
   *
   * @return void
   */
  cancel() {
    this.departmentForm.next(
      this.fb.group(
        this.newDepartmentForm(),
      ),
    );
  }

  /**
   * Click a new form for adding department
   *
   * @return void
   */
  add() {
    this.departmentForm.next(
      this.fb.group(
        this.newDepartmentForm(),
      ),
    );
  }

  /**
   * Create new department
   *
   * @param departmentEntity HrOrganizationEntity
   * @param departmentSearchEntity HrOrganizationSearchEntity
   * @return Observable<DepartmentEntity>
   */
  create(departmentEntity: DepartmentEntity, departmentSearchEntity: DepartmentSearchEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.departmentRepository.create(departmentEntity)
        .subscribe(
          () => {
            this.getList(departmentSearchEntity);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  /**
   * Update an existing department
   *
   * @param departmentEntity HrOrganizationEntity
   * @param departmentSearchEntity HrOrganizationSearchEntity
   * @return Observable<DepartmentEntity>
   */
  update(departmentEntity: DepartmentEntity, departmentSearchEntity: DepartmentSearchEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.departmentRepository.update(departmentEntity)
        .subscribe(
          () => {
            this.getList(departmentSearchEntity);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  /**
   * Create new department form
   *
   * @return DepartmentForm
   */
  newDepartmentForm(): DepartmentForm {
    const departmentForm: DepartmentForm = new DepartmentForm();
    const legalEntity: LegalEntity = this.selectedLegalEntity.value;
    const division: DivisionEntity = this.selectedDivision.value;
    if (legalEntity) {
      departmentForm.legalEntityId.setValue(legalEntity.id);
    }
    if (division) {
      departmentForm.divisionId.setValue(division.id);
    }
    return departmentForm;
  }
}
