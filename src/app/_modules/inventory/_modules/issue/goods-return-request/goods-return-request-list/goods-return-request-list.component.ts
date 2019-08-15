import { Component, OnInit } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-order-list',
  templateUrl: './goods-return-request-list.component.html',
  styleUrls: ['./goods-return-request-list.component.scss'],
})
export class GoodsReturnRequestListComponent implements OnInit {
  pageTitle = translate('goodsReturnRequest.header.title');
  isBookMark: boolean = false;
  goodsReturnRequestList = [
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

  editGoodsReturnRequest() {
    this.router.navigate(['inventory/issue/goods-return-request/goods-return-request-detail']);
  }

  addGoodsReturnRequest() {
    this.router.navigate(['inventory/issue/goods-return/goods-return-request-detail']);
  }

  bookMark() {

  }

}
