import { GoodsReceiptReceiveRepository } from './goods-receipt-receive.repository';
import {
  GoodsReceiptContentSearch,
  PurchaseOrderOfGoodsReceiptSearch,
  TaxOfGoodsReceiptSearch,
  UnitOfMeasureOfGoodsReceiptSearch,
} from './../../../../_backend/goods-receipt/goods-receipt.searchentity';
import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/_services/general-service.service';
import {
  InventoryOrganizationOfGoodsReceiptSearch,
  EmployeeDetailOfGoodsReceiptSearch,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';
import { ConfirmationService } from 'primeng/api';
import { GoodsReceiptReceiveService } from './goods-receipt-receive.service';

@Component({
  selector: 'app-goods-receipt-receive',
  templateUrl: './goods-receipt-receive.component.html',
  styleUrls: ['./goods-receipt-receive.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [GoodsReceiptReceiveService, ConfirmationService],
})
export class GoodsReceiptReceiveComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptReceive.header.title');
  fileNameList: Array<any> = [];
  goodsReceiptId: string;
  goodsReceiptForm: FormGroup;
  goodsReceiptSubs: Subscription = new Subscription();
  goodsReceiptContentSearch: GoodsReceiptContentSearch = new GoodsReceiptContentSearch();
  inventoryOrganizationOfGoodsReceiptSearch: InventoryOrganizationOfGoodsReceiptSearch = new InventoryOrganizationOfGoodsReceiptSearch();
  ownerSearch: EmployeeDetailOfGoodsReceiptSearch = new EmployeeDetailOfGoodsReceiptSearch();
  purchaseOrderSearch: PurchaseOrderOfGoodsReceiptSearch = new PurchaseOrderOfGoodsReceiptSearch();
  unitOfMeasureSearch: UnitOfMeasureOfGoodsReceiptSearch = new UnitOfMeasureOfGoodsReceiptSearch();
  taxSearch: TaxOfGoodsReceiptSearch = new TaxOfGoodsReceiptSearch();
  displayBatch: boolean = false;
  displaySerialNumber: boolean = false;
  displayQuantity: boolean = false;
  enableBinLocation: boolean = false;
  goodsReceiptContentId: string;
  quantityItems: any[] = [];
  inventoryOrganizationId: string;

  get goodsReceiptContents() {
    return this.goodsReceiptForm.get('goodsReceiptContents') as FormArray;
  }
  constructor(
    private router: Router,
    private confirmationService: ConfirmationService,
    private goodsReceiptService: GoodsReceiptReceiveService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private goodsReceiptRepository: GoodsReceiptReceiveRepository) {
    const activatedRouteSubscription: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.goodsReceiptId = params.id;
        this.goodsReceiptService.getDetail(params.id)
          .then((res) => {
            this.enableBinLocation = res.enableBinLocation;
            this.inventoryOrganizationId = res.inventoryOrganizationId;
          });
      }
    });
    const goodsReceiptFormSub = this.goodsReceiptService.goodsReceiptForm.subscribe(res => {
      this.goodsReceiptForm = res;
    });

    this.goodsReceiptSubs.add(activatedRouteSubscription)
      .add(goodsReceiptFormSub);
  }

  ngOnInit() {

  }

  ngOnDestroy() {

  }

  // general:
  approve() {
    this.goodsReceiptService.approve(this.goodsReceiptForm.value)
      .then(() => {
        return this.backToList();
      });
  }

  reject() {
    this.goodsReceiptService.reject(this.goodsReceiptForm.value)
      .then(() => {
        return this.backToList();
      });
  }

  readURL(event: any) {
    for (const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt/goods-receipt-list']);
  }

  openQuantityDialog(goodsReceiptContentId: string) {
    this.displayQuantity = true;
    this.goodsReceiptContentId = goodsReceiptContentId;
  }

  cancelQuantity(event) {
    this.displayQuantity = event;
    this.goodsReceiptService.getDetail(this.goodsReceiptId);
  }

  openBatchDialog(goodsReceiptContentId: string) {
    this.displayBatch = true;
    this.goodsReceiptContentId = goodsReceiptContentId;
  }

  cancelBatch(event) {
    this.displayBatch = event;
    this.goodsReceiptService.getDetail(this.goodsReceiptId);
  }

  openSerialNumberDialog(goodsReceiptContentId: string) {
    this.displaySerialNumber = true;
    this.goodsReceiptContentId = goodsReceiptContentId;
  }

  cancelSerialNumber(event) {
    this.displaySerialNumber = event;
    this.goodsReceiptService.getDetail(this.goodsReceiptId);
  }
}
