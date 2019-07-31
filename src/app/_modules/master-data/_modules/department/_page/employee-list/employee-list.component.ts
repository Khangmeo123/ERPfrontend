import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { EmployeeSearchEntity } from '../../../../_backend/employee/employee.searchentity';
import { EmployeeEntity } from '../../../../_backend/employee/employee.entity';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [],
})
export class EmployeeListComponent implements OnInit {
  @Input() list: EmployeeEntity[] = [];

  selectedList: EmployeeEntity[] = [];

  @Output() getList: EventEmitter<EmployeeSearchEntity> = new EventEmitter<EmployeeSearchEntity>();

  @Output() addEmployee: EventEmitter<string[]> = new EventEmitter<string[]>();

  @Output() removeEmployee: EventEmitter<string> = new EventEmitter<string>();

  pagination: PaginationModel = new PaginationModel();

  employeeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();

  constructor(protected router: Router) {
  }

  ngOnInit() {
  }

  async onClickViewDetail() {
    await this.router.navigate(['/master-data/department/employee/detail-employee']);
  }

  onPaginationChange(pagination) {
    this.pagination = pagination;
  }

  searchEmployee(event) {
    console.log(event);
  }
}
