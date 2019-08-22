import { UnitOfMeasureOfGoodsReceiptSearch } from './../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import {
  GoodsReceiptContentSearch,
  PurchaseOrderOfGoodsReceiptSearch,
  TaxOfGoodsReceiptSearch,
} from './../../../../_backend/goods-receipt/goods-receipt.searchentity';
import { FormGroup, FormArray } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { GoodsReceiptDetailService } from './goods-receipt-detail.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { GoodsReceiptDetailRepository } from './goods-receipt-detail.repository';
import { InventoryOrganizationOfGoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import {
  InventoryOrganizationOfGoodsReceiptSearch,
  EmployeeDetailOfGoodsReceiptSearch,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';

@Component({
  selector: 'app-goods-receipt-detail',
  templateUrl: './goods-receipt-detail.component.html',
  styleUrls: ['./goods-receipt-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptDetailComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptDetail.header.title');
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

  get goodsReceiptContents() {
    return this.goodsReceiptForm.get('goodsReceiptContents') as FormArray;
  }
  constructor(
    private router: Router,
    private goodsReceiptService: GoodsReceiptDetailService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private goodsReceiptRepository: GoodsReceiptDetailRepository) {
    const activatedRouteSubscription: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.goodsReceiptId = params.id;
        this.goodsReceiptService.getDetail(params.id)
          .then(() => { });
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
  readURL(event: any) {
    for (const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt/goods-receipt-list']);
  }

  selectInventoryOrganization(inventoryOrganizationOfGoodsReceipt: InventoryOrganizationOfGoodsReceipt) {
    this.goodsReceiptForm.get('inventoryOrganizationId').setValue(inventoryOrganizationOfGoodsReceipt.id);
    this.goodsReceiptForm.get('inventoryOrganizationStreet').setValue(inventoryOrganizationOfGoodsReceipt.street);
  }

  selectOwner(employeeDetailOfGoodsReceipt: EmployeeDetailOfGoodsReceiptSearch) {
    this.goodsReceiptForm.get('ownerId').setValue(employeeDetailOfGoodsReceipt.id);
  }

}
