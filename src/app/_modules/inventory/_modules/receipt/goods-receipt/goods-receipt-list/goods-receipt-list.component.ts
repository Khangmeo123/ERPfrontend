import { Component, OnInit } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './goods-receipt-list.component.html',
  styleUrls: ['./goods-receipt-list.component.scss']
})
export class GoodsReceiptListComponent implements OnInit {
  pageTitle = translate('goodsReceipt.header.title');
  goodsReceiptList = [
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

  editGoodsReceipt() {
    this.router.navigate(['inventory/receipt/goods-receipt/goods-receipt-detail']);
  }

  addGoodsReceipt() {
    this.router.navigate(['inventory/receipt/goods-receipt/goods-receipt-detail']);
  }

}
