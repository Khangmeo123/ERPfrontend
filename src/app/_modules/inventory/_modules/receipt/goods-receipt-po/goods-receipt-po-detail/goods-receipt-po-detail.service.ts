import { Injectable } from '@angular/core';
import { GoodsReceiptPODetailRepository } from './goods-receipt-po-detail.repository';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  PurchaseOrderEntity,
  RequesterEntity,
  SupplierAddressEntity,
  SupplierEntity,
  TaxEntity, UnitOfMeasureEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  InventoryOrganizationSearchEntity,
  PurchaseOrderSearchEntity,
  RequesterSearchEntity,
  SupplierAddressSearchEntity, UnitOfMeasureSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { SupplierSearchEntity } from '../../../../../master-data/_backend/supplier/supplier.searchentity';
import { GoodsReceiptPOForm } from '../../../../_backend/goods-receipt-po/goods-receipt-po.form';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPoDetailService {

  goodsReceiptPOForm: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  purchaseOrderList: BehaviorSubject<PurchaseOrderEntity[]> = new BehaviorSubject<PurchaseOrderEntity[]>([]);

  taxList: BehaviorSubject<TaxEntity[]> = new BehaviorSubject<TaxEntity[]>([]);

  supplierList: BehaviorSubject<SupplierEntity[]> = new BehaviorSubject<SupplierEntity[]>([]);

  supplierAddressList: BehaviorSubject<SupplierAddressEntity[]> = new BehaviorSubject<SupplierAddressEntity[]>([]);

  buyerList: BehaviorSubject<RequesterEntity[]> = new BehaviorSubject<RequesterEntity[]>([]);

  ownerList: BehaviorSubject<RequesterEntity[]> = new BehaviorSubject<RequesterEntity[]>([]);

  unitOfMeasureList: BehaviorSubject<UnitOfMeasureEntity[]> = new BehaviorSubject<UnitOfMeasureEntity[]>([]);

  inventoryOrganizationList: BehaviorSubject<InventoryOrganizationEntity[]> = new BehaviorSubject<InventoryOrganizationEntity[]>([]);

  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();

  constructor(private goodsReceiptPODetailRepository: GoodsReceiptPODetailRepository, private fb: FormBuilder) {
    this.goodsReceiptPOForm.next(
      this.fb.group(
        new GoodsReceiptPOForm(),
      ),
    );
  }

  public getBuyerList(requesterSearchEntity: RequesterSearchEntity): Subscription {
    return this.goodsReceiptPODetailRepository
      .getBuyerList(requesterSearchEntity)
      .subscribe(
        (list: RequesterEntity[]) => {
          this.buyerList.next(list);
        },
      );
  }

  public getOwnerList(requesterSearchEntity: RequesterSearchEntity): Subscription {
    return this.goodsReceiptPODetailRepository
      .getOwnerList(requesterSearchEntity)
      .subscribe(
        (list: RequesterEntity[]) => {
          this.ownerList.next(list);
        },
      );
  }

  public getSupplierList = (supplierSearchEntity: SupplierSearchEntity): Subscription => {
    debugger
    return this.goodsReceiptPODetailRepository
      .getSupplierList(supplierSearchEntity)
      .subscribe(
        (list: SupplierEntity[]) => {
          this.supplierList.next(list);
        },
      );
  };

  public getSupplierAddressList(supplierAddressSearchEntity: SupplierAddressSearchEntity): Subscription {
    return this.goodsReceiptPODetailRepository
      .getSupplierAddressList(supplierAddressSearchEntity)
      .subscribe(
        (list: SupplierAddressEntity[]) => {
          this.supplierAddressList.next(list);
        },
      );
  }

  public getInventoryOrganizationList(inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity): Subscription {
    return this.goodsReceiptPODetailRepository
      .getInventoryOrganizationList(inventoryOrganizationSearchEntity)
      .subscribe(
        (list: InventoryOrganizationEntity[]) => {
          this.inventoryOrganizationList.next(list);
        },
      );
  }

  public getPurchaseOrderList(purchaseOrderSearchEntity: PurchaseOrderSearchEntity): Subscription {
    return this.goodsReceiptPODetailRepository
      .getPurchaseOrderList(purchaseOrderSearchEntity)
      .subscribe(
        (list: PurchaseOrderEntity[]) => {
          this.purchaseOrderList.next(list);
        },
      );
  }

  public getUnitOfMeasureList(unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity): Subscription {
    return this.goodsReceiptPODetailRepository
      .getUnitOfMeasureList(unitOfMeasureSearchEntity)
      .subscribe(
        (list: UnitOfMeasureEntity[]) => {
          this.unitOfMeasureList.next(list);
        },
      );
  }

  public combineGoodsReceiptPO(data: any) {
    this.goodsReceiptPODetailRepository.combineGoodsReceiptPO(data)
      .subscribe((res) => {
        if (res) {
          const goodsReceiptPOForm = this.fb.group(
            new GoodsReceiptPOForm(res),
          );
          this.recalculateContents(goodsReceiptPOForm);
        }
      });
  }

  public recalculateContents(goodsReceiptPOForm: FormGroup) {
    const currentArray: FormArray = goodsReceiptPOForm.get('goodsReceiptPOContents') as FormArray;
    let totalGoodsReceiptPOContents: number = 0;
    for (const control of currentArray.controls) {
      if (control instanceof FormGroup) {
        const unitPrice = control.get('unitPrice').value;
        const taxRate = control.get('taxRate').value;
        const generalDiscountCost = control.get('generalDiscountCost').value;
        const quantity = Number(control.get('quantity').value);
        const taxNumber = unitPrice * (taxRate / 100);
        const totalValue = Math.round((unitPrice + taxNumber - generalDiscountCost) * quantity);
        if (control.get('total')) {
          control.get('total').setValue(totalValue);
        } else {
          control.addControl('total', new FormControl(totalValue));
        }
        totalGoodsReceiptPOContents += totalValue;
      }
    }
    goodsReceiptPOForm.get('totalGoodsReceiptPOContents').setValue(totalGoodsReceiptPOContents);
    this.goodsReceiptPOForm.next(goodsReceiptPOForm);
  }
}
