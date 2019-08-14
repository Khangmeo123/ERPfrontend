import { Subscription, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { GoodsReceiptPOReceiveService } from './goods-receipt-po-receive.service';
import {
  PurchaseOrdersEntity,
  GoodsReceiptPOItemDetailEntity,
  GoodsReceiptPOUnitOfMeasureEntity,
  GoodsReceiptPOBinlocationEntity,
  GoodsReceiptPOQuantityDetail,
  GoodsReceiptPOQuantity,
  GoodsReceiptPOSerialNumberEntity,
  GoodsReceiptPOBatchEntity,
  GoodsReceiptPOContent,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  PurchaseOrdersSearchEntity,
  GoodsReceiptPOItemDetailSearchEntity,
  GoodsReceiptPOUnitOfMeasureSearchEntity,
  GoodsReceiptPOBinlocationSearchEntity,
  GoodsReceiptPOContentDetailSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';

@Component({
  selector: 'app-goods-receipt-po-receive',
  templateUrl: './goods-receipt-po-receive.component.html',
  styleUrls: ['./goods-receipt-po-receive.component.scss'],
  providers: [GoodsReceiptPOReceiveService],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptPOReceiveComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptPODetail.header.title');
  fileNameList: Array<any> = [];
  displayBatch: boolean = false;
  displaySerial: boolean = false;
  displayQuantity: boolean = false;
  displayPurchseOrders: boolean = false;
  goodsReceiptPOSubs: Subscription = new Subscription();
  goodsReceiptPOForm: FormGroup;
  deletedList: number[] = [];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  supplierDetailId: string;
  goodsReceiptPOId: string;
  enableBinLocation: boolean;
  quantityDetail: GoodsReceiptPOContent;
  goodsReceiptPOContentId: string;
  activeScan: boolean;
  serialNumber: string;
  actualReceiveNumber: number;
  serialNumberDetail: GoodsReceiptPOContent;
  batch: GoodsReceiptPOContent;
  binLocationId: string;
  itemQuantities: number;
  itemDetailId: string;
  goodsReceiptPOContentDetailSearchEntity: GoodsReceiptPOContentDetailSearchEntity = new GoodsReceiptPOContentDetailSearchEntity();
  // documentNumber:
  documentNumberIds: PurchaseOrdersEntity[];
  documentNumberExceptIds: PurchaseOrdersEntity[];
  documentNumberSearchEntity: PurchaseOrdersSearchEntity = new PurchaseOrdersSearchEntity();
  documentNumberTyping: Subject<PurchaseOrdersSearchEntity> = new Subject();
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
  // binLocation:
  binLocationIds: GoodsReceiptPOBinlocationEntity[];
  binLocationExceptIds: GoodsReceiptPOBinlocationEntity[];
  binLocationSearchEntity: GoodsReceiptPOBinlocationSearchEntity = new GoodsReceiptPOBinlocationSearchEntity();
  binLocationTyping: Subject<GoodsReceiptPOBinlocationSearchEntity> = new Subject();

  constructor(
    private goodsReceiptPOService: GoodsReceiptPOReceiveService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router) {
    this.displayBatch = true;
    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.goodsReceiptPOId = params.id;
        }
        this.goodsReceiptPOService.getDetail(params.id).then(res => {
          this.supplierDetailId = this.goodsReceiptPOForm.controls.supplierDetailId.value;
          this.enableBinLocation = this.goodsReceiptPOForm.controls.enableBinLocation.value;
        });
      });

    const goodsReceiptFormSub = this.goodsReceiptPOService.goodsReceiptPOForm.subscribe(res => {
      if (res) {
        this.goodsReceiptPOForm = res;
      }
    });

    const quantityDetailSub = this.goodsReceiptPOService.quantityDetail.subscribe(res => {
      if (res) {
        this.quantityDetail = res;
      }
    });

    const serialNumberDetailSub = this.goodsReceiptPOService.serialNumber.subscribe(res => {
      if (res) {
        this.serialNumberDetail = res;
      }
    });

    const batchSub = this.goodsReceiptPOService.batch.subscribe(res => {
      if (res) {
        this.batch = res;
      }
    });

    // documentNumber:
    const documentNumberListSub = this.goodsReceiptPOService.documentNumberList.subscribe(res => {
      if (res) {
        this.documentNumberIds = res.ids;
        this.documentNumberExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchDocumentNumber(this.documentNumberTyping);
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
    // binLocation:
    const binLocationListSub = this.goodsReceiptPOService.binLocationList.subscribe(res => {
      if (res) {
        this.binLocationIds = res.ids;
        this.binLocationExceptIds = res.exceptIds;
      }
    });
    this.goodsReceiptPOService.typingSearchBinLocation(this.binLocationTyping);
    // add subcription:
    this.goodsReceiptPOSubs
      .add(goodsReceiptFormSub)
      .add(documentNumberListSub)
      .add(itemListSub)
      .add(unitOfMeasureListSub)
      .add(binLocationListSub)
      .add(quantityDetailSub)
      .add(serialNumberDetailSub)
      .add(batchSub);
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

  returnNode(node) {
    return node;
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);
  }

  rejectReceive() {
    this.goodsReceiptPOService.rejectReceive(this.goodsReceiptPOId).then(res => {
      this.backToList();
    });
  }

  receive() {
    this.goodsReceiptPOService.receive(this.goodsReceiptPOId).then(res => {
      this.backToList();
    });
  }

  sortDate(event: string, table: any, field: string) {
    const date = event.replace(/\//g, '-') + 'T00:00:00';
    table.filter(date, field, 'equals');
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
  // itemDetail:
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

  // quantity dialog:
  showQuantity(goodsReceiptPOContent: GoodsReceiptPOContent) {
    this.displayQuantity = true;
    this.itemQuantities = goodsReceiptPOContent.quantity;
    this.goodsReceiptPOContentId = goodsReceiptPOContent.id;
    this.goodsReceiptPOContentDetailSearchEntity = new GoodsReceiptPOContentDetailSearchEntity();
    this.goodsReceiptPOService.getQuantityDetail(this.goodsReceiptPOContentId, this.enableBinLocation);
  }

  dropListBinLocation(id: string) {
    this.binLocationSearchEntity = new GoodsReceiptPOBinlocationSearchEntity();
    if (id !== null && id.length > 0) {
      this.binLocationSearchEntity.ids.push(id);
    }
    this.binLocationSearchEntity.goodsReceiptPOContentId = this.goodsReceiptPOContentId;
    this.goodsReceiptPOService.dropListBinLocation(this.binLocationSearchEntity);
  }

  typingSearchBinLocation(event: string, id: string) {
    this.binLocationSearchEntity = new GoodsReceiptPOBinlocationSearchEntity();
    if (id !== null && id.length > 0) {
      this.binLocationSearchEntity.ids.push(id);
    }
    this.binLocationSearchEntity.code.startsWith = event;
    this.binLocationTyping.next(this.binLocationSearchEntity);
  }

  updateQuantityDetail() {
    this.goodsReceiptPOService.updateQuantityDetail(this.quantityDetail).then(res => {
      this.displayQuantity = false;
    });
  }

  addBinLocationQuantity() {
    this.goodsReceiptPOService.addBinLocationQuantity(this.goodsReceiptPOContentId);
  }

  deleteBinLocationQuantity(index: number) {
    this.goodsReceiptPOService.deleteBinLocationQuantity(index);
  }

  recalculateQuantityDetail() {
    this.goodsReceiptPOService.recalculateQuantityDetail(this.quantityDetail);
  }

  // serial dialog
  showSerial(goodsReceiptPOContent: GoodsReceiptPOContent) {
    this.displaySerial = true;
    this.activeScan = false;
    this.binLocationId = null;
    this.goodsReceiptPOContentId = goodsReceiptPOContent.id;
    this.itemQuantities = goodsReceiptPOContent.quantity;
    this.itemDetailId = goodsReceiptPOContent.itemDetailId;
    this.goodsReceiptPOService.getSerialNumber(goodsReceiptPOContent.id);
  }

  changeLocationSerialNumber(goodsReceiptPOBinlocationEntity: GoodsReceiptPOBinlocationEntity) {
    this.binLocationId = goodsReceiptPOBinlocationEntity.id;
    this.goodsReceiptPOService.changeLocationSerialNumber(goodsReceiptPOBinlocationEntity);
  }

  updateSerialNumber() {
    this.goodsReceiptPOService.updateSerialNumber(this.serialNumberDetail).then(res => {
      this.displaySerial = false;
    });
  }

  deleteSerialNumber(index: number) {
    this.goodsReceiptPOService.deleteSerialNumber(index);
  }

  checkAllSerialNumber(target: any) {
    this.goodsReceiptPOService.checkAllSerialNumber(target.checked);
  }

  deleteMultipleSerialNumber() {
    this.goodsReceiptPOService.deleteMultipleSerialNumber();
  }

  inputSerialNumber(event) {
    this.goodsReceiptPOService.analyzeQRCode(this.itemDetailId, event);
    this.serialNumber = null;
  }

  clearSerialNumberTable(table) {
    this.goodsReceiptPOContentDetailSearchEntity = new GoodsReceiptPOContentDetailSearchEntity();
    table.reset();
  }

  // batch dialog
  showBatch(goodsReceiptPOContentId: string) {
    this.displayBatch = true;
    this.activeScan = false;
    this.binLocationId = null;
    this.goodsReceiptPOContentId = goodsReceiptPOContentId;
    this.goodsReceiptPOService.getBatch(goodsReceiptPOContentId);
  }

  changeLocationInBatch(goodsReceiptPOBinlocationEntity: GoodsReceiptPOBinlocationEntity) {
    this.binLocationId = goodsReceiptPOBinlocationEntity.id;
    this.goodsReceiptPOService.changeLocationBatch(goodsReceiptPOBinlocationEntity);
  }

  addBinLocationBatch(indexRow: number) {
    this.goodsReceiptPOService.addBinLocationBatch(indexRow, this.goodsReceiptPOContentId);
  }

  deleteBinLocationBatch(indexRow: number, index: number) {
    this.goodsReceiptPOService.deleteBinLocationBatch(indexRow, index);
  }

  checkAllBatch(target: any) {
    this.goodsReceiptPOService.checkAllBatch(target.checked);
  }

  deleteMultipleBatch() {
    this.goodsReceiptPOService.deleteMultipleBatch();
  }

  updateBatch() {
    this.goodsReceiptPOService.updateBatch(this.batch).then(res => {
      this.displayBatch = false;
    });
  }
}
