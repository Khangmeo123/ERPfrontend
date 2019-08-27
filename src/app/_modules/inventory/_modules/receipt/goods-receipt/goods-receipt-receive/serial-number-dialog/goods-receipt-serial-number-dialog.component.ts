import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GoodsReceiptSerialNumberDialogRepository } from './goods-receipt-serial-number-dialog.repository';
import {
  ItemDetailOfGoodsReceiptSearch,
  BinLocationOfGoodsReceiptSearch,
  GoodsReceiptContentSearch,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';
import { GoodsReceiptContent, SerialNumberOfGoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from 'src/app/_services/general-service.service';
@Component({
  selector: 'app-goods-receipt-serial-number-dialog',
  templateUrl: './goods-receipt-serial-number-dialog.component.html',
  styleUrls: ['./goods-receipt-serial-number-dialog.component.scss'],
})
export class GoodsReceiptSerialNumberDialogComponent implements OnInit, OnDestroy {

  extendTitle: string;
  goodsReceiptContentSearch: GoodsReceiptContentSearch = new GoodsReceiptContentSearch();
  binLocationSearchEntity: BinLocationOfGoodsReceiptSearch = new BinLocationOfGoodsReceiptSearch();
  goodsReceiptContent: GoodsReceiptContent = JSON.parse(localStorage.getItem('goodsReceiptSerialNumber')) || new GoodsReceiptContent();
  goodsReceiptSerialNumberDialogSubs: Subscription = new Subscription();
  activeScan: boolean = false;
  qrCode: string;

  @Input() display: boolean = false;
  @Input() goodsReceiptContentId: string = null;
  @Input() enableBinLocation: boolean = false;
  @Input() inventoryOrganizationId: string;
  @Output() cancelDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private serialNumberDialogRepository: GoodsReceiptSerialNumberDialogRepository,
    private toastrService: ToastrService,
    private generalService: GeneralService) {
  }

  ngOnInit() {
    this.binLocationSearchEntity = new BinLocationOfGoodsReceiptSearch({ inventoryOrganizationId: this.inventoryOrganizationId });
    const goodsReceiptContentSub = this.serialNumberDialogRepository.getGoodsReceiptContent(this.goodsReceiptContentId).subscribe((res) => {
      if (res) {
        this.goodsReceiptContent = res;
        this.extendTitle = this.goodsReceiptContent.itemName + ' - ' + this.goodsReceiptContent.itemCode;
      }
    });
    this.goodsReceiptSerialNumberDialogSubs.add(goodsReceiptContentSub);
  }

  ngOnDestroy() {
    this.goodsReceiptSerialNumberDialogSubs.unsubscribe();
  }

  sortDate(event: string, table: any, field: string) {
    const date = event.replace(/\//g, '-') + 'T00:00:00';
    table.filter(date, field, 'equals');
  }

  update() {
    const updateGoodsReceiptSub = this.serialNumberDialogRepository.updateGoodsReceiptContent(this.goodsReceiptContent).subscribe((res) => {
      if (res) {
        this.toastrService.success('Hệ thống cập nhật thành công!');
        this.cancel();
      }
    });
    this.goodsReceiptSerialNumberDialogSubs.add(updateGoodsReceiptSub);
  }

  addSerialNumber() {
    const goodsReceiptSerialNumber = new SerialNumberOfGoodsReceipt();
    this.goodsReceiptContent.goodsReceiptSerialNumbers.push(goodsReceiptSerialNumber);
  }

  inputSerialNumber(qrCode: string) {
    this.serialNumberDialogRepository.analyzeQRCode(this.goodsReceiptContent.itemDetailId, qrCode).subscribe((res) => {
      if (res) {
        const filterItem = this.goodsReceiptContent.goodsReceiptSerialNumbers.filter((item) => {
          return item.serialNumber === res.serialNumber;
        });
        if (filterItem.length === 0) {
          this.toastrService.error('Quét mã serial bị trùng!');
          this.generalService.alertSound();
        } else {
          this.goodsReceiptContent.goodsReceiptSerialNumbers.push(res);
          this.toastrService.success('Hệ thống quét mã thành công!');
          localStorage.setItem('goodsReceiptSerialNumber', JSON.stringify(this.goodsReceiptContent));
        }
      }
    }, (err) => {
      if (err) {
        this.toastrService.error('Quét QR xảy ra lỗi!');
        this.generalService.alertSound();
      }
    });
  }

  selectBinLocation(binLocation: any) {
    this.goodsReceiptContent.goodsReceiptSerialNumbers.forEach((item) => {
      if (item.isSelected) {
        item.binLocationId = binLocation.id;
        item.binLocationCode = binLocation.code;
        item.isSelected = !item.isSelected;
      }
    });
  }

  checkAllSerialNumber(value: any) {
    this.goodsReceiptContent.goodsReceiptSerialNumbers.forEach((item) => {
      item.isSelected = value.checked;
    });
  }

  deleteSerialNumber(index: number) {
    this.goodsReceiptContent.goodsReceiptSerialNumbers.splice(index, 1);
  }

  deleteMultipleSerialNumber() {
    const selectedList = this.goodsReceiptContent.goodsReceiptSerialNumbers.filter((item) => item.isSelected).map((item) => {
      return this.goodsReceiptContent.goodsReceiptSerialNumbers.indexOf(item);
    });
    for (let i = selectedList.length - 1; i >= 0; i--) {
      this.goodsReceiptContent.goodsReceiptSerialNumbers.splice(selectedList[i], 1);
    }
  }

  cancel() {
    this.cancelDialog.emit(false);
  }
}
