import {
    PurchaseOrdersSearchEntity,
    GoodsReceiptPOItemDetailSearchEntity,
    GoodsReceiptPOTaxSearchEntity,
    GoodsReceiptPOUnitOfMeasureSearchEntity,
} from './../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { PurchaseOrdersEntity } from './../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceiptPOForm } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.form';
import { Entities } from 'src/app/_helpers/entity';
import {
    GoodsReceiptPORequesterSearchEntity,
    GoodsReceiptPOInventoryOrganizationSearchEntity,
    GoodsReceiptPOSupplierSearchEntity,
    GoodsReceiptPOSupplierAddressSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { GoodsReceiptPODetailRepository } from './goods-receipt-po-detail.repository';
import * as _ from 'lodash';
@Injectable()
export class GoodsReceiptPODetailService {
    public goodsReceiptPOForm: BehaviorSubject<FormGroup>;
    public supplierList: BehaviorSubject<Entities>;
    public supplierAddressList: BehaviorSubject<Entities>;
    public invetoryOrganizationList: BehaviorSubject<Entities>;
    public buyerList: BehaviorSubject<Entities>;
    public ownerList: BehaviorSubject<Entities>;
    public ownerPOList: BehaviorSubject<Entities>;
    public purchaseOrdersList: BehaviorSubject<PurchaseOrdersEntity[]>;
    public itemList: BehaviorSubject<Entities>;
    public taxList: BehaviorSubject<Entities>;
    public unitOfMeasureList: BehaviorSubject<Entities>;
    public documentNumberList: BehaviorSubject<Entities>;

    constructor(
        private fb: FormBuilder,
        private goodsReceiptPORepository: GoodsReceiptPODetailRepository,
        private toastrService: ToastrService,
    ) {
        this.goodsReceiptPOForm = new BehaviorSubject(this.fb.group(new GoodsReceiptPOForm()));
        this.supplierList = new BehaviorSubject(new Entities());
        this.supplierAddressList = new BehaviorSubject(new Entities());
        this.invetoryOrganizationList = new BehaviorSubject(new Entities());
        this.ownerList = new BehaviorSubject(new Entities());
        this.ownerPOList = new BehaviorSubject(new Entities());
        this.buyerList = new BehaviorSubject(new Entities());
        this.purchaseOrdersList = new BehaviorSubject([]);
        this.itemList = new BehaviorSubject(new Entities());
        this.taxList = new BehaviorSubject(new Entities());
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

    save(goodsReceiptPOEntity: any) {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.goodsReceiptPORepository.save(goodsReceiptPOEntity).subscribe(res => {
                if (res) {
                    this.toastrService.success('Cập nhật thành công !');
                    const goodsReceiptPOForm = this.fb.group(
                        new GoodsReceiptPOForm(res),
                    );
                    this.recalculateContents(goodsReceiptPOForm);
                    resolve();
                }
            }, err => {
                if (err) {
                    this.goodsReceiptPOForm.next(this.fb.group(
                        new GoodsReceiptPOForm(err),
                    ));
                    reject();
                }
            });
        });
        return defered;
    }

    getPurchaseOrdersList(purchaseOrdersSearchEntity: PurchaseOrdersSearchEntity) {
        this.goodsReceiptPORepository.getPurchaseOrdersList(purchaseOrdersSearchEntity).subscribe(res => {
            if (res) {
                this.purchaseOrdersList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    // supplier:
    dropListSupplier(goodsReceiptPOSupplierSearchEntity: GoodsReceiptPOSupplierSearchEntity) {
        this.goodsReceiptPORepository.dropListSupplier(goodsReceiptPOSupplierSearchEntity).subscribe(res => {
            if (res) {
                this.supplierList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchSupplier(goodsReceiptPOSupplierSearchEntity: Observable<GoodsReceiptPOSupplierSearchEntity>) {
        goodsReceiptPOSupplierSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListSupplier(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.supplierList.next(res);
                }
            });
    }

    // supplierAddress:
    dropListSupplierAddress(goodsReceiptPOSupplierAddressSearchEntity: GoodsReceiptPOSupplierAddressSearchEntity) {
        this.goodsReceiptPORepository.dropListSupplierAddress(goodsReceiptPOSupplierAddressSearchEntity).subscribe(res => {
            if (res) {
                this.supplierAddressList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchSupplierAddress(goodsReceiptPOSupplierAddressSearchEntity: Observable<GoodsReceiptPOSupplierAddressSearchEntity>) {
        goodsReceiptPOSupplierAddressSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListSupplierAddress(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.supplierAddressList.next(res);
                }
            });
    }

    // buyer:
    dropListBuyer(goodsReceiptPOListOwnerSearchEntity: GoodsReceiptPORequesterSearchEntity) {
        this.goodsReceiptPORepository.dropListBuyer(goodsReceiptPOListOwnerSearchEntity).subscribe(res => {
            if (res) {
                this.buyerList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchBuyer(goodsReceiptPOListOwnerSearchEntity: Observable<GoodsReceiptPORequesterSearchEntity>) {
        goodsReceiptPOListOwnerSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListBuyer(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.buyerList.next(res);
                }
            });
    }

    // owner:
    dropListOwner(goodsReceiptPOListOwnerSearchEntity: GoodsReceiptPORequesterSearchEntity) {
        this.goodsReceiptPORepository.dropListOwner(goodsReceiptPOListOwnerSearchEntity).subscribe(res => {
            if (res) {
                this.ownerList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchOwner(goodsReceiptPOListOwnerSearchEntity: Observable<GoodsReceiptPORequesterSearchEntity>) {
        goodsReceiptPOListOwnerSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListOwner(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.ownerList.next(res);
                }
            });
    }

    // ownerPO:
    dropListOwnerPO(goodsReceiptPOListOwnerSearchEntity: GoodsReceiptPORequesterSearchEntity) {
        this.goodsReceiptPORepository.dropListOwner(goodsReceiptPOListOwnerSearchEntity).subscribe(res => {
            if (res) {
                this.ownerPOList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchOwnerPO(goodsReceiptPOListOwnerSearchEntity: Observable<GoodsReceiptPORequesterSearchEntity>) {
        goodsReceiptPOListOwnerSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListOwner(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.ownerPOList.next(res);
                }
            });
    }

    // inventoryOrganization:
    dropListInvetoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity: GoodsReceiptPOInventoryOrganizationSearchEntity) {
        this.goodsReceiptPORepository.dropListInventoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity).subscribe(res => {
            if (res) {
                this.invetoryOrganizationList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchInvetoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity:
        Observable<GoodsReceiptPOInventoryOrganizationSearchEntity>) {
        goodsReceiptPOInventoryOrganizationSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListInventoryOrganization(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.invetoryOrganizationList.next(res);
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

    // tax:
    dropListTax(goodsReceiptPOTaxSearchEntity: GoodsReceiptPOTaxSearchEntity) {
        this.goodsReceiptPORepository.dropListTax(goodsReceiptPOTaxSearchEntity).subscribe(res => {
            if (res) {
                this.taxList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchTax(goodsReceiptPOTaxSearchEntity:
        Observable<GoodsReceiptPOTaxSearchEntity>) {
        goodsReceiptPOTaxSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListTax(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.taxList.next(res);
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

    // goodsReceiptPOContents:
    deleteItemFromContent(deletedList: number[]) {
        const sortedArray = deletedList.reverse();
        const currentForm = this.goodsReceiptPOForm.getValue();
        const currentArray = currentForm.get('goodsReceiptPOContents') as FormArray;
        for (let i = sortedArray.length - 1; i >= 0; i--) {
            currentArray.removeAt(sortedArray[i]);
        }
        this.goodsReceiptPOForm.next(currentForm);
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

    // purchase orders dialog:
    combineGoodsReceiptPO(data: any) {
        this.goodsReceiptPORepository.combineGoodsReceiptPO(data).subscribe(res => {
            if (res) {
                const goodsReceiptPOForm = this.fb.group(
                    new GoodsReceiptPOForm(res),
                );
                this.recalculateContents(goodsReceiptPOForm);
            }
        });
    }
}
