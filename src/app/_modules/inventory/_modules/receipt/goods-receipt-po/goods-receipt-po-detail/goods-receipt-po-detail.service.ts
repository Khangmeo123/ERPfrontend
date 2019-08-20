import { Injectable } from '@angular/core';
import { GoodsReceiptPODetailRepository } from './goods-receipt-po-detail.repository';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  EmployeeDetailEntity,
  GoodsReceiptPOEntity,
  ItemDetailEntity,
  PurchaseOrderEntity,
  SupplierContactEntity,
  SupplierEntity,
  TaxEntity,
  UnitOfMeasureEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
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
import { GoodsReceiptPOForm } from '../../../../_backend/goods-receipt-po/goods-receipt-po.form';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../../_helpers/string';
import { UploadFile } from 'ng-zorro-antd';
import { FileAttachmentEntity } from '../../../../_backend/file-attachment/file-attachment.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptPoDetailService {

  goodsReceiptPOForm: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  purchaseOrderList: BehaviorSubject<PurchaseOrderEntity[]> = new BehaviorSubject<PurchaseOrderEntity[]>([]);

  taxList: BehaviorSubject<TaxEntity[]> = new BehaviorSubject<TaxEntity[]>([]);

  supplierList: BehaviorSubject<SupplierEntity[]> = new BehaviorSubject<SupplierEntity[]>([]);

  supplierContactList: BehaviorSubject<SupplierContactEntity[]> = new BehaviorSubject<SupplierContactEntity[]>([]);

  buyerList: BehaviorSubject<EmployeeDetailEntity[]> = new BehaviorSubject<EmployeeDetailEntity[]>([]);

  ownerList: BehaviorSubject<EmployeeDetailEntity[]> = new BehaviorSubject<EmployeeDetailEntity[]>([]);

  requesterList: BehaviorSubject<EmployeeDetailEntity[]> = new BehaviorSubject<EmployeeDetailEntity[]>([]);

  unitOfMeasureList: BehaviorSubject<UnitOfMeasureEntity[]> = new BehaviorSubject<UnitOfMeasureEntity[]>([]);

  inventoryOrganizationList: BehaviorSubject<InventoryOrganizationEntity[]> = new BehaviorSubject<InventoryOrganizationEntity[]>([]);

  itemDetailList: BehaviorSubject<ItemDetailEntity[]> = new BehaviorSubject<ItemDetailEntity[]>([]);

  constructor(
    private goodsReceiptPODetailRepository: GoodsReceiptPODetailRepository,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.goodsReceiptPOForm.next(
      this.fb.group(
        new GoodsReceiptPOForm(),
      ),
    );
  }

  public getBuyerList = (requesterSearchEntity: EmpoloyeeDetailSearchEntity): Subscription => {
    return this.goodsReceiptPODetailRepository
      .getEmployeeDetailList(requesterSearchEntity)
      .subscribe(
        (list: EmployeeDetailEntity[]) => {
          this.buyerList.next(list);
        },
      );
  };

  public getRequesterList = (requesterSearchEntity: EmpoloyeeDetailSearchEntity): Subscription => {
    return this.goodsReceiptPODetailRepository
      .getEmployeeDetailList(requesterSearchEntity)
      .subscribe(
        (list: EmployeeDetailEntity[]) => {
          this.requesterList.next(list);
        },
      );
  };

  public getOwnerList = (requesterSearchEntity: EmpoloyeeDetailSearchEntity): Subscription => {
    return this.goodsReceiptPODetailRepository
      .getEmployeeDetailList(requesterSearchEntity)
      .subscribe(
        (list: EmployeeDetailEntity[]) => {
          this.ownerList.next(list);
        },
      );
  };

  public getSupplierList = (supplierSearchEntity: SupplierSearchEntity): Subscription => {
    return this.goodsReceiptPODetailRepository
      .getSupplierList(supplierSearchEntity)
      .subscribe(
        (list: SupplierEntity[]) => {
          this.supplierList.next(list);
        },
      );
  };

  public getSupplierContactList = (supplierContactSearchEntity: SupplierContactSearchEntity): Promise<SupplierContactEntity[]> => {
    return new Promise<SupplierContactEntity[]>((resolve, reject) => {
      this.goodsReceiptPODetailRepository
        .getSupplierContactList(supplierContactSearchEntity)
        .subscribe(
          (list: SupplierContactEntity[]) => {
            this.supplierContactList.next(list);
            resolve(list);
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  };

  public getInventoryOrganizationList = (inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity): Subscription => {
    return this.goodsReceiptPODetailRepository
      .getInventoryOrganizationList(inventoryOrganizationSearchEntity)
      .subscribe(
        (list: InventoryOrganizationEntity[]) => {
          this.inventoryOrganizationList.next(list);
        },
      );
  };

  public getPurchaseOrderList = (purchaseOrderSearchEntity: PurchaseOrderSearchEntity): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      return this.goodsReceiptPODetailRepository
        .getPurchaseOrderList(purchaseOrderSearchEntity)
        .subscribe(
          (list: PurchaseOrderEntity[]) => {
            this.purchaseOrderList.next(list);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  };

  public getUnitOfMeasureList = (unitOfMeasureSearchEntity: UnitOfMeasureSearchEntity): Subscription => {
    return this.goodsReceiptPODetailRepository
      .getUnitOfMeasureList(unitOfMeasureSearchEntity)
      .subscribe(
        (list: UnitOfMeasureEntity[]) => {
          this.unitOfMeasureList.next(list);
        },
      );
  };

  public getTaxList = (taxSearchEntity: TaxSearchEntity): Subscription => {
    return this.goodsReceiptPODetailRepository
      .getTaxList(taxSearchEntity)
      .subscribe(
        (list: TaxEntity[]) => {
          this.taxList.next(list);
        },
      );
  };

  public combineGoodsReceiptPO = (data: any) => {
    this.goodsReceiptPODetailRepository.combineGoodsReceiptPO(data)
      .subscribe((res) => {
        if (res) {
          const goodsReceiptPOForm = this.fb.group(
            new GoodsReceiptPOForm(res),
          );
          this.recalculateContents(goodsReceiptPOForm);
        }
      });
  };

  public recalculateContents = (goodsReceiptPOForm: FormGroup) => {
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
  };

  send = (goodsReceiptPOEntity: GoodsReceiptPOEntity): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.goodsReceiptPODetailRepository
        .send(goodsReceiptPOEntity)
        .subscribe(
          (responseEntity: GoodsReceiptPOEntity) => {
            if (responseEntity) {
              this.toastrService.success(translate('general.update.success'));
              resolve();
            }
          },
          (error: Error) => {
            if (error) {
              this.toastrService.error(translate('general.update.error'));
              this.goodsReceiptPOForm.next(
                this.fb.group(
                  new GoodsReceiptPOForm(error),
                ),
              );
              reject();
            }
          });
    });
  };

  save = (goodsReceiptPOEntity: GoodsReceiptPOEntity): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.goodsReceiptPODetailRepository
        .save(goodsReceiptPOEntity)
        .subscribe(
          (responseEntity: GoodsReceiptPOEntity) => {
            if (responseEntity) {
              this.toastrService.success(translate('general.update.success'));
              resolve();
            }
          },
          (error: Error) => {
            if (error) {
              this.toastrService.error(translate('general.update.error'));
              this.goodsReceiptPOForm.next(
                this.fb.group(
                  new GoodsReceiptPOForm(error),
                ),
              );
              reject();
            }
          });
    });
  };

  public getDetail = (id: string): Promise<GoodsReceiptPOEntity> => {
    return new Promise<GoodsReceiptPOEntity>((resolve, reject) => {
      return this.goodsReceiptPODetailRepository.getDetail(id)
        .subscribe(
          (goodsReceiptPOEntity: GoodsReceiptPOEntity) => {
            this.goodsReceiptPOForm.next(
              this.fb.group(
                new GoodsReceiptPOForm(goodsReceiptPOEntity),
              ),
            );
            resolve(goodsReceiptPOEntity);
          },
          (error: Error) => {
            this.toastrService.error(translate('goodsReceiptPODetail.get.error'));
            reject(error);
          },
        );
    });
  };

  getItemDetailList = (itemDetailSearchEntity: ItemDetailSearchEntity): Promise<ItemDetailEntity[]> => {
    return new Promise<ItemDetailEntity[]>((resolve, reject) => {
      this.goodsReceiptPODetailRepository.getItemDetailList(itemDetailSearchEntity)
        .subscribe(
          (list: ItemDetailEntity[]) => {
            this.itemDetailList.next(list);
            resolve(list);
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  };

  deleteItemFromContents(deletedList: number[]) {
    const currentFormGroup: FormGroup = this.goodsReceiptPOForm.getValue();
    const newFormArray: FormArray = new FormArray(
      currentFormGroup.get('goodsReceiptPOContents').value.filter((value, index) => deletedList.includes(index)),
    );
    currentFormGroup.setControl('goodsReceiptPOContents', newFormArray);
    this.goodsReceiptPOForm.next(currentFormGroup);
  }

  uploadFiles = (files: UploadFile[]) => {
    return new Promise<FileAttachmentEntity[]>((resolve, reject) => {
      return this.goodsReceiptPODetailRepository.uploadFiles(files)
        .subscribe(
          (fileAttachments: FileAttachmentEntity[]) => {
            debugger
            const currentForm: FormGroup = this.goodsReceiptPOForm.getValue();
            currentForm.setControl('fileAttachments', new FormArray(
              fileAttachments.map((fileAttachment: FileAttachmentEntity) => {
                return this.fb.group(fileAttachment);
              }),
            ));
            this.goodsReceiptPOForm.next(currentForm);
          },
        );
    });
  };
}
