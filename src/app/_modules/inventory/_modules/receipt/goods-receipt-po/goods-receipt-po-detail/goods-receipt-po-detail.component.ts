import {
  GoodsReceiptPOInventoryOrganizationEntity,
  PurchaseOrdersEntity,
} from './../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
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
  PurchaseOrdersSearchEntity,
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
  displayPurchseOrders: boolean = false;
  goodsReceiptPOSubs: Subscription = new Subscription();
  goodsReceiptPOForm: FormGroup;
  purchaseOrdersList: PurchaseOrdersEntity[];
  purchaseOrdersSearchEntity: PurchaseOrdersSearchEntity;
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
  // buyer:
  buyerIds: GoodsReceiptPORequesterEntity[];
  buyerExceptIds: GoodsReceiptPORequesterEntity[];
  buyerSearchEntity: GoodsReceiptPORequesterSearchEntity = new GoodsReceiptPORequesterSearchEntity();
  buyerTyping: Subject<GoodsReceiptPORequesterSearchEntity> = new Subject();
  // owner:
  ownerIds: GoodsReceiptPORequesterEntity[];
  ownerExceptIds: GoodsReceiptPORequesterEntity[];
  ownerSearchEntity: GoodsReceiptPORequesterSearchEntity = new GoodsReceiptPORequesterSearchEntity();
  ownerTyping: Subject<GoodsReceiptPORequesterSearchEntity> = new Subject();
  // ownerPO:
  ownerPOIds: GoodsReceiptPORequesterEntity[];
  ownerPOExceptIds: GoodsReceiptPORequesterEntity[];
  ownerPOSearchEntity: GoodsReceiptPORequesterSearchEntity = new GoodsReceiptPORequesterSearchEntity();
  ownerPOTyping: Subject<GoodsReceiptPORequesterSearchEntity> = new Subject();
  // inventoryOrganization:
  inventoryOrganizationIds: GoodsReceiptPOInventoryOrganizationEntity[];
  inventoryOrganizationExceptIds: GoodsReceiptPOInventoryOrganizationEntity[];
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
    const purchaseOrdersListSub = this.goodsReceiptPOService.purchaseOrdersList.subscribe(res => {
      if (res) {
        this.purchaseOrdersList = res;
      }
    });
    // supplier:
    const supplierListSub = this.goodsReceiptPOService.supplierList.subscribe(res => {
      if (res) {
        this.supplierIds = res.ids;
        this.supplierExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchSupplier(this.supplierTyping);
    // supplierAddress:
    const supplierAddressSub = this.goodsReceiptPOService.supplierAddressList.subscribe(res => {
      if (res) {
        this.supplierAddressIds = res.ids;
        this.supplierAddressExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchSupplierAddress(this.supplierAddressTyping);
    // owner:
    const ownerSub = this.goodsReceiptPOService.ownerList.subscribe(res => {
      if (res) {
        this.ownerIds = res.ids;
        this.ownerExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchOwner(this.ownerTyping);
    // ownerPO:
    const ownerPOSub = this.goodsReceiptPOService.ownerPOList.subscribe(res => {
      if (res) {
        this.ownerPOIds = res.ids;
        this.ownerPOExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchOwnerPO(this.ownerPOTyping);
    // invetoryOrganization:
    const inventoryOrganizationSub = this.goodsReceiptPOService.invetoryOrganizationList.subscribe(res => {
      if (res) {
        this.inventoryOrganizationIds = res.ids;
        this.inventoryOrganizationExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchInvetoryOrganization(this.inventoryOrganizationTyping);

    // add subcription:
    this.goodsReceiptPOSubs.add(goodsReceiptFormSub)
      .add(supplierListSub)
      .add(supplierAddressSub)
      .add(ownerSub)
      .add(inventoryOrganizationSub)
      .add(purchaseOrdersListSub)
      .add(ownerPOSub);
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

  getPurchaseOrdersList() {
    this.purchaseOrdersSearchEntity.supplierDetailId = this.goodsReceiptPOForm.controls.supplierDetailId.value;
    this.goodsReceiptPOService.getPurchaseOrdersList(this.purchaseOrdersSearchEntity);
  }

  showPurchaseOrders() {
    this.purchaseOrdersSearchEntity = new PurchaseOrdersSearchEntity();
    this.getPurchaseOrdersList();
    this.displayPurchseOrders = true;
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);
  }

  // buyer:
  dropListBuyer(id: string) {
    this.buyerSearchEntity = new GoodsReceiptPORequesterSearchEntity();
    if (id !== null && id.length > 0) {
      this.buyerSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListBuyer(this.ownerSearchEntity);
  }

  typingSearchBuyer(event, id) {
    this.buyerSearchEntity = new GoodsReceiptPORequesterSearchEntity();
    if (id !== null && id.length > 0) {
      this.buyerSearchEntity.ids.push(id);
    }
    this.buyerSearchEntity.name.startsWith = event;
    this.buyerTyping.next(this.buyerSearchEntity);
  }

  // owner:
  dropListOwner(id: string) {
    this.ownerSearchEntity = new GoodsReceiptPORequesterSearchEntity();
    if (id !== null && id.length > 0) {
      this.ownerSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListOwner(this.ownerSearchEntity);
  }

  typingSearchOwner(event, id) {
    this.ownerSearchEntity = new GoodsReceiptPORequesterSearchEntity();
    if (id !== null && id.length > 0) {
      this.ownerSearchEntity.ids.push(id);
    }
    this.ownerSearchEntity.name.startsWith = event;
    this.ownerTyping.next(this.ownerSearchEntity);
  }
  // ownerPO:
  dropListOwnerPO(id: string) {
    this.ownerPOSearchEntity = new GoodsReceiptPORequesterSearchEntity();
    if (id !== null && id.length > 0) {
      this.ownerPOSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListOwnerPO(this.ownerPOSearchEntity);
  }

  typingSearchOwnerPO(event, id) {
    this.ownerPOSearchEntity = new GoodsReceiptPORequesterSearchEntity();
    if (id !== null && id.length > 0) {
      this.ownerPOSearchEntity.ids.push(id);
    }
    this.ownerPOSearchEntity.name.startsWith = event;
    this.ownerPOTyping.next(this.ownerPOSearchEntity);
  }

  // inventoryOrganization:
  dropListInventoryOrganization(id: string) {
    this.inventoryOrganizationSearchEntity = new GoodsReceiptPOInventoryOrganizationSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryOrganizationSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListInvetoryOrganization(this.inventoryOrganizationSearchEntity);
  }

  typingSearchInvetoryOrganization(event: string, id: string) {
    this.inventoryOrganizationSearchEntity = new GoodsReceiptPOInventoryOrganizationSearchEntity();
    if (id !== null && id.length > 0) {
      this.inventoryOrganizationSearchEntity.ids.push(id);
    }
    this.inventoryOrganizationSearchEntity.name.startsWith = event;
    this.inventoryOrganizationTyping.next(this.inventoryOrganizationSearchEntity);
  }

  // supplier:
  dropListSupplier(id: string) {
    this.supplierSearchEntity = new GoodsReceiptPOSupplierSearchEntity();
    if (id !== null && id.length > 0) {
      this.supplierSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListSupplier(this.supplierSearchEntity);
  }

  typingSearchSupplier(event: string, id: string) {
    this.supplierSearchEntity = new GoodsReceiptPOInventoryOrganizationSearchEntity();
    if (id !== null && id.length > 0) {
      this.supplierSearchEntity.ids.push(id);
    }
    this.supplierSearchEntity.code.startsWith = event;
    this.supplierTyping.next(this.supplierSearchEntity);
  }

  chooseSupplier(event: any[]) {
    this.goodsReceiptPOForm.controls.supplierDetailId.setValue(event[0].id);
    this.goodsReceiptPOForm.controls.supplierName.setValue(event[0].name);
  }

  returnSupplier(node) {
    return node;
  }

  // supplierAddress:
  dropListSupplierAddress(id: string) {
    this.supplierAddressSearchEntity = new GoodsReceiptPOSupplierAddressSearchEntity();
    if (id !== null && id.length > 0) {
      this.supplierAddressSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListSupplierAddress(this.supplierAddressSearchEntity);
  }

  typingSearchSupplierAddress(event: string, id: string) {
    this.supplierAddressSearchEntity = new GoodsReceiptPOSupplierAddressSearchEntity();
    if (id !== null && id.length > 0) {
      this.supplierAddressSearchEntity.ids.push(id);
    }
    this.supplierAddressSearchEntity.name.startsWith = event;
    this.supplierAddressTyping.next(this.supplierAddressSearchEntity);
  }
}
