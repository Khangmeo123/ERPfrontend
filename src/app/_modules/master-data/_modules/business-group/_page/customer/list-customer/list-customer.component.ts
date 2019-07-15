import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.scss']
})
export class ListCustomerComponent implements OnInit {


  pagination = new PaginationModel()
  constructor(protected router: Router) { }

  ngOnInit() {
  }

  viewDetail() {
    this.router.navigate(['/master-data/business-group/customer/detail-customer']);
  }

}
