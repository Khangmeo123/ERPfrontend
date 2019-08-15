import { Component, OnInit } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-request-list.component.html',
  styleUrls: ['./return-request-list.component.scss']
})
export class ReturnRequestListComponent implements OnInit {
  pageTitle = translate('returnRequest.header.title')
  tmp = [
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1,
    },
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1,
    },
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1,
    },
  ];
  constructor(private router: Router) { }

  ngOnInit() {
  }

  openDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  openToDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  sort(event) {

  }

  editReturnRequest() {
    this.router.navigate(['inventory/receipt/return-request/return-request-detail']);
  }

  addReturnRequest() {
    this.router.navigate(['inventory/receipt/return-request/return-request-detail']);
  }

}
