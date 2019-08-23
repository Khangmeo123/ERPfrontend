import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { GoodsReceiptPoDetailService } from './goods-receipt-po-detail.service';
import {
  EmployeeDetailEntity,
  PurchaseOrderEntity,
  SupplierContactEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import {
  EmployeeDetailSearchEntity,
  InventoryOrganizationSearchEntity,
  ItemDetailSearchEntity,
  PurchaseOrderSearchEntity,
  SupplierContactSearchEntity,
  TaxSearchEntity,
  UnitOfMeasureSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { SupplierSearchEntity } from '../../../../../master-data/_backend/supplier/supplier.searchentity';
import { GeneralService } from '../../../../../../_services/general-service.service';
import { GoodsReceiptPODetailRepository } from './goods-receipt-po-detail.repository';
import { UploadFile } from 'ng-zorro-antd';

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

  fileList: UploadFile[] = [];

  deletedList: number[] = [];

  purchaseOrdersList: PurchaseOrderEntity[] = [];

  purchaseOrderSearchEntity: PurchaseOrderSearchEntity = new PurchaseOrderSearchEntity();

  taxSearchEntity: TaxSearchEntity = new TaxSearchEntity();

  requesterList: EmployeeDetailEntity[] = [];

  requesterSearchEntity: EmployeeDetailSearchEntity = new EmployeeDetailSearchEntity();

  buyerSearchEntity: EmployeeDetailSearchEntity = new EmployeeDetailSearchEntity();

  ownerSearchEntity: EmployeeDetailSearchEntity = new EmployeeDetailSearchEntity();

  supplierSearchEntity: SupplierSearchEntity = new SupplierSearchEntity();

  supplierContactSearchEntity: SupplierContactSearchEntity = new SupplierContactSearchEntity();

  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();

  unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity = new UnitOfMeasureSearchEntity();

  itemDetailSearchEntity: ItemDetailSearchEntity = new ItemDetailSearchEntity();

  public subscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private goodsReceiptPoDetailService: GoodsReceiptPoDetailService,
    private activatedRoute: ActivatedRoute,
    private generalService: GeneralService,
    private goodsReceiptPoDetailRepository: GoodsReceiptPODetailRepository,
  ) {
    const activatedRouteSubscription: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      if (params.id) {
        this.goodsReceiptPOId = params.id;
        this.goodsReceiptPoDetailService.getDetail(params.id)
          .then(() => {
            this.supplierContactSearchEntity.supplierDetailId = this.supplierDetailId.value;
          });
      }
    });

    const formSubscription: Subscription = this.goodsReceiptPoDetailService.goodsReceiptPOForm.subscribe((form: FormGroup) => {
      this.goodsReceiptPOForm = form;
    });

    const requesterListSubscription: Subscription = this.goodsReceiptPoDetailService.requesterList
      .subscribe((list: EmployeeDetailEntity[]) => {
        this.requesterList = list;
      });

    const purchaseOrdersSubscription: Subscription = this.goodsReceiptPoDetailService.purchaseOrderList
      .subscribe((list: PurchaseOrderEntity[]) => {
        this.purchaseOrdersList = list;
      });

    this.subscription
      .add(activatedRouteSubscription)
      .add(formSubscription)
      .add(purchaseOrdersSubscription)
      .add(requesterListSubscription);
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

  get supplierAddress() {
    return this.goodsReceiptPOForm.get('supplierAddress') as FormControl;
  }

  get dueDate() {
    return this.goodsReceiptPOForm.get('dueDate') as FormControl;
  }

  get fileAttachments() {
    return this.goodsReceiptPOForm.get('fileAttachments') as FormArray;
  }

  get allSelected() {
    return this.purchaseOrdersList.length === this.purchaseOrdersList.filter((item) => item.isSelected).length;
  }

  get inventoryOrganizationCode() {
    return this.goodsReceiptPOForm.get('inventoryOrganizationCode') as FormControl;
  }

  get ownerName() {
    return this.goodsReceiptPOForm.get('ownerName') as FormControl;
  }

  get buyerName() {
    return this.goodsReceiptPOForm.get('buyerName') as FormControl;
  }

  get requesterName() {
    return this.goodsReceiptPOForm.get('requesterName') as FormControl;
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

  onClearSearch(table) {
    table.reset();
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

  selectAllPurchaseOrders() {
    const allSelected: boolean = this.allSelected;
    this.purchaseOrdersList.forEach(item => {
      item.isSelected = !allSelected;
    });
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
      supplierName: event.name,
      supplierDetailId: event.id,
      supplierCode: event.code,
    });

    this.supplierContactSearchEntity.supplierDetailId = event.id;
    this.goodsReceiptPoDetailService.getSupplierContactList(this.supplierContactSearchEntity)
      .then((contactList: SupplierContactEntity[]) => {
        if (contactList.length) {
          this.goodsReceiptPOForm.patchValue({
            supplierContactId: contactList[0].id,
            supplierAddress: contactList[0].supplierAddress,
          });
        }
      });
  }

  onSelectInventoryOrganization(event) {
    this.goodsReceiptPOForm.patchValue({
      inventoryOrganizationId: event.id,
      inventoryOrganizationCode: event.code,
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

  onUpload = () => {
    return this.goodsReceiptPoDetailService.uploadFiles(this.fileList);
  };

  beforeUpload = (file: UploadFile) => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
}
