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

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  public departmentList: BehaviorSubject<DepartmentEntity[]> = new BehaviorSubject<DepartmentEntity[]>([]);

  public departmentCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public departmentForm: BehaviorSubject<FormGroup>;

  public legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public divisionList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

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

      });
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): void {
    this.departmentRepository.getLegalEntityList(legalSearchEntity);
  }

  getDivisionList(divisionSearchEntity: DivisionSearchEntity): void {
    this.departmentRepository.getDivisionList(divisionSearchEntity);
  }
}
