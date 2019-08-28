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
import { GoodsReceiptDetailService } from './goods-receipt-detail.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { GoodsReceiptDetailRepository } from './goods-receipt-detail.repository';
import { InventoryOrganizationOfGoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import {
  InventoryOrganizationOfGoodsReceiptSearch,
  EmployeeDetailOfGoodsReceiptSearch,
} from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.searchentity';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-goods-receipt-detail',
  templateUrl: './goods-receipt-detail.component.html',
  styleUrls: ['./goods-receipt-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [GoodsReceiptDetailService, ConfirmationService],
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
    private confirmationService: ConfirmationService,
    public goodsReceiptService: GoodsReceiptDetailService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    public goodsReceiptRepository: GoodsReceiptDetailRepository) {
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
    this.goodsReceiptForm.get('inventoryOrganizationStreet').setValue(inventoryOrganizationOfGoodsReceipt.address);
  }

  selectOwner(employeeDetailOfGoodsReceipt: EmployeeDetailOfGoodsReceiptSearch) {
    this.goodsReceiptForm.get('ownerId').setValue(employeeDetailOfGoodsReceipt.id);
  }

  send() {
    if (this.goodsReceiptForm.invalid) {
      this.generalService.validateAllFormFields(this.goodsReceiptForm);
    } else {
      this.goodsReceiptService.send(this.goodsReceiptForm.value)
        .then(() => {
          return this.backToList();
        });
    }
  }

  save() {
    if (this.goodsReceiptForm.invalid) {
      this.generalService.validateAllFormFields(this.goodsReceiptForm);
    } else {
      this.goodsReceiptService.save(this.goodsReceiptForm.value)
        .then(() => {
          return this.backToList();
        });
    }
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
    this.goodsReceiptContents.controls[index].get('itemName').setValue(value.name);
    this.goodsReceiptContents.controls[index].get('itemCode').setValue(value.code);
    this.goodsReceiptService.goodsReceiptForm.next(this.goodsReceiptForm);
  }

  selectUnitOfMeasure(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('unitOfMeasureId').setValue(value.id);
    this.goodsReceiptContents.controls[index].get('unitOfMeasureName').setValue(value.name);
    this.goodsReceiptContents.controls[index].get('unitOfMeasureCode').setValue(value.code);
    this.goodsReceiptService.goodsReceiptForm.next(this.goodsReceiptForm);
  }

  inputQuantity(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('quantity').setValue(Number(value));
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  inputUnitPrice(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('unitPrice').setValue(Number(value));
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  selectTax(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('taxId').setValue(value.id);
    this.goodsReceiptContents.controls[index].get('taxName').setValue(value.name);
    this.goodsReceiptContents.controls[index].get('taxRate').setValue(Number(value.rate));
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  inputItemDiscountRate(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('itemDiscountRate').setValue(Number(value));
    const itemDiscountRate = this.goodsReceiptContents.controls[index].get('itemDiscountRate').value;
    const unitPrice = this.goodsReceiptContents.controls[index].get('unitPrice').value;
    const itemDiscountCost = unitPrice * (itemDiscountRate / 100);
    this.goodsReceiptContents.controls[index].get('itemDiscountCost').setValue(Number(itemDiscountCost));
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  inputItemDiscountCost(value: any, index: number) {
    this.goodsReceiptContents.controls[index].get('itemDiscountCost').setValue(Number(value));
    this.goodsReceiptService.recalculateContents(this.goodsReceiptForm);
  }

  inputGeneralDiscount() {
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
