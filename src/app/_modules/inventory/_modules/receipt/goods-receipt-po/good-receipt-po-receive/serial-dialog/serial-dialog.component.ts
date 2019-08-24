import { Component, Input, OnInit } from '@angular/core';
import { GoodsReceiptPOContent, SerialNumberEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';

@Component({
  selector: 'app-serial-dialog',
  templateUrl: './serial-dialog.component.html',
  styleUrls: ['./serial-dialog.component.scss'],
})
export class SerialDialogComponent implements OnInit {

  @Input() serialNumberDetail: GoodsReceiptPOContent = null;

  constructor() {
  }

  ngOnInit() {
  }
}
