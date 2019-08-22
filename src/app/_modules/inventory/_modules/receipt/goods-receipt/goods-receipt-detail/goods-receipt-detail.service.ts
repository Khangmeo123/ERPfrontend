import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { GoodsReceiptPOForm } from '../../../../_backend/goods-receipt-po/goods-receipt-po.form';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../../_helpers/string';
import { UploadFile } from 'ng-zorro-antd';
import { FileAttachmentEntity } from '../../../../_backend/file-attachment/file-attachment.entity';
import { GoodsReceiptDetailRepository } from './goods-receipt-detail.repository';
import { GoodsReceiptForm } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.form';
import { GoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';
import { GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptDetailService {

  goodsReceiptForm: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(this.fb.group(new GoodsReceiptPOForm()));

  constructor(
    private goodsReceiptRepository: GoodsReceiptDetailRepository,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) { }

  public combineGoodsReceiptPO = (data: any) => {
    this.goodsReceiptRepository.combineGoodsReceiptPO(data)
      .subscribe((res) => {
        if (res) {
          const goodsReceiptForm = this.fb.group(
            new GoodsReceiptForm(res),
          );
          this.recalculateContents(goodsReceiptForm);
        }
      });
  };

  public recalculateContents = (goodsReceiptForm: FormGroup) => {
    const currentArray: FormArray = goodsReceiptForm.get('goodsReceiptPOContents') as FormArray;
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
    goodsReceiptForm.get('totalGoodsReceiptPOContents').setValue(totalGoodsReceiptPOContents);
    this.goodsReceiptForm.next(goodsReceiptForm);
  };

  send = (goodsReceipt: GoodsReceipt): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.goodsReceiptRepository
        .send(goodsReceipt)
        .subscribe(
          (responseEntity: GoodsReceipt) => {
            if (responseEntity) {
              this.toastrService.success(translate('general.update.success'));
              resolve();
            }
          },
          (error: Error) => {
            if (error) {
              this.toastrService.error(translate('general.update.error'));
              this.goodsReceiptForm.next(
                this.fb.group(
                  new GoodsReceiptForm(error),
                ),
              );
              reject();
            }
          });
    });
  };

  save = (goodsReceipt: GoodsReceipt): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.goodsReceiptRepository
        .save(goodsReceipt)
        .subscribe(
          (responseEntity: GoodsReceipt) => {
            if (responseEntity) {
              this.toastrService.success(translate('general.update.success'));
              resolve();
            }
          },
          (error: Error) => {
            if (error) {
              this.toastrService.error(translate('general.update.error'));
              this.goodsReceiptForm.next(
                this.fb.group(
                  new GoodsReceiptForm(error),
                ),
              );
              reject();
            }
          });
    });
  };

  public getDetail = (id: string): Promise<GoodsReceipt> => {
    return new Promise<GoodsReceipt>((resolve, reject) => {
      return this.goodsReceiptRepository.getDetail(id)
        .subscribe(
          (goodsReceipt: GoodsReceipt) => {
            this.goodsReceiptForm.next(
              this.fb.group(
                new GoodsReceiptPOForm(goodsReceipt),
              ),
            );
            resolve(goodsReceipt);
          },
          (error: Error) => {
            this.toastrService.error(translate('goodsReceiptPODetail.get.error'));
            reject(error);
          },
        );
    });
  };

  deleteItemFromContents(deletedList: number[]) {
    const currentFormGroup: FormGroup = this.goodsReceiptForm.getValue();
    const newFormArray: FormArray = new FormArray(
      currentFormGroup.get('goodsReceiptContents').value.filter((value, index) => deletedList.includes(index)),
    );
    currentFormGroup.setControl('goodsReceiptContents', newFormArray);
    this.goodsReceiptForm.next(currentFormGroup);
  }

  uploadFiles = (files: UploadFile[]) => {
    return new Promise<FileAttachmentEntity[]>((resolve, reject) => {
      return this.goodsReceiptRepository.uploadFiles(files)
        .subscribe(
          (fileAttachments: FileAttachmentEntity[]) => {
            resolve();
            this.toastrService.success(translate('general.upload.success'));
            const currentForm: FormGroup = this.goodsReceiptForm.getValue();
            currentForm.setControl('fileAttachments', new FormArray(
              fileAttachments.map((fileAttachment: FileAttachmentEntity) => {
                return this.fb.group(fileAttachment);
              }),
            ));
            this.goodsReceiptForm.next(currentForm);
          },
          (error: Error) => {
            this.toastrService.error(translate('general.upload.error'));
            reject(error);
          },
        );
    });
  };

}
