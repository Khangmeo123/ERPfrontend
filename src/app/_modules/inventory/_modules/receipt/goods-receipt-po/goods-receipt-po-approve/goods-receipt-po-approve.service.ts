import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceiptPOForm } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.form';
import * as _ from 'lodash';
import { GoodsReceiptPOApproveRepository } from './goods-receipt-po-approve.repository';
@Injectable()
export class GoodsReceiptPOApproveService {
    public goodsReceiptPOForm: BehaviorSubject<FormGroup>;

    constructor(
        private fb: FormBuilder,
        private goodsReceiptPORepository: GoodsReceiptPOApproveRepository,
        private toastrService: ToastrService,
    ) {
        this.goodsReceiptPOForm = new BehaviorSubject(this.fb.group(new GoodsReceiptPOForm()));
    }

    getDetail(goodsReceiptPOId?): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            if (goodsReceiptPOId !== null && goodsReceiptPOId !== undefined) {
                this.goodsReceiptPORepository.getDetail(goodsReceiptPOId).subscribe(res => {
                    if (res) {
                        const goodsReceiptPOForm = this.fb.group(
                            new GoodsReceiptPOForm(res),
                        );
                        this.recalculateContents(goodsReceiptPOForm);
                        resolve();
                    }
                }, err => {
                    if (err) {
                        console.log(err);
                        reject();
                    }
                });
            }
        });
        return defered;
    }

    approve(goodsReceiptPOId: string): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.goodsReceiptPORepository.approve(goodsReceiptPOId).subscribe(res => {
                if (res) {
                    this.toastrService.success('Cập nhật thành công !');
                    resolve();
                }
            }, err => {
                if (err) {
                    reject();
                    console.log(err);
                }
            });
        });
        return defered;
    }

    recalculateContents(goodsReceiptPOForm: FormGroup) {
        const currentArray = goodsReceiptPOForm.get('goodsReceiptPOContents') as FormArray;
        let totalGoodsReceiptPOContents = 0;
        for (const control of currentArray.controls) {
            if (control instanceof FormGroup) {
                const unitPrice = control.get('unitPrice').value;
                const taxRate = control.get('taxRate').value;
                const generalDiscountCost = control.get('generalDiscountCost').value;
                const quantity = control.get('quantity').value;
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
