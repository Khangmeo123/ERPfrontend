import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
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
import { GoodsReceiptPOApproveRepository } from './goods-receipt-po-approve.repository';
import { ValueAddedTaxSearchEntity } from '../../../../../master-data/_backend/value-added-tax/value-added-tax.search-entity';

@Component({
  selector: 'app-goods-receipt-po-approve',
  templateUrl: './goods-receipt-po-approve.component.html',
  styleUrls: ['./goods-receipt-po-approve.component.scss'],
  providers: [GoodsReceiptPOApproveService],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptPOApproveComponent implements OnInit, OnDestroy {

  pageTitle = translate('goodsReceiptPO.header.title');

  displayBatches: boolean = false;

  displaySerial: boolean = false;

  displayAmount: boolean = false;

  displayPurchaseOrders: boolean = false;

  goodsReceiptPOSubs: Subscription = new Subscription();

  goodsReceiptPOForm: FormGroup;

  deletedList: number[] = [];

  popoverTitle: string = '';

  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  supplierDetailId: string;

  goodsReceiptPOId: string;

  // purchaseOrderNumber:
  documentNumberSearchEntity: PurchaseOrderSearchEntity = new PurchaseOrderSearchEntity();

  // itemDetail:
  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  // unitOfMeasure:
  unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity = new UnitOfMeasureSearchEntity();

  valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity = new ValueAddedTaxSearchEntity();

  constructor(
    private goodsReceiptPOService: GoodsReceiptPOApproveService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router,
    private goodsReceiptPOApproveRepository: GoodsReceiptPOApproveRepository,
  ) {

    this.route.queryParams.subscribe(params => {
      if (params.id) {
        this.goodsReceiptPOId = params.id;
      }
      this.goodsReceiptPOService.getDetail(params.id)
        .then(() => {
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

  get fileAttachments() {
    return this.goodsReceiptPOForm.get('fileAttachments') as FormControl;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.goodsReceiptPOSubs.unsubscribe();
  }

  // general:
  trackByFn = (index) => index;

  backToList() {
    return this.router.navigate(
      ['/inventory/receipt/goods-receipt-po/goods-receipt-po-list'],
    );
  }

  approve() {
    this.goodsReceiptPOService.approve(this.goodsReceiptPOForm.value.id)
      .then(() => {
        return this.backToList();
      });
  }

  reject = () => {
    this.goodsReceiptPOService.reject(this.goodsReceiptPOForm.value.id)
      .then(() => {
        return this.backToList();
      });
  };
}
