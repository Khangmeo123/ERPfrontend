import { Component, OnInit } from '@angular/core';
import {translate} from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './goods-receipt-po-list.component.html',
  styleUrls: ['./goods-receipt-po-list.component.scss']
})
export class GoodsReceiptPoListComponent implements OnInit {
  pageTitle = translate('goodsReceiptPO.header.title')
  goodsReceiptPOList = [
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
  ]
  constructor(private router: Router) { }

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

  editGoodsReceiptPO() {
    this.router.navigate(['inventory/receipt/goods-receipt-po/goods-receipt-po-detail'])
  }

  addGoodsReceipt() {
    this.router.navigate(['inventory/receipt/goods-receipt-po/goods-receipt-po-detail'])
  }

}
