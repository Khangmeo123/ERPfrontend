import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../../_helpers/string';
import { UploadFile } from 'ng-zorro-antd';
import { FileAttachmentEntity } from '../../../../_backend/file-attachment/file-attachment.entity';
import { GoodsReceiptDetailRepository } from './goods-receipt-detail.repository';
import { GoodsReceiptForm, GoodsReceiptContentForm } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.form';
import { GoodsReceipt } from 'src/app/_modules/inventory/_backend/goods-receipt/goods-receipt.entity';

@Injectable({
  providedIn: 'root',
})
export class GoodsReceiptDetailService {

  goodsReceiptForm: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(this.fb.group(new GoodsReceiptForm()));

  constructor(
    private goodsReceiptRepository: GoodsReceiptDetailRepository,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) { }

  public getDetail = (id: string): Promise<GoodsReceipt> => {
    return new Promise<GoodsReceipt>((resolve, reject) => {
      return this.goodsReceiptRepository.getDetail(id)
        .subscribe(
          (goodsReceipt: GoodsReceipt) => {
            const goodsReceiptForm = this.fb.group(
              new GoodsReceiptForm(goodsReceipt),
            );
            this.recalculateContents(goodsReceiptForm);
            this.goodsReceiptForm.next(goodsReceiptForm);
            resolve(goodsReceipt);
          },
          (error: Error) => {
            this.toastrService.error(translate('goodsReceiptDetail.get.error'));
            reject(error);
          },
        );
    });
  };

  public recalculateContents = (goodsReceiptForm: FormGroup) => {
    const currentArray: FormArray = goodsReceiptForm.get('goodsReceiptContents') as FormArray;
    let totalGoodsReceiptContents: number = 0;
    for (const control of currentArray.controls) {
      if (control instanceof FormGroup) {
        const unitPrice = control.get('unitPrice').value || 0;
        const taxRate = control.get('taxRate').value || 0;
        const itemDiscountCost = control.get('itemDiscountCost').value || 0;
        const quantity = Number(control.get('quantity').value);
        const taxNumber = unitPrice * (taxRate / 100);
        const totalValue = Math.round((unitPrice + taxNumber - itemDiscountCost) * quantity);
        if (control.get('total')) {
          control.get('total').setValue(totalValue);
        } else {
          control.addControl('total', new FormControl(totalValue));
        }
        totalGoodsReceiptContents += totalValue;
      }
    }
    const totalGeneralDiscountRate = goodsReceiptForm.get('generalDiscountRate').value || 0;
    const totalGeneralDiscountCost = ((totalGoodsReceiptContents * totalGeneralDiscountRate) / 100) || 0;
    if (goodsReceiptForm.get('generalDiscountCost')) {
      goodsReceiptForm.get('generalDiscountCost').setValue(totalGeneralDiscountCost);
    } else {
      goodsReceiptForm.addControl('generalDiscountCost', new FormControl(totalGeneralDiscountCost));
    }
    totalGoodsReceiptContents = totalGoodsReceiptContents - totalGeneralDiscountCost;
    goodsReceiptForm.get('totalGoodsReceiptContents').setValue(totalGoodsReceiptContents);
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

  addNewGoodsReceiptContent(goodsReceiptForm: FormGroup) {
    const goodsReceiptContents = goodsReceiptForm.get('goodsReceiptContents') as FormArray;
    goodsReceiptContents.push(this.fb.group(new GoodsReceiptContentForm()));
    this.goodsReceiptForm.next(goodsReceiptForm);
  }

  checkAllGoodsReceiptContents(goodsReceiptForm: FormGroup, checked: boolean) {
    const goodsReceiptContents = goodsReceiptForm.get('goodsReceiptContents') as FormArray;
    goodsReceiptContents.controls.forEach(element => {
      if (element instanceof FormGroup) {
        element.get('isSelected').setValue(checked);
      }
    });
    this.goodsReceiptForm.next(goodsReceiptForm);
  }

  deleteGoodsReceiptContent(goodsReceiptForm: FormGroup) {
    const goodsReceiptContents = goodsReceiptForm.get('goodsReceiptContents') as FormArray;
    const deletedList = [];
    for (const control of goodsReceiptContents.controls) {
      if (control.get('isSelected').value) {
        deletedList.push(goodsReceiptContents.controls.indexOf(control));
        control.get('isSelected').setValue(false);
      }
    }
    for (let i = deletedList.length - 1; i >= 0; i--) {
      goodsReceiptContents.removeAt(deletedList[i]);
    }
    this.goodsReceiptForm.next(goodsReceiptForm);
  }
}
