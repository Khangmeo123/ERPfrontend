import { Component, OnInit } from '@angular/core';
import { DepartmentSearchEntity } from '../../../../_backend/department/department.search-entity';
import { DepartmentService } from '../department/department.service';
import { DepartmentEntity } from '../../../../_backend/department/department.entity';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';
import { DivisionEntity } from '../../../../_backend/division/divisionl.entity';
import { DivisionSearchEntity } from '../../../../_backend/division/division.searchentity';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: [
    './department-list.component.scss',
  ],
  providers: [
    DepartmentService,
  ],
})
export class DepartmentListComponent implements OnInit {
  /**
   * Modal state
   */
  public modal: boolean = false;

  /**
   * Selected legal entity ID
   */
  public legalEntityId: string = null;

  /**
   * Selected division ID
   */
  public divisionId: string = null;

  /**
   * Department list
   */

  public departmentList: DepartmentEntity[] = [];

  public departmentSearchEntity: DepartmentSearchEntity = new DepartmentSearchEntity();

  public departmentForm: FormGroup;

  public pagination: PaginationModel = new PaginationModel();

  /**
   * Legal Entity
   */
  public legalEntityList: LegalEntity[] = [];

  public selectedLegalEntity: LegalEntity[] = [];

  public legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  /**
   * Division
   */
  public divisionList: DivisionEntity[] = [];

  public selectedDivisionList: DivisionEntity[] = [];

  public divisionSearchEntity: DivisionSearchEntity = new DivisionSearchEntity();

  /**
   * Data subscriptions
   */
  public subscription: Subscription = new Subscription();

  constructor(private departmentService: DepartmentService) {
    const departmentFormSub: Subscription = this.departmentService.departmentForm.subscribe((form: FormGroup) => {
      this.departmentForm = form;
    });

    this.subscription.add(departmentFormSub);
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
    this.pagination = pagination;
  }

  save() {

  }

  edit(id: string) {

  }

  deactivate(id: string) {

  }

  getLegalEntityList() {
    this.departmentService.getLegalEntityList(this.legalSearchEntity);
  }

  onSelectLegalEntity() {

  }

  getDivisionList() {
    this.departmentService.getDivisionList(this.divisionSearchEntity);
  }

  onSelectDivision() {

  }
}
