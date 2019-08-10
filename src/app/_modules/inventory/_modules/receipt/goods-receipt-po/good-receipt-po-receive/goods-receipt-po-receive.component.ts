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
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  PurchaseOrdersSearchEntity,
  GoodsReceiptPOItemDetailSearchEntity,
  GoodsReceiptPOUnitOfMeasureSearchEntity,
  GoodsReceiptPOBinlocationSearchEntity,
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
  quantityDetail: GoodsReceiptPOQuantityDetail;
  goodsReceiptPOContentId: string;
  activeScan: boolean;
  serialNumber: string;
  actualReceiveNumber: number;
  serialNumberList: GoodsReceiptPOSerialNumberEntity[];
  batchList: GoodsReceiptPOBatchEntity[];
  binLocationId: string;
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

    const quantityDetailSub = this.goodsReceiptPOService.quantityDetail.subscribe(res => {
      if (res) {
        this.quantityDetail = res;
      }
    });

    const serialNumberListSub = this.goodsReceiptPOService.serialNumberList.subscribe(res => {
      if (res) {
        this.serialNumberList = res;
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
      .add(serialNumberListSub);
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
  showQuantity(goodsReceiptPOContentId: string) {
    this.displayQuantity = true;
    this.goodsReceiptPOContentId = goodsReceiptPOContentId;
    this.getQuantityDetailList(goodsReceiptPOContentId);
  }

  getQuantityDetailList(goodsReceiptPOContentId: string) {
    this.goodsReceiptPOService.getQuantityDetailList(goodsReceiptPOContentId);
  }

  dropListBinLocation(id: string) {
    this.binLocationSearchEntity = new GoodsReceiptPOBinlocationSearchEntity();
    if (id !== null && id.length > 0) {
      this.binLocationSearchEntity.ids.push(id);
    }
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
    if (this.goodsReceiptPOService.validateSubmit([this.quantityDetail])) {
      this.goodsReceiptPOService.updateQuantityDetail(this.quantityDetail);
    };
  }

  addBinLocation() {
    const binLocation = new GoodsReceiptPOQuantity();
    binLocation.goodsReceiptContentId = this.goodsReceiptPOContentId;
    this.quantityDetail.goodsReceiptPOQuantities.push(binLocation);
  }

  deleteBinLocation(index: number) {
    if (index > 0) {
      this.quantityDetail.goodsReceiptPOQuantities.splice(index, 1);
    }
  }

  // serial dialog
  showSerial(goodsReceiptPOContentId: string) {
    this.displaySerial = true;
    this.activeScan = false;
    this.binLocationId = null;
    this.goodsReceiptPOContentId = goodsReceiptPOContentId;
    this.goodsReceiptPOService.getSerialNumberList(goodsReceiptPOContentId);
  }

  changeLocation(event: GoodsReceiptPOBinlocationEntity) {
    this.binLocationId = event.id;
    if (this.serialNumberList) {
      this.serialNumberList.forEach(item => {
        if (item.isSelected) {
          item.binLocationId = event.id;
          item.binLocationCode = event.code;
        }
      });
    }
  }

  deleteSerialNumber(index: number) {
    this.serialNumberList.splice(index, 1);
  }

  checkAllSerialNumber() {
    this.serialNumberList.forEach(item => {
      item.isSelected = true;
    });
  }

  deleteMultipleSerialNumber() {
    const indexArray = [];
    this.serialNumberList.forEach(item => {
      if (item.isSelected) {
        indexArray.push(this.serialNumberList.indexOf(item));
      }
    });
    for (let i = indexArray.reverse().length - 1; i >= 0; i--) {
      this.serialNumberList.splice(indexArray.reverse()[i], 1);
    }
  }

  // batch dialog
  showBatch(goodsReceiptPOContentId: string) {
    this.displayBatch = true;
    this.activeScan = false;
    this.binLocationId = null;
    this.goodsReceiptPOContentId = goodsReceiptPOContentId;
    this.goodsReceiptPOService.getSerialNumberList(goodsReceiptPOContentId);
  }

  changeLocationInBatch(event: GoodsReceiptPOBinlocationEntity) {
    this.binLocationId = event.id;
    if (this.batchList) {
      this.batchList.forEach(item => {
        if (item.isSelected) {
          item.goodsReceiptPOBatchBinLocations.forEach(elm => {
            elm.binLocationId = event.id;
            elm.binLocationCode = event.code;
          })
        }
      });
    }
  }

  deleteBatch(index: number) {
    this.batchList.splice(index, 1);
  }

  checkAllBatch() {
    this.batchList.forEach(item => {
      item.isSelected = true;
    });
  }

  deleteMultipleBatch() {
    const indexArray = [];
    this.batchList.forEach(item => {
      if (item.isSelected) {
        indexArray.push(this.batchList.indexOf(item));
      }
    });
    for (let i = indexArray.reverse().length - 1; i >= 0; i--) {
      this.batchList.splice(indexArray.reverse()[i], 1);
    }
  }
}
