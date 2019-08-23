import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceiptPOForm } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.form';
import { GoodsReceiptPOApproveRepository } from './goods-receipt-po-approve.repository';
import { translate } from '../../../../../../_helpers/string';

@Injectable()
export class GoodsReceiptPOApproveService {

  public goodsReceiptPOForm: BehaviorSubject<FormGroup>;

  constructor(
    private fb: FormBuilder,
    private goodsReceiptPORepository: GoodsReceiptPOApproveRepository,
    private toastrService: ToastrService,
  ) {
    this.goodsReceiptPOForm = new BehaviorSubject(
      this.fb.group(
        new GoodsReceiptPOForm(),
      ),
    );
  }

  getDetail = (goodsReceiptPOId?): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      if (goodsReceiptPOId !== null && goodsReceiptPOId !== undefined) {
        this.goodsReceiptPORepository.getDetail(goodsReceiptPOId).subscribe(
          res => {
            if (res) {
              const goodsReceiptPOForm = this.fb.group(
                new GoodsReceiptPOForm(res),
              );
              this.recalculateContents(goodsReceiptPOForm);
              resolve();
            }
          },
          (error: Error) => {
            if (error) {
              console.log(error);
              reject();
            }
          },
        );
      }
    });
  };

  approve = (goodsReceiptPOId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReceiptPORepository.approve(goodsReceiptPOId).subscribe(res => {
        if (res) {
          this.toastrService.success(translate('general.approve.success'));
          resolve();
        }
      }, (error: Error) => {
        if (error) {
          this.toastrService.error(translate('general.approve.error'));
          reject();
        }
      });
    });
  };

  reject = (goodsReceiptPOId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReceiptPORepository.reject(goodsReceiptPOId)
        .subscribe(
          res => {
            if (res) {
              this.toastrService.success(translate('general.update.success'));
              resolve();
            }
          },
          (error: Error) => {
            if (error) {
              this.toastrService.error(translate('general.update.error'));
              reject();
            }
          },
        );
    });
  };

  recalculateContents = (goodsReceiptPOForm: FormGroup): void => {
    const currentArray = goodsReceiptPOForm.get('goodsReceiptPOContents') as FormArray;
    let totalGoodsReceiptPOContents = 0;
    for (const control of currentArray.controls) {
      if (control instanceof FormGroup) {
        const unitPrice = control.get('unitPrice').value;
        const taxRate = control.get('taxRate').value;
        const itemDiscountCost = control.get('itemDiscountCost').value;
        const quantity = control.get('quantity').value;
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
}
