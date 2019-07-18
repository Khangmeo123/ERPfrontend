import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-employee-of-legal-entity',
  templateUrl: './list-employee-of-legal-entity.component.html',
  styleUrls: ['./list-employee-of-legal-entity.component.scss']
})
export class ListEmployeeOfLegalEntityComponent implements OnInit {

  pagination = new PaginationModel()
  constructor(protected router: Router) { }
  
  tmptable = [
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      customerGroup: 'huongnguyenhd96@gmail.com',
      taxCode: 'hihi',
      address: 1,
      phone: '1000000',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      customerGroup: 'huongnguyenhd96@gmail.com',
      taxCode: 'hihi',
      address: 1,
      phone: '1000000',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      customerGroup: 'huongnguyenhd96@gmail.com',
      taxCode: 'hihi',
      address: 1,
      phone: '1000000',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      customerGroup: 'huongnguyenhd96@gmail.com',
      taxCode: 'hihi',
      address: 1,
      phone: '1000000',
    },

  ]

  ngOnInit() {
  }

  

  onClickShowDetail() {
    this.router.navigate(['/master-data/legal-entity/employee-of-legal-entity/detail-employee-legal-entity']);
  }
}