import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceiptPOForm } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.form';
import * as _ from 'lodash';
import { Entities } from 'src/app/_helpers/entity';
import {
    GoodsReceiptPOItemDetailSearchEntity,
    GoodsReceiptPOUnitOfMeasureSearchEntity,
    PurchaseOrdersSearchEntity,
    GoodsReceiptPOBinlocationSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GoodsReceiptPOReceiveRepository } from './goods-receipt-po-receive.repository';
import {
    GoodsReceiptPOQuantityDetail,
    GoodsReceiptPOSerialNumberEntity,
    GoodsReceiptPOBatchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
@Injectable()
export class GoodsReceiptPOReceiveService {
    public goodsReceiptPOForm: BehaviorSubject<FormGroup>;
    public itemList: BehaviorSubject<Entities>;
    public unitOfMeasureList: BehaviorSubject<Entities>;
    public documentNumberList: BehaviorSubject<Entities>;
    public binLocationList: BehaviorSubject<Entities>;
    public quantityDetail: BehaviorSubject<GoodsReceiptPOQuantityDetail>;
    public serialNumberList: BehaviorSubject<GoodsReceiptPOSerialNumberEntity[]>;
    public batchList: BehaviorSubject<GoodsReceiptPOBatchEntity[]>;
    constructor(
        private fb: FormBuilder,
        private goodsReceiptPORepository: GoodsReceiptPOReceiveRepository,
        private toastrService: ToastrService,
    ) {
        this.goodsReceiptPOForm = new BehaviorSubject(this.fb.group(new GoodsReceiptPOForm()));
        this.itemList = new BehaviorSubject(new Entities());
        this.unitOfMeasureList = new BehaviorSubject(new Entities());
        this.documentNumberList = new BehaviorSubject(new Entities());
        this.binLocationList = new BehaviorSubject(new Entities());
        this.quantityDetail = new BehaviorSubject(new GoodsReceiptPOQuantityDetail());
        this.serialNumberList = new BehaviorSubject([]);
        this.batchList = new BehaviorSubject([]);
    }

    // general:
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

    receive(goodsReceiptPOId: string): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.goodsReceiptPORepository.receive(goodsReceiptPOId).subscribe(res => {
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

    rejectReceive(goodsReceiptPOId: string): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.goodsReceiptPORepository.rejectReceive(goodsReceiptPOId).subscribe(res => {
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
    // quantityDetail:
    getQuantityDetailList(goodsReceiptPOContentId: string) {
        this.goodsReceiptPORepository.getQuantityDetailList(goodsReceiptPOContentId).subscribe(res => {
            if (res) {
                this.quantityDetail.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    updateQuantityDetail(goodsReceiptPOQuantityDetail: any) {
        this.goodsReceiptPORepository.updateQuantityDetail(goodsReceiptPOQuantityDetail).subscribe(res => {
            if (res) {
                this.toastrService.success('Hệ thống cập nhật thành công!');
                const currentForm = this.goodsReceiptPOForm.getValue();
                const currentArray = currentForm.get('goodsReceiptPOContents') as FormArray;
                for (const control of currentArray.controls) {
                    if (control instanceof FormGroup) {
                        if (control.get('id').value === goodsReceiptPOQuantityDetail.goodsReceiptPOQuantities[0].goodsReceiptContentId) {
                            control.get('actualReceive').setValue(goodsReceiptPOQuantityDetail.quantity);
                        }
                    }
                }
                this.goodsReceiptPOForm.next(currentForm);
            }
        }, err => {
            this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
        });
    }
    // serialNumber:
    getSerialNumberList(goodsReceiptPOContentId: string) {
        this.goodsReceiptPORepository.getSerialNumberList(goodsReceiptPOContentId).subscribe(res => {
            if (res) {
                this.serialNumberList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    updateSerialNumber(goodsReceiptPOSerialNumberEntity: any[]) {
        this.goodsReceiptPORepository.updateQuantityDetail(goodsReceiptPOSerialNumberEntity).subscribe(res => {
            if (res) {
                this.toastrService.success('Hệ thống cập nhật thành công!');
                const currentForm = this.goodsReceiptPOForm.getValue();
                const currentArray = currentForm.get('goodsReceiptPOContents') as FormArray;
                for (const control of currentArray.controls) {
                    if (control instanceof FormGroup) {
                    }
                }
                this.goodsReceiptPOForm.next(currentForm);
            }
        }, err => {
            this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
        });
    }

    analyzeQRCode(itemDetailId: string, qrCode: string) {
        this.goodsReceiptPORepository.analyzeQRCode(itemDetailId, qrCode).subscribe(res => {
            if (res) {
                const currentList = this.serialNumberList.getValue();
                currentList.push(res);
                this.serialNumberList.next(currentList);
            }
        }, err => {
            if (err) {
                this.toastrService.error('Quét QR xảy ra lỗi!');
            }
        });
    }

    // batch:
    getBatchList(goodsReceiptPOContentId: string) {
        this.goodsReceiptPORepository.getBatchList(goodsReceiptPOContentId).subscribe(res => {
            if (res) {
                this.batchList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    updateBatch(goodsReceiptPOBatchEntity: any[]) {
        this.goodsReceiptPORepository.updateBatch(goodsReceiptPOBatchEntity).subscribe(res => {
            if (res) {
                this.toastrService.success('Hệ thống cập nhật thành công!');
                const currentForm = this.goodsReceiptPOForm.getValue();
                const currentArray = currentForm.get('goodsReceiptPOContents') as FormArray;
                for (const control of currentArray.controls) {
                    if (control instanceof FormGroup) {
                    }
                }
                this.goodsReceiptPOForm.next(currentForm);
            }
        }, err => {
            this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
        });
    }

    analyzeBatchCode(itemDetailId: string, qrCode: string) {
        this.goodsReceiptPORepository.analyzeBatchCode(itemDetailId, qrCode).subscribe(res => {
            if (res) {
                const currentList = this.batchList.getValue();
                currentList.push(res);
                this.batchList.next(currentList);
            }
        }, err => {
            if (err) {
                this.toastrService.error('Quét QR xảy ra lỗi!');
            }
        });
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

    // dropListBinLocation:
    dropListBinLocation(goodsReceiptPOBinlocationSearchEntity: GoodsReceiptPOBinlocationSearchEntity) {
        this.goodsReceiptPORepository.dropListBinLocation(goodsReceiptPOBinlocationSearchEntity).subscribe(res => {
            if (res) {
                this.binLocationList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchBinLocation(goodsReceiptPOBinlocationSearchEntity:
        Observable<GoodsReceiptPOBinlocationSearchEntity>) {
        goodsReceiptPOBinlocationSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListBinLocation(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.binLocationList.next(res);
                }
            });
    }

    validateSubmit(goodsReceiptPODetailQuantities: GoodsReceiptPOQuantityDetail[]) {
        let returnValue = true;
        goodsReceiptPODetailQuantities.forEach(item => {
            if (item.goodsReceiptPOQuantities.length > 0) {
                const sumQuantity = _.sumBy(item.goodsReceiptPOQuantities, elm => elm.quantity);
                if (sumQuantity !== item.quantity) {
                    item.errors = { message: 'Tổng số lượng lưu phải bằng số lượng!' };
                    returnValue = false;
                }
            } else {
                item.errors = { message: 'Phải có mã vị trí!' };
                returnValue = false;
            }
        });
        return returnValue;
    }
}
