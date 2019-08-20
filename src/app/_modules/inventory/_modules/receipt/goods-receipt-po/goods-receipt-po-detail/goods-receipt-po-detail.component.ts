import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GoodsReceiptPoDetailService } from './goods-receipt-po-detail.service';
import {
  EmployeeDetailEntity,
  ItemDetailEntity,
  PurchaseOrderEntity,
  SupplierContactEntity,
  SupplierEntity,
  TaxEntity,
  UnitOfMeasureEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  EmpoloyeeDetailSearchEntity,
  InventoryOrganizationSearchEntity,
  ItemDetailSearchEntity,
  PurchaseOrderSearchEntity,
  SupplierContactSearchEntity,
  TaxSearchEntity,
  UnitOfMeasureSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { SupplierSearchEntity } from '../../../../../master-data/_backend/supplier/supplier.searchentity';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';
import { GeneralService } from '../../../../../../_services/general-service.service';

@Component({
  selector: 'app-goods-receipt-po-detail',
  templateUrl: './goods-receipt-po-detail.component.html',
  styleUrls: ['./goods-receipt-po-detail.component.scss'],
  providers: [
    GoodsReceiptPoDetailService,
    GeneralService,
  ],
})
export class GoodsReceiptPoDetailComponent implements OnInit, OnDestroy {

  goodsReceiptPOForm: FormGroup;

  goodsReceiptPOId: string = null;

  displayPurchaseOrders: boolean = false;

  filenameList: string[] = [];

  deletedList: number[] = [];

  purchaseOrdersList: PurchaseOrderEntity[] = [];

  purchaseOrderSearchEntity: PurchaseOrderSearchEntity = new PurchaseOrderSearchEntity();

  taxList: TaxEntity[] = [];

  taxSearchEntity: TaxSearchEntity = new TaxSearchEntity();

  requesterList: EmployeeDetailEntity[] = [];

  requesterSearchEntity: EmpoloyeeDetailSearchEntity = new EmpoloyeeDetailSearchEntity();

  buyerList: EmployeeDetailEntity[] = [];

  buyerSearchEntity: EmpoloyeeDetailSearchEntity = new EmpoloyeeDetailSearchEntity();

  ownerList: EmployeeDetailEntity[] = [];

  ownerSearchEntity: EmpoloyeeDetailSearchEntity = new EmpoloyeeDetailSearchEntity();

  supplierList: SupplierEntity[] = [];

  supplierSearchEntity: SupplierSearchEntity = new SupplierSearchEntity();

  supplierContactList: SupplierContactEntity[] = [];

  supplierContactSearchEntity: SupplierContactSearchEntity = new SupplierContactSearchEntity();

  inventoryOrganizationList: InventoryOrganizationEntity[] = [];

  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();

  unitOfMeasureList: UnitOfMeasureEntity[] = [];

  unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity = new UnitOfMeasureSearchEntity();

  itemDetailList: ItemDetailEntity[] = [];

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  public subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private goodsReceiptPoDetailService: GoodsReceiptPoDetailService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
  ) {
    const activatedRouteSubscription: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.goodsReceiptPOId) {
        this.goodsReceiptPOId = params.goodsReceiptPOId;
        this.goodsReceiptPoDetailService.getDetail(params.goodsReceiptPOId);
      }
    });

    const formSubscription: Subscription = this.goodsReceiptPoDetailService.goodsReceiptPOForm.subscribe((form: FormGroup) => {
      this.goodsReceiptPOForm = form;
    });

    const taxSubscription: Subscription = this.goodsReceiptPoDetailService.taxList.subscribe((list: TaxEntity[]) => {
      this.taxList = list;
    });

    const ownerListSubscription: Subscription = this.goodsReceiptPoDetailService.ownerList.subscribe((list: EmployeeDetailEntity[]) => {
      this.ownerList = list;
    });

    const taxListSubscription: Subscription = this.goodsReceiptPoDetailService.ownerList.subscribe((list: TaxEntity[]) => {
      this.taxList = list;
    });

    const requesterListSubscription: Subscription = this.goodsReceiptPoDetailService.requesterList
      .subscribe((list: EmployeeDetailEntity[]) => {
        this.requesterList = list;
      });

    const buyerSubscription: Subscription = this.goodsReceiptPoDetailService.buyerList.subscribe((list: EmployeeDetailEntity[]) => {
      this.buyerList = list;
    });

    const supplierSubscription: Subscription = this.goodsReceiptPoDetailService.supplierList.subscribe((list: SupplierEntity[]) => {
      this.supplierList = list;
    });

    const purchaseOrdersSubscription: Subscription = this.goodsReceiptPoDetailService.purchaseOrderList
      .subscribe((list: PurchaseOrderEntity[]) => {
        this.purchaseOrdersList = list;
      });

    const inventoryOrganizationSubscription: Subscription = this.goodsReceiptPoDetailService.inventoryOrganizationList
      .subscribe((list: InventoryOrganizationEntity[]) => {
        this.inventoryOrganizationList = list;
      });

    const supplierContactSubscription: Subscription = this.goodsReceiptPoDetailService.supplierContactList
      .subscribe((list: SupplierContactEntity[]) => {
        this.supplierContactList = list;
      });

    this.subscription
      .add(activatedRouteSubscription)
      .add(taxSubscription)
      .add(supplierSubscription)
      .add(supplierContactSubscription)
      .add(formSubscription)
      .add(ownerListSubscription)
      .add(buyerSubscription)
      .add(purchaseOrdersSubscription)
      .add(inventoryOrganizationSubscription)
      .add(requesterListSubscription)
      .add(taxListSubscription);
  }

  get errors(): FormGroup {
    return this.goodsReceiptPOForm.get('errors') as FormGroup;
  }

  get supplierDetailId() {
    return this.goodsReceiptPOForm.get('supplierDetailId') as FormControl;
  }

  get supplierCode() {
    return this.goodsReceiptPOForm.get('supplierCode') as FormControl;
  }

  get supplierName() {
    return this.goodsReceiptPOForm.get('supplierName') as FormControl;
  }

  get dueDate() {
    return this.goodsReceiptPOForm.get('dueDate') as FormControl;
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
    if (this.goodsReceiptPOForm.invalid) {
      this.generalService.validateAllFormFields(this.goodsReceiptPOForm);
    } else {
      this.goodsReceiptPoDetailService.send(this.goodsReceiptPOForm.value)
        .then(() => {
          return this.backToList();
        });
    }
  }

  save() {
    if (this.goodsReceiptPOForm.invalid) {
      this.generalService.validateAllFormFields(this.goodsReceiptPOForm);
    } else {
      this.goodsReceiptPoDetailService.save(this.goodsReceiptPOForm.value)
        .then(() => {
          return this.backToList();
        });
    }
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
    this.goodsReceiptPoDetailService.deleteItemFromContents(this.deletedList);
  }

  showPurchaseOrders() {
    this.purchaseOrderSearchEntity = new PurchaseOrderSearchEntity();
    this.purchaseOrderSearchEntity.supplierDetailId = this.supplierDetailId.value;
    this.goodsReceiptPoDetailService.getPurchaseOrderList(this.purchaseOrderSearchEntity)
      .then(() => {
      });
    this.displayPurchaseOrders = true;
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
    this.filenameList = Object.values(event.target.files).map((file: File) => file.name);
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

  onSelectSupplierDetail(event) {
    this.goodsReceiptPOForm.patchValue({
      supplierDetailId: event.id,
      supplierCode: event.code,
      supplierName: event.name,
    });

    this.supplierContactSearchEntity.supplierDetailId = event.id;
    this.goodsReceiptPoDetailService.getSupplierContactList(this.supplierContactSearchEntity)
      .then(() => {
        if (this.supplierContactList.length > 0) {
          this.goodsReceiptPOForm.patchValue({
            supplierContactId: this.supplierContactList[0].id,
          });
        }
      });
  }

  getSupplierContactList = () => {
    this.supplierContactSearchEntity = new SupplierContactSearchEntity();
    this.supplierContactSearchEntity.supplierDetailId = this.supplierDetailId.value;
    this.goodsReceiptPoDetailService.getSupplierContactList(this.supplierContactSearchEntity);
  };

  onSelectInventoryOrganization(event) {
    this.goodsReceiptPOForm.patchValue({
      inventoryOrganizationId: event.id,
      inventoryOrganizationStreet: event.address,
    });
  }

  onSelectRequester(event) {
    this.goodsReceiptPOForm.patchValue({
      requesterId: event.id,
      requesterName: event.name,
    });
  }

  onSelectOwner(event) {
    this.goodsReceiptPOForm.patchValue({
      ownerId: event.id,
      ownerName: event.name,
    });
  }

  onSelectBuyer(event) {
    this.goodsReceiptPOForm.patchValue({
      buyerId: event.id,
      buyerName: event.name,
    });
  }
}
