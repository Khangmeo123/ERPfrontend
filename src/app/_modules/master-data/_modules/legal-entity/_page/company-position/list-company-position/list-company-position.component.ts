import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-company-position',
  templateUrl: './list-company-position.component.html',
  styleUrls: ['./list-company-position.component.scss']
})
export class ListCompanyPositionComponent implements OnInit {

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
    this.router.navigate(['/master-data/legal-entity/company-position/detail-company-position']);
  }
}
