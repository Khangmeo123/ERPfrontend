import { BatchOfGoodsReceipt } from './../../../../../_backend/goods-receipt/goods-receipt.entity';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { GoodsReceiptBatchDialogRepository } from './goods-receipt-batch-dialog.repository';
import {
  GoodsReceiptContentSearch,
  BinLocationOfGoodsReceiptSearch,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';
import {
  GoodsReceiptContent,
  BatchBinLocationOfGoodsReceipt,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/_services/general-service.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-goods-receipt-batch-dialog',
  templateUrl: './goods-receipt-batch-dialog.component.html',
  styleUrls: ['./goods-receipt-batch-dialog.component.scss'],
})
export class GoodsReceiptBatchDialogComponent implements OnInit, OnDestroy {

  extendTitle: string;
  goodsReceiptContentSearch: GoodsReceiptContentSearch = new GoodsReceiptContentSearch();
  binLocationSearchEntity: BinLocationOfGoodsReceiptSearch;
  goodsReceiptContent: GoodsReceiptContent = JSON.parse(localStorage.getItem('goodsReceiptSerialNumber')) || new GoodsReceiptContent();
  goodsReceiptBatchDialogSubs: Subscription = new Subscription();
  activeScan: boolean = false;
  qrCode: string;

  @Input() display: boolean = false;
  @Input() goodsReceiptContentId: string = null;
  @Input() enableBinLocation: boolean = false;
  @Input() inventoryOrganizationId: string;
  @Output() cancelDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private batchDialogRepository: GoodsReceiptBatchDialogRepository,
    private toastrService: ToastrService,
    private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.binLocationSearchEntity = new BinLocationOfGoodsReceiptSearch({ inventoryOrganizationId: this.inventoryOrganizationId });
    const goodsReceiptContentSub = this.batchDialogRepository.getGoodsReceiptContent(this.goodsReceiptContentId).subscribe((res) => {
      if (res) {
        this.goodsReceiptContent = res;
        this.extendTitle = this.goodsReceiptContent.itemName + ' - ' + this.goodsReceiptContent.itemCode;
      }
    });
    this.goodsReceiptBatchDialogSubs.add(goodsReceiptContentSub);
  }

  ngOnDestroy(): void {
    this.goodsReceiptBatchDialogSubs.unsubscribe();
  }

  sortDate(event: string, table: any, field: string) {
    const date = event.replace(/\//g, '-') + 'T00:00:00';
    table.filter(date, field, 'equals');
  }

  validate() {
    let returnvalue = true;
    this.goodsReceiptContent.goodsReceiptBatches.forEach((item) => {
      const sumValue = _.sumBy(item.goodsReceiptBatchBinLocations, (elm) => elm.quantity);
      if (item.actualReceive !== sumValue) {
        item.errors = { message: 'Tổng số lượng không bằng nhau!' };
        returnvalue = false;
      }
    });
    return returnvalue;
  }

  update() {
    if (this.validate()) {
      const updateGoodsReceiptSub = this.batchDialogRepository.updateGoodsReceiptContent(this.goodsReceiptContent).subscribe((res) => {
        if (res) {
          this.toastrService.success('Hệ thống cập nhật thành công!');
          this.cancel();
        }
      });
      this.goodsReceiptBatchDialogSubs.add(updateGoodsReceiptSub);
    }
  }

  cancel() {
    this.cancelDialog.emit(false);
  }

  inputBatch(qrCode: string) {
    this.batchDialogRepository.analyzeQRCode(this.goodsReceiptContent.itemDetailId, qrCode).subscribe((res) => {
      if (res) {
        this.goodsReceiptContent.goodsReceiptBatches.forEach((item) => {
          if (item.batchNumber === res.batchNumber) {
            item.actualReceive += item.actualReceive;
          }
        });
        localStorage.setItem('goodsReceiptBatch', JSON.stringify(this.goodsReceiptContent));
        this.toastrService.success('Hệ thống quét mã thành công!');
      }
    }, (err) => {
      if (err) {
        this.toastrService.error('Quét QR xảy ra lỗi!');
        this.generalService.alertSound();
      }
    });
  }

  addNewBatch(index: number) {
    const goodsReceiptBatchBinLocation = new BatchBinLocationOfGoodsReceipt();
    this.goodsReceiptContent.goodsReceiptBatches[index].goodsReceiptBatchBinLocations.push(goodsReceiptBatchBinLocation);
  }

  addNewBatchRow() {
    const goodsReceiptBatch = new BatchOfGoodsReceipt();
    this.goodsReceiptContent.goodsReceiptBatches.push(goodsReceiptBatch);
  }

  selectBinLocation(binLocation: any) {
    this.goodsReceiptContent.goodsReceiptBatches.forEach((item) => {
      if (item.isSelected) {
        item.goodsReceiptBatchBinLocations.forEach((elm) => {
          elm.binLocationId = binLocation.id;
          elm.binLocationCode = binLocation.code;
        });
        item.isSelected = !item.isSelected;
      }
    });
  }

  checkAllBatch(value: any) {
    this.goodsReceiptContent.goodsReceiptBatches.forEach((item) => {
      item.isSelected = value.checked;
    });
  }

  deleteBatch(index: number, indexRow: number) {
    this.goodsReceiptContent.goodsReceiptBatches[index].goodsReceiptBatchBinLocations.splice(indexRow, 1);
  }

  deleteMultipleBatch() {
    const selectedList = this.goodsReceiptContent.goodsReceiptBatches.filter((item) => item.isSelected).map((item) => {
      return this.goodsReceiptContent.goodsReceiptBatches.indexOf(item);
    });
    for (let i = selectedList.length - 1; i >= 0; i--) {
      this.goodsReceiptContent.goodsReceiptBatches.splice(selectedList[i], 1);
    }
  }

}
