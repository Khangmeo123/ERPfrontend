import { Component, OnInit } from '@angular/core';
import { DepartmentSearchEntity } from '../../../../_backend/department/department.search-entity';
import { DepartmentService } from '../department/department.service';
import { DepartmentEntity } from '../../../../_backend/department/department.entity';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/divisionl.entity';
import { GeneralService } from '../../../../../../_helpers/general-service.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: [
    './department-list.component.scss',
  ],
  providers: [
    GeneralService,
  ],
})
export class DepartmentListComponent implements OnInit {
  /**
   * Modal state
   */
  public modal: boolean = false;

  /**
   * Department list
   */
  public departmentList: DepartmentEntity[] = [];

  public departmentSearchEntity: DepartmentSearchEntity = new DepartmentSearchEntity();

  public departmentForm: FormGroup;

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

  constructor(private departmentService: DepartmentService, private generalService: GeneralService) {
    const departmentFormSub: Subscription = this.departmentService.departmentForm.subscribe((form: FormGroup) => {
      this.departmentForm = form;
    });

    const legalEntitySub: Subscription = this.departmentService.selectedLegalEntity.subscribe((legalEntity: LegalEntity) => {
      this.legalEntity = legalEntity;
    });

    const divisionSub: Subscription = this.departmentService.selectedDivision.subscribe((division: DivisionEntity) => {
      this.division = division;
    });

  }

  get code(): FormControl {
    return this.departmentForm.get('code') as FormControl;
  }

  get name(): FormControl {
    return this.departmentForm.get('name') as FormControl;
  }

  get errors(): FormGroup {
    return this.departmentForm.get('errors') as FormGroup;
  }

  ngOnInit() {
    this.departmentService.getList(this.departmentSearchEntity);
  }

  toggleModal() {
    this.modal = !this.modal;
  }

  getList() {

  }

  onPaginationChange(pagination) {
    this.pagination = new PaginationModel(pagination);
  }

  add() {
    this.departmentService.add();
    this.toggleModal();
  }

  save() {
    if (this.departmentForm.invalid) {
      this.generalService.validateAllFormFields(this.departmentForm);
    }
    if (this.departmentForm.valid) {
      console.log(this.departmentForm.value);
    }
  }

  /**
   * Edit selected entity
   *
   * @param id string
   */
  edit(id: string) {

  }

  deactivate(id: string) {

  }

  sort(event) {

  }
}
