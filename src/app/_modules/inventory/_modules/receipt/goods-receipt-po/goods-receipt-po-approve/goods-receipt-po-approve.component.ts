import { Subscription, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { GoodsReceiptPOApproveService } from './goods-receipt-po-approve.service';
import {
  PurchaseOrdersEntity,
  GoodsReceiptPOItemDetailEntity,
  GoodsReceiptPOUnitOfMeasureEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  PurchaseOrdersSearchEntity,
  GoodsReceiptPOItemDetailSearchEntity,
  GoodsReceiptPOUnitOfMeasureSearchEntity,
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
    // add subcription:
    this.goodsReceiptPOSubs
      .add(goodsReceiptFormSub)
      .add(documentNumberListSub)
      .add(itemListSub)
      .add(unitOfMeasureListSub);
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
}
