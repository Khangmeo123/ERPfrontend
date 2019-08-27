import { ToastrService } from 'ngx-toastr';
import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { GeneralService } from '../../../../../../../_services/general-service.service';
import { GoodsReceiptQuantityDialogRepository } from './goods-receipt-quantity-dialog.repository';
import { GoodsReceiptContent, QuantityOfGoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import { Subscription } from 'rxjs';
import { BinLocationOfGoodsReceiptSearch } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';

@Component({
  selector: 'app-goods-receipt-quantity-dialog',
  templateUrl: './goods-receipt-quantity-dialog.component.html',
  styleUrls: ['./goods-receipt-quantity-dialog.component.scss'],
  providers: [
    GeneralService,
  ],
})
export class GoodsReceiptQuantityDialogComponent implements OnInit, OnDestroy {
  extendTitle: string;
  goodsReceiptContent: GoodsReceiptContent = new GoodsReceiptContent();
  goodsReceiptQuantityDialogSubs: Subscription = new Subscription();
  binLocationSearchEntity: BinLocationOfGoodsReceiptSearch;
  @Input() display: boolean = false;
  @Input() goodsReceiptContentId: string = null;
  @Input() enableBinLocation: boolean = false;
  @Input() inventoryOrganizationId: string;
  @Output() cancelDialog: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private quantityDialogRepository: GoodsReceiptQuantityDialogRepository,
    private toastrService: ToastrService,
    private generalService: GeneralService) {
  }

  ngOnInit(): void {
    this.binLocationSearchEntity = new BinLocationOfGoodsReceiptSearch({ inventoryOrganizationId: this.inventoryOrganizationId });
    const goodsReceiptContentSub = this.quantityDialogRepository.getGoodsReceiptContent(this.goodsReceiptContentId).subscribe((res) => {
      if (res) {
        this.goodsReceiptContent = res;
        this.extendTitle = this.goodsReceiptContent.itemName + ' - ' + this.goodsReceiptContent.itemCode;
      }
    });
    this.goodsReceiptQuantityDialogSubs.add(goodsReceiptContentSub);
  }

  ngOnDestroy(): void {
    this.goodsReceiptQuantityDialogSubs.unsubscribe();
  }

  update() {
    const updateGoodsReceiptSub = this.quantityDialogRepository.updateGoodsReceiptContent(this.goodsReceiptContent).subscribe((res) => {
      if (res) {
        this.toastrService.success('Hệ thống cập nhật thành công!');
        this.cancel();
      }
    });
    this.goodsReceiptQuantityDialogSubs.add(updateGoodsReceiptSub);
  }

  cancel() {
    this.cancelDialog.emit(false);
  }

  addQuantityDetail() {
    const newRow = new QuantityOfGoodsReceipt();
    this.goodsReceiptContent.goodsReceiptQuantities.push(newRow);
  }

  deleteQuantityDetail(index: number) {
    this.goodsReceiptContent.goodsReceiptQuantities.splice(index, 1);
  }

  recalculateQuantityDetail() {
    this.goodsReceiptContent.actualReceive = 0;
    this.goodsReceiptContent.goodsReceiptQuantities.forEach((elm) => {
      this.goodsReceiptContent.actualReceive += elm.quantity;
    });
  }

}
