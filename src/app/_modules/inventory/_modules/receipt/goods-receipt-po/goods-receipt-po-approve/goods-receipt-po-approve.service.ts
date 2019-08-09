import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceiptPOForm } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.form';
import * as _ from 'lodash';
import { GoodsReceiptPOApproveRepository } from './goods-receipt-po-approve.repository';
import { Entities } from 'src/app/_helpers/entity';
import {
    GoodsReceiptPOItemDetailSearchEntity,
    GoodsReceiptPOUnitOfMeasureSearchEntity,
    PurchaseOrdersSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Injectable()
export class GoodsReceiptPOApproveService {
    public goodsReceiptPOForm: BehaviorSubject<FormGroup>;
    public itemList: BehaviorSubject<Entities>;
    public unitOfMeasureList: BehaviorSubject<Entities>;
    public documentNumberList: BehaviorSubject<Entities>;
    constructor(
        private fb: FormBuilder,
        private goodsReceiptPORepository: GoodsReceiptPOApproveRepository,
        private toastrService: ToastrService,
    ) {
        this.goodsReceiptPOForm = new BehaviorSubject(this.fb.group(new GoodsReceiptPOForm()));
        this.itemList = new BehaviorSubject(new Entities());
        this.unitOfMeasureList = new BehaviorSubject(new Entities());
        this.documentNumberList = new BehaviorSubject(new Entities());
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

    // item:
    dropListItem(goodsReceiptPOItemDetailSearchEntity: GoodsReceiptPOItemDetailSearchEntity) {
        this.goodsReceiptPORepository.dropListItem(goodsReceiptPOItemDetailSearchEntity).subscribe(res => {
            if (res) {
                this.itemList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchItem(goodsReceiptPOItemDetailSearchEntity:
        Observable<GoodsReceiptPOItemDetailSearchEntity>) {
        goodsReceiptPOItemDetailSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListItem(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.itemList.next(res);
                }
            });
    }

    // unitOfMeasure:
    dropListUnitOfMeasure(goodsReceiptPOUnitOfMeasureSearchEntity: GoodsReceiptPOUnitOfMeasureSearchEntity) {
        this.goodsReceiptPORepository.dropListUnitOfMeasure(goodsReceiptPOUnitOfMeasureSearchEntity).subscribe(res => {
            if (res) {
                this.unitOfMeasureList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchUnitOfMeasure(goodsReceiptPOUnitOfMeasureSearchEntity:
        Observable<GoodsReceiptPOUnitOfMeasureSearchEntity>) {
        goodsReceiptPOUnitOfMeasureSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListUnitOfMeasure(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.unitOfMeasureList.next(res);
                }
            });
    }

    // documentNumber:
    dropListDocumentNumber(purchaseOrdersSearchEntity: PurchaseOrdersSearchEntity) {
        this.goodsReceiptPORepository.dropListDocumentNumber(purchaseOrdersSearchEntity).subscribe(res => {
            if (res) {
                this.documentNumberList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchDocumentNumber(purchaseOrdersSearchEntity:
        Observable<PurchaseOrdersSearchEntity>) {
        purchaseOrdersSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListDocumentNumber(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.documentNumberList.next(res);
                }
            });
    }
}
