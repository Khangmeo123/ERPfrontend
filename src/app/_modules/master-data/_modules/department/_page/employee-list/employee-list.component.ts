import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { EmployeeSearchEntity } from '../../../../_backend/employee/employee.searchentity';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [],
})
export class EmployeeListComponent implements OnInit {
  pagination: PaginationModel = new PaginationModel();

  employeeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();

  constructor(protected router: Router) {
  }

  ngOnInit() {
  }

  onClickViewDetail() {
    this.router.navigate(['/master-data/department/employee/detail-employee']);
  }

  onPaginationChange(pagination) {
    this.pagination = pagination;
  }

  getList() {}
}
