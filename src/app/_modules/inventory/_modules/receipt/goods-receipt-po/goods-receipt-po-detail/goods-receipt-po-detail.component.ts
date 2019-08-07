import { SupplierSearchEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.searchentity';
import { Subscription, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router } from '@angular/router';
import { GoodsReceiptPODetailService } from './goods-receipt-po-detail.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import {
  GoodsReceiptPORequesterEntity,
  GoodsReceiptPOSupplierEntity,
  GoodsReceiptPOSupplierAddressEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  GoodsReceiptPORequesterSearchEntity,
  GoodsReceiptPOInventoryOrganizationSearchEntity,
  GoodsReceiptPOSupplierSearchEntity,
  GoodsReceiptPOSupplierAddressSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';

@Component({
  selector: 'app-goods-receipt-po-detail',
  templateUrl: './goods-receipt-po-detail.component.html',
  styleUrls: ['./goods-receipt-po-detail.component.scss'],
  providers: [GoodsReceiptPODetailService],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptPoDetailComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptPODetail.header.title');
  fileNameList: Array<any> = [];
  displayBatches: boolean = false;
  displayCDA: boolean = false;
  displayAmount: boolean = false;
  displayGoodsReceipt: boolean = false;
  goodsReceiptPOSubs: Subscription = new Subscription();
  goodsReceiptPOForm: FormGroup;
  // supplier:
  supplierIds: GoodsReceiptPOSupplierEntity[];
  supplierExceptIds: GoodsReceiptPOSupplierEntity[];
  supplierSearchEntity: GoodsReceiptPOSupplierSearchEntity = new GoodsReceiptPOSupplierSearchEntity();
  supplierTyping: Subject<GoodsReceiptPOSupplierSearchEntity> = new Subject();
  // supplierAddress:
  supplierAddressIds: GoodsReceiptPOSupplierAddressEntity[];
  supplierAddressExceptIds: GoodsReceiptPOSupplierAddressEntity[];
  supplierAddressSearchEntity: GoodsReceiptPOSupplierAddressSearchEntity = new GoodsReceiptPOSupplierAddressSearchEntity();
  supplierAddressTyping: Subject<GoodsReceiptPOSupplierAddressSearchEntity> = new Subject();
  // requester:
  requesterIds: GoodsReceiptPORequesterEntity[];
  requesterExceptIds: GoodsReceiptPORequesterEntity[];
  requesterSearchEntity: GoodsReceiptPORequesterSearchEntity = new GoodsReceiptPORequesterSearchEntity();
  requesterTyping: Subject<GoodsReceiptPORequesterSearchEntity> = new Subject();
  // inventoryOrganization:
  inventoryOrganizationIds: GoodsReceiptPORequesterEntity[];
  inventoryOrganizationExceptIds: GoodsReceiptPORequesterEntity[];
  inventoryOrganizationSearchEntity: GoodsReceiptPOInventoryOrganizationSearchEntity =
    new GoodsReceiptPOInventoryOrganizationSearchEntity();
  inventoryOrganizationTyping: Subject<GoodsReceiptPOInventoryOrganizationSearchEntity> = new Subject();

  constructor(
    private goodsReceiptPOService: GoodsReceiptPODetailService,
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router) {
    const goodsReceiptFormSub = this.goodsReceiptPOService.goodsReceiptPOForm.subscribe(res => {
      if (res) {
        this.goodsReceiptPOForm = res;
      }
    });
    // supplier:
    const supplierListSub = this.goodsReceiptPOService.supplierList.subscribe(res => {
      if (res) {
        this.supplierIds = res.ids;
        this.supplierExceptIds = res.exceptIds;
      }
    });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.goodsReceiptPOSubs.unsubscribe();
  }

  readURL(event: any) {
    for (const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  showBatches() {
    this.displayBatches = true;
  }

  showCDA() {
    this.displayCDA = true;
  }

  showAmount() {
    this.displayAmount = true;
  }

  showGoodsReceipt() {
    this.displayGoodsReceipt = true;
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);
  }
}
