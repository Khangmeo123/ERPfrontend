import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GoodsReceiptPoDetailService } from './goods-receipt-po-detail.service';
import {
  PurchaseOrderEntity,
  RequesterEntity,
  SupplierAddressEntity,
  SupplierEntity,
  TaxEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  InventoryOrganizationSearchEntity,
  PurchaseOrderSearchEntity,
  RequesterSearchEntity,
  SupplierAddressSearchEntity,
  TaxSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { SupplierSearchEntity } from '../../../../../master-data/_backend/supplier/supplier.searchentity';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';

@Component({
  selector: 'app-goods-receipt-po-detail',
  templateUrl: './goods-receipt-po-detail.component.html',
  styleUrls: ['./goods-receipt-po-detail.component.scss'],
  providers: [
    GoodsReceiptPoDetailService,
  ],
})
export class GoodsReceiptPoDetailComponent implements OnInit, OnDestroy {

  goodsReceiptPOForm: FormGroup;

  goodsReceiptPOId: string = null;

  displayPurchaseOrders: boolean = false;

  fileNameList: any[] = [];

  deletedList: number[] = [];

  purchaseOrdersList: PurchaseOrderEntity[] = [];

  purchaseOrderSearchEntity: PurchaseOrderSearchEntity = new PurchaseOrderSearchEntity();

  taxList: TaxEntity[] = [];

  taxSearchEntity: TaxSearchEntity = new TaxSearchEntity();

  buyerList: RequesterEntity[] = [];

  buyerSearchEntity: RequesterSearchEntity = new RequesterSearchEntity();

  ownerList: RequesterEntity[] = [];

  ownerSearchEntity: RequesterSearchEntity = new RequesterSearchEntity();

  supplierList: SupplierEntity[] = [];

  supplierSearchEntity: SupplierSearchEntity = new SupplierSearchEntity();

  supplierAddressList: SupplierAddressEntity[] = [];

  supplierAddressSearchEntity: SupplierAddressSearchEntity = new SupplierAddressSearchEntity();

  inventoryOrganizationList: InventoryOrganizationEntity[] = [];

  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();

  public subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private goodsReceiptPoDetailService: GoodsReceiptPoDetailService,
    private activatedRoute: ActivatedRoute,
  ) {
    const activatedRouteSubscription: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.goodsReceiptPOId) {
        this.goodsReceiptPOId = params.goodsReceiptPOId;
      }
    });

    const formSubscription: Subscription = this.goodsReceiptPoDetailService.goodsReceiptPOForm.subscribe((form: FormGroup) => {
      this.goodsReceiptPOForm = form;
    });

    const taxSubscription: Subscription = this.goodsReceiptPoDetailService.taxList.subscribe((list: TaxEntity[]) => {
      this.taxList = list;
    });

    const ownerListSubscription: Subscription = this.goodsReceiptPoDetailService.ownerList.subscribe((list: RequesterEntity[]) => {
      this.ownerList = list;
    });

    const buyerSubscription: Subscription = this.goodsReceiptPoDetailService.buyerList.subscribe((list: RequesterEntity[]) => {
      this.buyerList = list;
    });

    const supplierSubscription: Subscription = this.goodsReceiptPoDetailService.supplierList.subscribe((list: SupplierEntity[]) => {
      this.supplierList = list;
    });

    const supplierAddressSubscription: Subscription = this.goodsReceiptPoDetailService.supplierAddressList
      .subscribe((list: SupplierAddressEntity[]) => {
        this.supplierAddressList = list;
      });

    this.subscription
      .add(activatedRouteSubscription)
      .add(taxSubscription)
      .add(supplierSubscription)
      .add(supplierAddressSubscription)
      .add(formSubscription)
      .add(ownerListSubscription)
      .add(buyerSubscription);
  }

  get errors(): FormGroup {
    return this.goodsReceiptPOForm.get('errors') as FormGroup;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  backToList() {
    return this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);
  }

  send() {
  }

  save() {
  }

  public combineGoodsReceiptPO() {
    const goodsReceiptPOValue = this.goodsReceiptPOForm.value;
    const arrayIds = [];
    this.purchaseOrdersList.forEach(item => {
      if (item.isSelected) {
        arrayIds.push(item.id);
      }
    });
    goodsReceiptPOValue.purchaseOrderIds = [...arrayIds];
    this.goodsReceiptPoDetailService.combineGoodsReceiptPO(goodsReceiptPOValue);
    this.displayPurchaseOrders = false;
  }

  onClearSearch(event) {

  }

  deactivate() {

  }

  deleteItem() {

  }

  showPurchaseOrders() {

  }

  recalculateContents() {
    this.goodsReceiptPoDetailService.recalculateContents(this.goodsReceiptPOForm);
  }

  sortDatePurchaseOrders(event, tablePurchaseOrders: any) {
    const date = event.replace(/\//g, '-') + 'T00:00:00';
    tablePurchaseOrders.filter(date, 'documentDate', 'equals');
  }

  selectAllPurchaseOrders(event) {
    this.purchaseOrdersList.forEach(item => {
      item.isSelected = event.target.checked;
    });
  }

  readURL(event) {

  }

  trackByFn(index) {
    return index;
  }

  // goodsReceiptPO content:
  addDeletedList(indexNumber: number) {
    if (this.deletedList.length > 0 && this.deletedList.includes(indexNumber)) {
      this.deletedList.splice(this.deletedList.indexOf(indexNumber), 1);
    } else {
      this.deletedList.push(indexNumber);
    }
  }
}
