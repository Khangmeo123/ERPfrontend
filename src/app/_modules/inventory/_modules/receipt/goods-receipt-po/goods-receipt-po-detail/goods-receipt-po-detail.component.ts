import {
  GoodsReceiptPOInventoryOrganizationEntity,
  PurchaseOrdersEntity,
  GoodsReceiptPOTaxEntity,
  GoodsReceiptPOItemDetailEntity,
  GoodsReceiptPOUnitOfMeasureEntity,
} from './../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { Subscription, Subject } from 'rxjs';
import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute } from '@angular/router';
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
  GoodsReceiptPOTaxSearchEntity,
  GoodsReceiptPOItemDetailSearchEntity,
  GoodsReceiptPOUnitOfMeasureSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';

@Component({
  selector: 'app-goods-receipt-po-detail',
  templateUrl: './goods-receipt-po-detail.component.html',
  styleUrls: ['./goods-receipt-po-detail.component.scss'],
  providers: [GoodsReceiptPODetailService],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptPODetailComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptPODetail.header.title');
  fileNameList: Array<any> = [];
  displayBatches: boolean = false;
  displaySerial: boolean = false;
  displayAmount: boolean = false;
  displayPurchseOrders: boolean = false;
  goodsReceiptPOSubs: Subscription = new Subscription();
  goodsReceiptPOForm: FormGroup;
  purchaseOrdersList: PurchaseOrdersEntity[];
  purchaseOrdersSearchEntity: PurchaseOrdersSearchEntity = new PurchaseOrdersSearchEntity();
  deletedList: number[] = [];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  supplierDetailId: string;
  goodsReceiptPOId: string;
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
  // tax:
  taxIds: GoodsReceiptPOTaxEntity[];
  taxExceptIds: GoodsReceiptPOTaxEntity[];
  taxSearchEntity: GoodsReceiptPOTaxSearchEntity = new GoodsReceiptPOTaxSearchEntity();
  taxTyping: Subject<GoodsReceiptPOTaxSearchEntity> = new Subject();
  // itemDetail:
  itemDetailIds: GoodsReceiptPOItemDetailEntity[];
  itemDetailExceptIds: GoodsReceiptPOItemDetailEntity[];
  itemDetailSearchEntity: GoodsReceiptPOItemDetailSearchEntity = new GoodsReceiptPOItemDetailSearchEntity();
  itemDetailTyping: Subject<GoodsReceiptPOItemDetailSearchEntity> = new Subject();
  // unitOfMeasure:
  unitOfMeasureIds: GoodsReceiptPOUnitOfMeasureEntity[];
  unitOfMeasureExceptIds: GoodsReceiptPOUnitOfMeasureEntity[];
  unitOfMeasureSearchEntity: GoodsReceiptPOUnitOfMeasureSearchEntity = new GoodsReceiptPOUnitOfMeasureSearchEntity();
  unitOfMeasureTyping: Subject<GoodsReceiptPOUnitOfMeasureSearchEntity> = new Subject();
  // documentNumber:
  documentNumberIds: PurchaseOrdersEntity[];
  documentNumberExceptIds: PurchaseOrdersEntity[];
  documentNumberSearchEntity: PurchaseOrdersSearchEntity = new PurchaseOrdersSearchEntity();
  documentNumberTyping: Subject<PurchaseOrdersSearchEntity> = new Subject();

  constructor(
    private goodsReceiptPOService: GoodsReceiptPODetailService,
    private generalService: GeneralService,
    private bookmarkService: BookmarkService,
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
        if (res.ids.length === 0 && res.exceptIds.length > 0) {
          this.goodsReceiptPOForm.controls.supplierAddress.setValue(res.exceptIds[0].supplierAddress);
          this.goodsReceiptPOForm.controls.supplierContactId.setValue(res.exceptIds[0].id);
        }
        if (res.ids.length === 0 && res.exceptIds.length === 0) {
          this.goodsReceiptPOForm.controls.supplierAddress.setValue(null);
          this.goodsReceiptPOForm.controls.supplierContactId.setValue(null);
        }
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
    // buyer:
    const buyerListSub = this.goodsReceiptPOService.buyerList.subscribe(res => {
      if (res) {
        this.buyerIds = res.ids;
        this.buyerExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchBuyer(this.buyerTyping);
    // invetoryOrganization:
    const inventoryOrganizationSub = this.goodsReceiptPOService.invetoryOrganizationList.subscribe(res => {
      if (res) {
        this.inventoryOrganizationIds = res.ids;
        this.inventoryOrganizationExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchInvetoryOrganization(this.inventoryOrganizationTyping);
    // tax:
    const taxListSub = this.goodsReceiptPOService.taxList.subscribe(res => {
      if (res) {
        this.taxIds = res.ids;
        this.taxExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchTax(this.taxTyping);
    // itemDetail:
    const itemListSub = this.goodsReceiptPOService.itemList.subscribe(res => {
      if (res) {
        this.itemDetailIds = res.ids;
        this.itemDetailExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchItem(this.itemDetailTyping);
    // unitOfMeasure:
    const unitOfMeasureListSub = this.goodsReceiptPOService.unitOfMeasureList.subscribe(res => {
      if (res) {
        this.unitOfMeasureIds = res.ids;
        this.unitOfMeasureExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchUnitOfMeasure(this.unitOfMeasureTyping);
    // documentNumber:
    const documentNumberListSub = this.goodsReceiptPOService.documentNumberList.subscribe(res => {
      if (res) {
        this.documentNumberIds = res.ids;
        this.documentNumberExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchDocumentNumber(this.documentNumberTyping);

    // add subcription:
    this.goodsReceiptPOSubs.add(goodsReceiptFormSub)
      .add(supplierListSub)
      .add(supplierAddressSub)
      .add(ownerSub)
      .add(inventoryOrganizationSub)
      .add(purchaseOrdersListSub)
      .add(ownerPOSub)
      .add(taxListSub)
      .add(unitOfMeasureListSub)
      .add(itemListSub)
      .add(buyerListSub)
      .add(documentNumberListSub);
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

  showBatches() {
    this.displayBatches = true;
  }

  showSerial() {
    this.displaySerial = true;
  }

  showAmount() {
    this.displayAmount = true;
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);
  }

  save() {
    if (!this.goodsReceiptPOForm.valid) {
      this.generalService.validateAllFormFields(this.goodsReceiptPOForm);
    } else {
      this.goodsReceiptPOService.save(this.goodsReceiptPOForm.value).then(res => {
        this.backToList();
      });
    }
  }

  send() {
    if (!this.goodsReceiptPOForm.valid) {
      this.generalService.validateAllFormFields(this.goodsReceiptPOForm);
    } else {
      this.goodsReceiptPOService.send(this.goodsReceiptPOForm.value).then(res => {
        this.backToList();
      });
    }
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
    this.inventoryOrganizationSearchEntity.code.startsWith = event;
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
    this.supplierDetailId = event[0].id;
    this.goodsReceiptPOService.chooseSupplier(event);
    this.supplierAddressSearchEntity = new GoodsReceiptPOSupplierAddressSearchEntity();
    this.supplierAddressSearchEntity.supplierDetailId = this.supplierDetailId;
    this.goodsReceiptPOService.dropListSupplierAddress(this.supplierAddressSearchEntity);
  }

  returnSupplier(node) {
    return node;
  }

  // supplierAddress:
  dropListSupplierAddress(id: string) {
    this.supplierAddressSearchEntity = new GoodsReceiptPOSupplierAddressSearchEntity();
    this.supplierAddressSearchEntity.supplierDetailId = this.supplierDetailId;
    if (id !== null && id.length > 0) {
      this.supplierAddressSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListSupplierAddress(this.supplierAddressSearchEntity);
  }

  typingSearchSupplierAddress(event: string, id: string) {
    this.supplierAddressSearchEntity = new GoodsReceiptPOSupplierAddressSearchEntity();
    this.supplierAddressSearchEntity.supplierDetailId = this.supplierDetailId;
    if (id !== null && id.length > 0) {
      this.supplierAddressSearchEntity.ids.push(id);
    }
    this.supplierAddressSearchEntity.supplierAddress.startsWith = event;
    this.supplierAddressTyping.next(this.supplierAddressSearchEntity);
  }

  // item:
  dropListItemDetail(id: string) {
    this.itemDetailSearchEntity = new GoodsReceiptPOItemDetailSearchEntity();
    if (id !== null && id.length > 0) {
      this.itemDetailSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListItem(this.itemDetailSearchEntity);
  }

  typingSearchItemDetail(event: string, id: string) {
    this.itemDetailSearchEntity = new GoodsReceiptPOItemDetailSearchEntity();
    if (id !== null && id.length > 0) {
      this.itemDetailSearchEntity.ids.push(id);
    }
    this.itemDetailSearchEntity.name.startsWith = event;
    this.itemDetailTyping.next(this.itemDetailSearchEntity);
  }

  // tax:
  dropListTax(id: string) {
    this.taxSearchEntity = new GoodsReceiptPOTaxSearchEntity();
    if (id !== null && id.length > 0) {
      this.taxSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListTax(this.taxSearchEntity);
  }

  typingSearchTax(event: string, id: string) {
    this.taxSearchEntity = new GoodsReceiptPOTaxSearchEntity();
    if (id !== null && id.length > 0) {
      this.taxSearchEntity.ids.push(id);
    }
    this.taxSearchEntity.name.startsWith = event;
    this.taxTyping.next(this.taxSearchEntity);
  }

  // unitOfMeasure:
  dropListUnitOfMeasure(id: string) {
    this.unitOfMeasureSearchEntity = new GoodsReceiptPOUnitOfMeasureSearchEntity();
    if (id !== null && id.length > 0) {
      this.unitOfMeasureSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListUnitOfMeasure(this.unitOfMeasureSearchEntity);
  }

  typingSearchUnitOfMeasure(event: string, id: string) {
    this.unitOfMeasureSearchEntity = new GoodsReceiptPOUnitOfMeasureSearchEntity();
    if (id !== null && id.length > 0) {
      this.unitOfMeasureSearchEntity.ids.push(id);
    }
    this.unitOfMeasureSearchEntity.name.startsWith = event;
    this.unitOfMeasureTyping.next(this.unitOfMeasureSearchEntity);
  }

  // documentNumber:
  dropListDocumentNumber(id: string) {
    this.documentNumberSearchEntity = new PurchaseOrdersSearchEntity();
    if (id !== null && id.length > 0) {
      this.documentNumberSearchEntity.ids.push(id);
    }
    this.goodsReceiptPOService.dropListDocumentNumber(this.documentNumberSearchEntity);
  }

  typingSearchDocumentNumber(event: number, id: string) {
    this.documentNumberSearchEntity = new PurchaseOrdersSearchEntity();
    if (id !== null && id.length > 0) {
      this.documentNumberSearchEntity.ids.push(id);
    }
    this.documentNumberSearchEntity.documentNumber.equal = event;
    this.documentNumberTyping.next(this.documentNumberSearchEntity);
  }

  // goodsReceiptPO content:
  addDeletedList(indexNumber: number) {
    if (this.deletedList.length > 0 && this.deletedList.includes(indexNumber)) {
      this.deletedList.splice(this.deletedList.indexOf(indexNumber), 1);
    } else {
      this.deletedList.push(indexNumber);
    }
  }

  deleteItem() {
    this.goodsReceiptPOService.deleteItemFromContent(this.deletedList);
  }

  recalculateContents() {
    this.goodsReceiptPOService.recalculateContents(this.goodsReceiptPOForm);
  }

  returnDocumentNumber(node) {
    return node;
  }

  clearSearch(tableGoodsReceiptPOContents) {
    this.documentNumberSearchEntity = new PurchaseOrdersSearchEntity();
    this.itemDetailSearchEntity = new GoodsReceiptPOItemDetailSearchEntity();
    this.unitOfMeasureSearchEntity = new GoodsReceiptPOUnitOfMeasureSearchEntity();
    this.taxSearchEntity = new GoodsReceiptPOTaxSearchEntity();
    tableGoodsReceiptPOContents.reset();
  }

  // purchase order dialog:
  showPurchaseOrders() {
    this.purchaseOrdersSearchEntity = new PurchaseOrdersSearchEntity();
    this.purchaseOrdersSearchEntity.supplierDetailId = this.goodsReceiptPOForm.controls.supplierDetailId.value;
    this.goodsReceiptPOService.getPurchaseOrdersList(this.purchaseOrdersSearchEntity);
    this.displayPurchseOrders = true;
  }

  sortDatePurchaseOrders(event: string, tablePurchaseOrders: any) {
    const date = event.replace(/\//g, '-') + 'T00:00:00';
    tablePurchaseOrders.filter(date, 'documentDate', 'equals');
  }

  selectedAllPurchaseOrders(event: any) {
    this.purchaseOrdersList.forEach(item => {
      item.isSelected = true;
    });
  }

  combineGoodsReceiptPO() {
    const goodsReceiptPOValue = this.goodsReceiptPOForm.value;
    const arrayIds = [];
    this.purchaseOrdersList.forEach(item => {
      if (item.isSelected) {
        arrayIds.push(item.id);
      }
    });
    goodsReceiptPOValue.purchaseOrderIds = [...arrayIds];
    this.goodsReceiptPOService.combineGoodsReceiptPO(goodsReceiptPOValue);
    this.displayPurchseOrders = false;
  }
}
