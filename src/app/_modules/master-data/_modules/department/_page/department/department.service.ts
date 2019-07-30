import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
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

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  public departmentList: BehaviorSubject<DepartmentEntity[]> = new BehaviorSubject<DepartmentEntity[]>([]);

  public departmentCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public departmentForm: BehaviorSubject<FormGroup>;

  public legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public selectedLegalEntity: BehaviorSubject<LegalEntity> = new BehaviorSubject<LegalEntity>(null);

  public divisionList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public selectedDivision: BehaviorSubject<DivisionEntity> = new BehaviorSubject<DivisionEntity>(null);

  constructor(private fb: FormBuilder, private departmentRepository: DepartmentRepository, private toastrService: ToastrService) {
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

  selectDivision(division: DivisionEntity) {
    this.selectedDivision.next(division);
  }

  selectLegalEntity(legalEntity: LegalEntity) {
    this.selectedLegalEntity.next(legalEntity);
  }

  add() {
    this.departmentForm.next(
      this.fb.group(
        this.newDepartmentForm(),
      ),
    );
  }

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
