import { Component, OnInit } from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-company-position',
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.scss']
})
export class EmployeePositionComponent implements OnInit {

  display : boolean = false;
  pagination = new PaginationModel()
  constructor(protected router: Router) { }

  tmpEmployee = [
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
  ]
  ngOnInit() {
  }



  showAddGroupEmployees() {
    this.display = !this.display;
  }

  onClickShowDetail () {
    this.router.navigate(['/master-data/legal-entity/employee-position/employee-detail']);
  }
}
