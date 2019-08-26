import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BatchDialogRepository } from './batch-dialog.repository';
import { BinLocationSearchEntity, ItemDetailSearchEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';

@Component({
  selector: 'app-batch-dialog',
  templateUrl: './batch-dialog.component.html',
  styleUrls: ['./batch-dialog.component.scss'],
  providers: [
    BatchDialogRepository,
  ],
})
export class BatchDialogComponent implements OnInit {

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  binLocationSearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  enableBinLocation: boolean = false;

  placeholder: string = '';

  activeScan: boolean = false;

  @Input() tableGoodsReceiptPOContents;

  @Input() display: boolean = false;

  @Input() batch: any;

  @Input() deleteMultipleBatch;

  @Input() addBinLocationBatch;

  @Input() checkAllBatch;

  @Input() updateBatch;

  @Input() deleteBinLocationBatch;

  @Input() inputBatch;

  @Input() changeLocationInBatch;

  @ViewChild('tableBatch', {static: false}) tableBatch: ElementRef;

  @Input() sortDate;

  @Input() clearBatchTable;

  constructor(private batchDialogRepository: BatchDialogRepository) {
  }

  ngOnInit(): void {
  }
}
