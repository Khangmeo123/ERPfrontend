import { Component, OnDestroy, OnInit } from '@angular/core';
import { DepartmentEntity } from '../../../../_backend/department/department.entity';
import { DepartmentSearchEntity } from '../../../../_backend/department/department.search-entity';
import { FormControl, FormGroup } from '@angular/forms';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/divisionl.entity';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../department/department.service';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../../_helpers/string';

@Component({
  selector: 'app-employee',
  templateUrl: './hr-organization.component.html',
  styleUrls: ['./hr-organization.component.scss'],
  providers: [
    ToastrService,
  ],
})
export class HrOrganizationComponent implements OnInit, OnDestroy {
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

  constructor(private departmentService: DepartmentService, private toastrService: ToastrService) {
    const departmentFormSub: Subscription = this.departmentService.departmentForm.subscribe((form: FormGroup) => {
      this.departmentForm = form;
    });

    const legalEntitySub: Subscription = this.departmentService.selectedLegalEntity.subscribe((legalEntity: LegalEntity) => {
      this.legalEntity = legalEntity;
    });

    const divisionSub: Subscription = this.departmentService.selectedDivision.subscribe((division: DivisionEntity) => {
      this.division = division;
    });

    this.subscription
      .add(departmentFormSub)
      .add(legalEntitySub)
      .add(divisionSub);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
      this.departmentService.validateAllFormFields(this.departmentForm);
    }
    if (this.departmentForm.valid) {
      const departmentEntity: DepartmentEntity = new DepartmentEntity(this.departmentForm.value);
      (departmentEntity.id
        ? this.departmentService.update(departmentEntity, this.departmentSearchEntity)
        : this.departmentService.create(departmentEntity, this.departmentSearchEntity))
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

  }

  deactivate(id: string) {

  }

  sort(event) {

  }
}
