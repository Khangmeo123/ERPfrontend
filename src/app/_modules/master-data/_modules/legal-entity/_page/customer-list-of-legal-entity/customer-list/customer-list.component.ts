import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {


  pagination = new PaginationModel();
  display: boolean = false;
  isAddGroup = false;

  isAddCustomer = false;

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

  constructor(protected router: Router) { }


  ngOnInit() {
  }


  onClickShowDetail() {
    this.router.navigate(['/master-data/legal-entity/customer-list-of-legal-entity/detail-customer-legal-entity']);
  }

  showDialog() {
    this.display = true;
  }
}
