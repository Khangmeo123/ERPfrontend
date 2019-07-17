import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {


  pagination = new PaginationModel()
  constructor(protected router: Router) { }
  
  
  ngOnInit() {
  }

  

  showdetail() {
    this.router.navigate(['/master-data/legal-entity/customer-list-of-legal-entity/detail-customer-legal-entity']);
  }
}
