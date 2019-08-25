import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BatchDialogRepository } from './batch-dialog.repository';
import { Table } from 'primeng/table';
import { GoodsReceiptPOContent } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { TextFilter } from '../../../../../../../_shared/models/filters/TextFilter';
import { BinLocationSearchEntity, ItemDetailSearchEntity } from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { DateFilter } from '../../../../../../../_shared/models/filters/DateFilter';
import { FormGroup } from '@angular/forms';
import { BatchDialogService } from './batch-dialog.service';

@Component({
  selector: 'app-batch-dialog',
  templateUrl: './batch-dialog.component.html',
  styleUrls: ['./batch-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    BatchDialogRepository,
  ],
})
export class BatchDialogComponent implements OnInit, OnChanges {

  @Input() display: boolean = false;

  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() batch: GoodsReceiptPOContent = new GoodsReceiptPOContent();

  @Input() goodsReceiptPOContent: GoodsReceiptPOContent;

  @Input() goodsReceiptPOForm: FormGroup;

  @Input() itemDetailId: string;

  binLocationSearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  batchCode: TextFilter = new TextFilter();

  enableBinLocation: boolean = false;

  expirationDateFilter: DateFilter = new DateFilter();

  mfrDateFilter: DateFilter = new DateFilter();

  activeScan: boolean = false;

  @Input() inputBatch;

  @Input() updateBatch;

  constructor(private batchDialogRepository: BatchDialogRepository, private batchDialogService: BatchDialogService) {
  }

  ngOnInit = (): void => {
    if (this.itemDetailId) {
      this.batchDialogService.getBatch(this.itemDetailId)
        .then(() => {
        });
    }
  };

  ngOnChanges = (changes: SimpleChanges) => {

  };

  clearTable = (table: Table) => {

  };

  deleteSelected = () => {

  };

  onFilterItemDetail = (table: Table) => {
  };

  sortDate = (event, table: Table, field: string) => {

  };

  selectAll = (event) => {

  };
}
