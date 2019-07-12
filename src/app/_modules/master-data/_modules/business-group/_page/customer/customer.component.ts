import { Component, Input, OnInit } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  @Input() customers = [];

  display = false;

  pagination = new PaginationModel();

  constructor() {
  }

  ngOnInit() {
  }

  paginationOutput(event) {

  }

  toggleAddModal() {
    this.display = !this.display;
  }
}
