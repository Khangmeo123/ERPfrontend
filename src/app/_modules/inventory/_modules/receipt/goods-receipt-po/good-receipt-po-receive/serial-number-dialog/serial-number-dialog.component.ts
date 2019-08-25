import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  BinLocationSearchEntity,
  GoodsReceiptPOContentDetailSearchEntity,
  ItemDetailSearchEntity,
} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { SerialNumberDialogRepository } from './serial-number-dialog.repository';

@Component({
  selector: 'app-serial-number-dialog',
  templateUrl: './serial-number-dialog.component.html',
  styleUrls: ['./serial-number-dialog.component.scss'],
})
export class SerialNumberDialogComponent implements OnInit {

  @Input() tableGoodsReceiptPOContents;

  @Input() display: boolean = false;

  @Input() serialNumberDetail;

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  binLocationSearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  @Input() enableBinLocation: boolean = false;

  @Input() batch: any;

  @ViewChild('tableSerialNumber', {static: false}) tableSerialNumber: ElementRef;

  @Input() deleteSerialNumber;

  @Input() goodsReceiptPOContentDetailSearchEntity: GoodsReceiptPOContentDetailSearchEntity = new GoodsReceiptPOContentDetailSearchEntity();

  @Input() quantityItems;

  @Input() serialNumber;

  placeholder: string = '';

  activeScan: boolean = false;

  constructor(private serialNumberDialogRepository: SerialNumberDialogRepository) {
  }

  ngOnInit() {
  }

  clearSerialNumberTable(table) {
    table.reset();
  }

  updateSerialNumber() {

  }

  deleteMultipleSerialNumber = () => {

  };

  sortDate(event, table, field) {

  }

  addBinLocationSerialNumber() {
  }

  deleteBinLocationSerialNumber(i, j) {

  }

  checkAllSerialNumber(event) {

  }

  inputSerialNumber = (event) => {

  };
}
