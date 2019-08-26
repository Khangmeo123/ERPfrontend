import { Injectable } from '@angular/core';
import { GoodsReceiptPODetailRepository } from './goods-receipt-po-detail.repository';
import { BehaviorSubject, Subscription } from 'rxjs';
import {
  EmployeeDetailEntity,
  GoodsReceiptPOEntity,
  PurchaseOrderEntity,
  SupplierContactEntity,
  TaxEntity,
  UnitOfMeasureEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  PurchaseOrderSearchEntity,
  SupplierContactSearchEntity,
  TaxSearchEntity,
  UnitOfMeasureSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { GoodsReceiptPOForm } from '../../../../_backend/goods-receipt-po/goods-receipt-po.form';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
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

  supplierContactList: BehaviorSubject<SupplierContactEntity[]> = new BehaviorSubject<SupplierContactEntity[]>([]);

  requesterList: BehaviorSubject<EmployeeDetailEntity[]> = new BehaviorSubject<EmployeeDetailEntity[]>([]);

  unitOfMeasureList: BehaviorSubject<UnitOfMeasureEntity[]> = new BehaviorSubject<UnitOfMeasureEntity[]>([]);

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
        const itemDiscountCost = control.get('itemDiscountCost').value;
        const quantity = Number(control.get('quantity').value);
        const taxNumber = unitPrice * (taxRate / 100);
        const totalValue = Math.round((unitPrice + taxNumber - itemDiscountCost) * quantity);
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

  deleteItemFromContents(deletedList: number[]) {
    const currentFormGroup: FormGroup = this.goodsReceiptPOForm.getValue();
    const newFormArray: FormArray = new FormArray(
      currentFormGroup.get('goodsReceiptPOContents').value.filter((value, index) => deletedList.includes(index)),
    );
    currentFormGroup.setControl('goodsReceiptPOContents', newFormArray);
    this.goodsReceiptPOForm.next(currentFormGroup);
  }

  uploadFiles = (files: UploadFile[]) => {
    return new Promise<void>((resolve, reject) => {
      return this.goodsReceiptPODetailRepository.uploadFiles(files)
        .subscribe(
          (fileAttachments: FileAttachmentEntity[]) => {
            this.toastrService.success(translate('general.upload.success'));
            const currentForm: FormGroup = this.goodsReceiptPOForm.getValue();
            currentForm.setControl('fileAttachments', new FormArray(
              fileAttachments.map((fileAttachment: FileAttachmentEntity) => {
                return this.fb.group(fileAttachment);
              }),
            ));
            this.goodsReceiptPOForm.next(currentForm);
            resolve();
          },
          (error: Error) => {
            this.toastrService.error(translate('general.upload.error'));
            reject(error);
          },
        );
    });
  };
}
