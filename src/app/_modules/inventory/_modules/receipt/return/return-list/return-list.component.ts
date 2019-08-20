import { Component, OnInit } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.scss']
})
export class ReturnListComponent implements OnInit {
  pageTitle = translate('return.list.header.title');
  returnList = [
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1
    },
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1
    },
    {
      name: 'Nguyen Van A',
      createDate: '20/11/2019',
      status: 1
    }
  ];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  openDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  openToDatePicker(matDatePicker) {
    matDatePicker.open();
  }

  sort() {

  }

  editReturn() {
    this.router.navigate(['inventory/receipt/return/return-detail']);
  }

  addReturn() {
    this.router.navigate(['inventory/receipt/return/return-detail']);
  }

}
