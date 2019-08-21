import { Subscription } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/_services/general-service.service';
import { GoodsReceiptPOApproveService } from './goods-receipt-po-approve.service';
import {
  ItemDetailSearchEntity,
  PurchaseOrderSearchEntity,
  UnitOfMeasureSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';

@Component({
  selector: 'app-goods-receipt-po-approve',
  templateUrl: './goods-receipt-po-approve.component.html',
  styleUrls: ['./goods-receipt-po-approve.component.scss'],
  providers: [GoodsReceiptPOApproveService],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptPOApproveComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptPODetail.header.title');
  fileNameList: Array<any> = [];
  displayBatches: boolean = false;
  displaySerial: boolean = false;
  displayAmount: boolean = false;
  displayPurchseOrders: boolean = false;
  goodsReceiptPOSubs: Subscription = new Subscription();
  goodsReceiptPOForm: FormGroup;
  deletedList: number[] = [];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  supplierDetailId: string;
  goodsReceiptPOId: string;
  // documentNumber:
  documentNumberSearchEntity: PurchaseOrderSearchEntity = new PurchaseOrderSearchEntity();
  // itemDetail:
  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();
  // unitOfMeasure:
  unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity = new UnitOfMeasureSearchEntity();

  constructor(
    private goodsReceiptPOService: GoodsReceiptPOApproveService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.goodsReceiptPOId = params.id;
        }
        this.goodsReceiptPOService.getDetail(params.id).then(res => {
          this.supplierDetailId = this.goodsReceiptPOForm.controls.supplierDetailId.value;
        });
      });

    const goodsReceiptFormSub = this.goodsReceiptPOService.goodsReceiptPOForm.subscribe(res => {
      if (res) {
        this.goodsReceiptPOForm = res;
      }
    });

    this.goodsReceiptPOSubs
      .add(goodsReceiptFormSub);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.goodsReceiptPOSubs.unsubscribe();
  }

  // general:
  trackByFn(index, row) {
    return index;
  }

  readURL(event: any) {
    for (const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);
  }

  approve() {
    this.goodsReceiptPOService.approve(this.goodsReceiptPOForm.controls.id.value).then(res => {
      this.backToList();
    });
  }

  reject() {
    this.goodsReceiptPOService.reject(this.goodsReceiptPOForm.controls.id.value).then(res => {
      this.backToList();
    });
  }
}
