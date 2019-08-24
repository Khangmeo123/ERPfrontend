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
import { InventoryOrganizationOfGoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
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

  // modify goodsReceiptContent:
  addNewGoodsReceiptContent() {
    this.goodsReceiptService.addNewGoodsReceiptContent(this.goodsReceiptForm);
  }

  selectGoodsReceipt(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('isSelected').setValue(value.checked);
  }

  selectItemDetail(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('itemDetailId').setValue(value.id);
    this.goodsReceiptContents.controls[index].get('itemDetailName').setValue(value.name);
    this.goodsReceiptContents.controls[index].get('itemDetailName').setValue(value.code);
  }

  selectUnitOfMeasure(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('unitOfMeasureId').setValue(value.id);
    this.goodsReceiptContents.controls[index].get('unitOfMeasureName').setValue(value.name);
  }

  inputQuantity(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('quantity').setValue(value);
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  inputUnitPrice(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('unitPrice').setValue(value);
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  selectTax(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('taxId').setValue(value.id);
    this.goodsReceiptContents.controls[index].get('taxName').setValue(value.name);
    this.goodsReceiptContents.controls[index].get('taxCost').setValue(value.cost);
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  inputItemDiscountRate(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('itemDiscountRate').setValue(value);
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  inputItemDiscountCost(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('itemDiscountCost').setValue(value);
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  checkAllGoodsReceipt(event: any) {
    this.goodsReceiptService.checkAllGoodsReceiptContents(this.goodsReceiptForm, event.checked);
  }

  deleteMultiple() {
    this.confirmationService.confirm({
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.goodsReceiptService.deleteGoodsReceiptContent(this.goodsReceiptForm);
      },
    });
  }
}
