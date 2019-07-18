import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { Router } from '@angular/router';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
@Component({
  selector: 'app-lisr-supplier-of-legal-entity',
  templateUrl: './list-supplier-of-legal-entity.component.html',
  styleUrls: ['./list-supplier-of-legal-entity.component.scss']
})
export class ListSupplierOfLegalEntityComponent implements OnInit {

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
