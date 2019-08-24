import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {
  BinLocationSearchEntity,
  GoodsReceiptPOContentDetailSearchEntity,
  ItemDetailSearchEntity
} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { SerialDialogRepository } from './serial-dialog.repository';

@Component({
  selector: 'app-serial-dialog',
  templateUrl: './serial-dialog.component.html',
  styleUrls: ['./serial-dialog.component.scss'],
})
export class SerialDialogComponent implements OnInit {

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

  constructor(private serialDialogRepository: SerialDialogRepository) {
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
