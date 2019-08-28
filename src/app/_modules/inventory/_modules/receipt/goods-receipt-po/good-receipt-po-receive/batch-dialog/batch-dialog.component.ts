import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {BatchDialogRepository} from './batch-dialog.repository';
import {Table} from 'primeng/table';
import {BatchBinLocationEntity, BatchEntity, GoodsReceiptPOContent} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import {TextFilter} from '../../../../../../../_shared/models/filters/TextFilter';
import {BinLocationSearchEntity, ItemDetailSearchEntity} from '../../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import {DateFilter} from '../../../../../../../_shared/models/filters/DateFilter';
import {FormGroup} from '@angular/forms';
import {BatchDialogService} from './batch-dialog.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-batch-dialog',
  templateUrl: './batch-dialog.component.html',
  styleUrls: ['./batch-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [
    BatchDialogRepository,
  ],
})
export class BatchDialogComponent implements OnInit, OnDestroy {

  visible: boolean = false;

  @Input() goodsReceiptPOContentId: string;

  @Output() displayChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  batch: GoodsReceiptPOContent = new GoodsReceiptPOContent();

  @Input() goodsReceiptPOContent: GoodsReceiptPOContent;

  @Input() goodsReceiptPOForm: FormGroup;

  @Input() itemDetailId: string;

  @Input() updateBatch: () => void;

  @Input() sortDate: (event, table: Table, field: string) => void;

  @Input() enableBinLocation: boolean;

  binLocationSearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  batchCode: TextFilter = new TextFilter();

  expirationDateFilter: DateFilter = new DateFilter();

  mfrDateFilter: DateFilter = new DateFilter();

  activeScan: boolean = false;

  public subscription: Subscription = new Subscription();

  constructor(
    private batchDialogRepository: BatchDialogRepository,
    private batchDialogService: BatchDialogService,
  ) {
    const batchSubscription: Subscription = this.batchDialogService.batch.subscribe((batch: GoodsReceiptPOContent) => {
      this.batch = batch;
    });

    this.subscription.add(batchSubscription);
  }

  get display() {
    return this.visible;
  }

  @Input()
  set display(value) {
    this.visible = value;
    this.displayChange.emit(value);
    if (value) {
      this.batchDialogService.getBatch(this.goodsReceiptPOContentId)
        .then((batch: GoodsReceiptPOContent) => {
          this.batch = batch;
        });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  clearTable = (table: Table) => {
  };

  deleteSelected = () => {
  };

  onFilterItemDetail = (table: Table) => {
  };

  selectAll = (event) => {
    const {goodsReceiptPOBatches: batches} = this.batch;
    batches.forEach((batch) => {
      batch.isSelected = event.target.checked;
    });
  };

  addBinLocation = (batchIndex: number) => {
    const {goodsReceiptPOBatchBinLocations: binLocations} = this.batch.goodsReceiptPOBatches[batchIndex];
    const newBinLocation: BatchBinLocationEntity = new BatchBinLocationEntity();
    newBinLocation.quantity = 0;
    if (binLocations) {
      this.batch.goodsReceiptPOBatches[batchIndex].goodsReceiptPOBatchBinLocations = [
        ...binLocations,
        newBinLocation,
      ];
    } else {
      this.batch.goodsReceiptPOBatches[batchIndex].goodsReceiptPOBatchBinLocations = [
        newBinLocation,
      ];
    }
  };

  addBatch = () => {
    this.batch.goodsReceiptPOBatches = [
      ...this.batch.goodsReceiptPOBatches,
      new BatchEntity(),
    ];
  };

  deleteBinLocation = (batchIndex: number, binLocationIndex: number) => {
    this.batch.goodsReceiptPOBatches[batchIndex].goodsReceiptPOBatchBinLocations.splice(binLocationIndex);
  };

  inputBatch = (id: string, event): void => {
    if (event.target.value) {
      this.batchDialogService.analyzeBatchCode(id, event.target.value);
    }
  };

  deleteBatch = (index: number) => {
    this.batch.goodsReceiptPOBatches.splice(index, 1);
  };

  onChangeBatchNumber = (event, index: number, rowData: BatchEntity) => {
    if (event.key === 'Enter') {
      const {value} = event.target;
      const batch: BatchEntity = this.batch.goodsReceiptPOBatches.find((item: BatchEntity) => item.batchNumber === value);
      if (batch) {
        batch.quantity += rowData.quantity;
        this.batch.goodsReceiptPOBatches.splice(index, 1);
      } else {
        rowData.batchNumber = value;
      }
    }
  };
}
