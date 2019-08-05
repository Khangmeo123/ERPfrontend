import { Component, OnInit } from '@angular/core';
import { translate } from 'src/app/_helpers/string';

@Component({
  selector: 'app-goods-receipt-po-detail',
  templateUrl: './goods-receipt-po-detail.component.html',
  styleUrls: ['./goods-receipt-po-detail.component.scss']
})
export class GoodsReceiptPoDetailComponent implements OnInit {
  pageTitle = translate('goodsReceiptPODetail.header.title')

  constructor() { }

  ngOnInit() {
  }

}
