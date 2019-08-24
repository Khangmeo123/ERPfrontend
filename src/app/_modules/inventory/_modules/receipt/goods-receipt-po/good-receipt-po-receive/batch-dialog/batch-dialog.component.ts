import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BatchDialogRepository } from './batch-dialog.repository';
import { BinLocationSearchEntity, ItemDetailSearchEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';

@Component({
  selector: 'app-batch-dialog',
  templateUrl: './batch-dialog.component.html',
  styleUrls: ['./batch-dialog.component.scss'],
})
export class BatchDialogComponent implements OnInit {

  @Input() tableGoodsReceiptPOContents;

  displayBatch: boolean = false;

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  binLocationSearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  enableBinLocation: boolean = false;

  @Input() batch: any;

  placeholder: string = '';

  activeScan: boolean = false;

  @ViewChild('tableBatch', {static: false}) tableBatch: ElementRef;

  constructor(private batchDialogRepository: BatchDialogRepository) {
  }

  ngOnInit() {
  }

  clearBatchTable(table) {
    table.reset();
  }

  updateBatch() {

  }

  deleteMultipleBatch = () => {

  };

  sortDate(event, table, field) {

  }

  addBinLocationBatch() {
  }

  deleteBinLocationBatch(i, j) {

  }

  checkAllBatch(event) {

  }

  inputBatch = (event) => {

  };
}
