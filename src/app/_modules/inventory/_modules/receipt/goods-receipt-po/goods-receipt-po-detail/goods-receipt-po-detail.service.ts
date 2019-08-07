import { FormGroup, FormBuilder } from '@angular/forms';
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

@Injectable()
export class GoodsReceiptPODetailService {
    public goodsReceiptPOForm: BehaviorSubject<FormGroup>;
    public supplierList: BehaviorSubject<Entities>;
    public supplierAddressList: BehaviorSubject<Entities>;
    public invetoryOrganizationList: BehaviorSubject<Entities>;
    public requesterList: BehaviorSubject<Entities>;

    constructor(
        private fb: FormBuilder,
        private goodsReceiptPORepository: GoodsReceiptPODetailRepository,
        private toastrService: ToastrService,
    ) {
        this.goodsReceiptPOForm = new BehaviorSubject(this.fb.group(new GoodsReceiptPOForm()));
    }

    getDetail(goodsReceiptPOId?) {
        if (goodsReceiptPOId !== null && goodsReceiptPOId !== undefined) {
            this.goodsReceiptPORepository.getDetail(goodsReceiptPOId).subscribe(res => {
                if (res) {
                    this.goodsReceiptPOForm.next(this.fb.group(
                        new GoodsReceiptPOForm(res),
                    ));
                }
            }, err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    save(goodsReceiptPOEntity: any): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            if (goodsReceiptPOEntity.id === null || goodsReceiptPOEntity.id === undefined
                || goodsReceiptPOEntity.id === goodsReceiptPOEntity.emtyGuid) {
                this.goodsReceiptPORepository.create(goodsReceiptPOEntity).subscribe(res => {
                    if (res) {
                        this.toastrService.success('Cập nhật thành công !');
                        resolve();
                    }
                }, err => {
                    if (err) {
                        this.goodsReceiptPOForm.next(this.fb.group(
                            new GoodsReceiptPOForm(err),
                        ));
                    }
                });
            } else {
                this.goodsReceiptPORepository.update(goodsReceiptPOEntity).subscribe(res => {
                    if (res) {
                        this.toastrService.success('Cập nhật thành công !');
                        resolve();
                    }
                }, err => {
                    if (err) {
                        this.goodsReceiptPOForm.next(this.fb.group(
                            new GoodsReceiptPOForm(err),
                        ));
                    }
                });
            }
        });
        return defered;
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

    // requester:
    dropListRequester(goodsReceiptPOListRequesterSearchEntity: GoodsReceiptPORequesterSearchEntity) {
        this.goodsReceiptPORepository.dropListRequester(goodsReceiptPOListRequesterSearchEntity).subscribe(res => {
            if (res) {
                this.requesterList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchRequester(goodsReceiptPOListRequesterSearchEntity: Observable<GoodsReceiptPORequesterSearchEntity>) {
        goodsReceiptPOListRequesterSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListRequester(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.requesterList.next(res);
                }
            });
    }

    // inventoryOrganization:
    dropListInvetoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity: GoodsReceiptPOInventoryOrganizationSearchEntity) {
        this.goodsReceiptPORepository.dropListRequester(goodsReceiptPOInventoryOrganizationSearchEntity).subscribe(res => {
            if (res) {
                this.requesterList.next(res);
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
                return this.goodsReceiptPORepository.dropListRequester(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.requesterList.next(res);
                }
            });
    }
}
