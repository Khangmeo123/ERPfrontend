import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { EmployeeSearchEntity } from '../../../../_backend/employee/employee.searchentity';
import { EmployeeEntity } from '../../../../_backend/employee/employee.entity';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [],
  encapsulation: ViewEncapsulation.None,
})
export class EmployeeListComponent implements OnInit {
  @Input() list: EmployeeEntity[] = [];

  @Input() pagination: PaginationModel = new PaginationModel();

  selectedList: EmployeeEntity[] = [];

  @Output() getList: EventEmitter<EmployeeSearchEntity> = new EventEmitter<EmployeeSearchEntity>();

  @Output() addEmployee: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output() removeEmployee: EventEmitter<string> = new EventEmitter<string>();

  @Input() searchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();

  @Output() searchEmployee: EventEmitter<EmployeeSearchEntity> = new EventEmitter<EmployeeSearchEntity>();

  @Input() disabled: boolean = false;

  constructor(protected router: Router) {
  }

  ngOnInit() {
  }

  async onClickViewDetail() {
    await this.router.navigate(['/master-data/department/employee-detail']);
  }

  onPaginationChange(pagination) {
    this.pagination = pagination;
  }

  onSearchEmployee(event) {

  }

  onRemoveEmployee(event) {
    console.log(event);
  }
}
