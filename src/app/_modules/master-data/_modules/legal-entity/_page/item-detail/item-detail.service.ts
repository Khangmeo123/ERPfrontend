import { removeItemByIndex } from './../../../../../../_helpers/array.helper';
import { ItemDiscount } from './../../../../_backend/legal-item-detail/legal-item-detail.entity';
import { UomSearchEntity } from './../../../../_backend/uom/uom.searchentity';
import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { CoaSearchEntity } from './../../../../_backend/coa/coa.searchentity';
import { Entities, EnumEntity } from './../../../../../../_helpers/entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { LegalItemDetailForm, ItemDiscountForm, ItemMaterialForm } from './../../../../_backend/legal-item-detail/legal-item-detail.form';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LegalItemDetailRepository } from './item-detail.repository';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export class LegalItemDetailService {
    public legalItemDetailForm: BehaviorSubject<FormGroup>;
    public itemDiscountForm: BehaviorSubject<FormGroup>;
    public itemMaterialForm: BehaviorSubject<FormGroup>;
    public invetoryAccountList: BehaviorSubject<Entities>;
    public returnAccountList: BehaviorSubject<Entities>;
    public salesAllowancesAccountList: BehaviorSubject<Entities>;
    public expenseAccountList: BehaviorSubject<Entities>;
    public revenueAccountList: BehaviorSubject<Entities>;
    public discountAccountList: BehaviorSubject<Entities>;
    public itemList: BehaviorSubject<Entities>;
    public uomList: BehaviorSubject<Entities>;
    public discountTypeList: BehaviorSubject<EnumEntity[]>;
    constructor(
        private fb: FormBuilder,
        private legalItemDetailRepository: LegalItemDetailRepository,
        private toastrService: ToastrService) {
        this.legalItemDetailForm = new BehaviorSubject(this.fb.group(new LegalItemDetailForm()));
        this.itemDiscountForm = new BehaviorSubject(this.fb.group(new ItemDiscountForm()));
        this.itemMaterialForm = new BehaviorSubject(this.fb.group(new ItemMaterialForm()));
        this.invetoryAccountList = new BehaviorSubject(new Entities());
        this.returnAccountList = new BehaviorSubject(new Entities());
        this.salesAllowancesAccountList = new BehaviorSubject(new Entities());
        this.expenseAccountList = new BehaviorSubject(new Entities());
        this.revenueAccountList = new BehaviorSubject(new Entities());
        this.discountAccountList = new BehaviorSubject(new Entities());
        this.itemList = new BehaviorSubject(new Entities());
        this.uomList = new BehaviorSubject(new Entities());
        this.discountTypeList = new BehaviorSubject([]);
    }

    getLegalItemDetail(legalItemDetailId?: string) {
        if (legalItemDetailId === null || legalItemDetailId === undefined) {
            this.legalItemDetailForm.next(this.fb.group(
                new LegalItemDetailForm(),
            ));
        } else {
            this.legalItemDetailRepository.getLegalItemDetail(legalItemDetailId).subscribe(res => {
                if (res) {
                    this.legalItemDetailForm.next(this.fb.group(
                        new LegalItemDetailForm(res),
                    ));
                }
            }, err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    updateLegalItemDetail(legalItemDetail: any): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.legalItemDetailRepository.updateLegalItemDetail(legalItemDetail).subscribe(res => {
                if (res) {
                    this.toastrService.success('Cập nhật thành công !');
                    resolve(true);
                }
            }, err => {
                if (err) {
                    this.legalItemDetailForm.next(this.fb.group(new LegalItemDetailForm(err)));
                }
            });
        });
        return defered;
    }

    getDiscountTypeList() {
        this.legalItemDetailRepository.dropdownDiscountType().subscribe(res => {
            if (res) {
                this.discountTypeList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    // invetoryAccount
    getInvetoryAccountList(coaSearchEntity: CoaSearchEntity) {
        this.legalItemDetailRepository.dropDownCoa(coaSearchEntity).subscribe(res => {
            if (res) {
                this.invetoryAccountList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchInvetoryAccount(coaSearchEntity: Observable<CoaSearchEntity>) {
        coaSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.legalItemDetailRepository.dropDownCoa(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.invetoryAccountList.next(res);
                }
            });
    }

    // returnAccount:
    getReturnAccountList(coaSearchEntity: CoaSearchEntity) {
        this.legalItemDetailRepository.dropDownCoa(coaSearchEntity).subscribe(res => {
            if (res) {
                this.returnAccountList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchReturnAccount(coaSearchEntity: Observable<CoaSearchEntity>) {
        coaSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.legalItemDetailRepository.dropDownCoa(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.returnAccountList.next(res);
                }
            });
    }

    // salesAllowancesAccount:
    getSalesAllowancesAccountList(coaSearchEntity: CoaSearchEntity) {
        this.legalItemDetailRepository.dropDownCoa(coaSearchEntity).subscribe(res => {
            if (res) {
                this.salesAllowancesAccountList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchSalesAllowancesAccount(coaSearchEntity: Observable<CoaSearchEntity>) {
        coaSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.legalItemDetailRepository.dropDownCoa(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.salesAllowancesAccountList.next(res);
                }
            });
    }

    // expenseAccount:
    getExpenseAccountList(coaSearchEntity: CoaSearchEntity) {
        this.legalItemDetailRepository.dropDownCoa(coaSearchEntity).subscribe(res => {
            if (res) {
                this.expenseAccountList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchExpenseAccount(coaSearchEntity: Observable<CoaSearchEntity>) {
        coaSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.legalItemDetailRepository.dropDownCoa(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.expenseAccountList.next(res);
                }
            });
    }

    // revenueAccount:
    getRevenueAccountList(coaSearchEntity: CoaSearchEntity) {
        this.legalItemDetailRepository.dropDownCoa(coaSearchEntity).subscribe(res => {
            if (res) {
                this.revenueAccountList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchRevenueAccount(coaSearchEntity: Observable<CoaSearchEntity>) {
        coaSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.legalItemDetailRepository.dropDownCoa(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.revenueAccountList.next(res);
                }
            });
    }

    // discountAccount:
    getDiscountAccountList(coaSearchEntity: CoaSearchEntity) {
        this.legalItemDetailRepository.dropDownCoa(coaSearchEntity).subscribe(res => {
            if (res) {
                this.discountAccountList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchDiscountAccount(coaSearchEntity: Observable<CoaSearchEntity>) {
        coaSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.legalItemDetailRepository.dropDownCoa(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.discountAccountList.next(res);
                }
            });
    }

    // item:
    getItemList(itemSearchEntity: ItemSearchEntity) {
        this.legalItemDetailRepository.dropDownItemList(itemSearchEntity).subscribe(res => {
            if (res) {
                this.itemList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchItem(itemSearchEntity: Observable<ItemSearchEntity>) {
        itemSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.legalItemDetailRepository.dropDownItemList(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.itemList.next(res);
                }
            });
    }

    // uom:
    getUomList(uomSearchEntity: UomSearchEntity) {
        this.legalItemDetailRepository.dropDownUom(uomSearchEntity).subscribe(res => {
            if (res) {
                this.uomList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchUom(uomSearchEntity: Observable<UomSearchEntity>) {
        uomSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.legalItemDetailRepository.dropDownUom(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.uomList.next(res);
                }
            });
    }

    // itemDiscounts:
    addItemDiscount() {
        this.itemDiscountForm.next(this.fb.group(new ItemDiscountForm()));
    }

    editItemDiscount(itemDiscount: any) {
        const itemDiscountEntity = this.fb.group(new ItemDiscountForm(itemDiscount));
        this.itemDiscountForm.next(itemDiscountEntity);
    }

    saveItemDiscount(itemDiscount: any, index: number) {
        const currentLegalItemDetail = this.legalItemDetailForm.getValue();
        const currentItemDiscount = currentLegalItemDetail.get('itemDiscounts') as FormArray;
        if (index >= 0) {
            currentItemDiscount.controls[index].patchValue(itemDiscount);
        } else {
            currentItemDiscount.push(this.fb.group(new ItemDiscountForm(itemDiscount)));
        }
        this.legalItemDetailForm.next(currentLegalItemDetail);
    }

    deleteItemDiscount(index: number) {
        const currentLegalItemDetail = this.legalItemDetailForm.getValue();
        const currentItemDiscount = currentLegalItemDetail.get('itemDiscounts') as FormArray;
        currentItemDiscount.removeAt(index);
        this.legalItemDetailForm.next(currentLegalItemDetail);
    }

    // itemMaterial:
    addItemMaterial() {
        this.itemMaterialForm.next(this.fb.group(new ItemMaterialForm()));
    }

    editItemMaterial(itemMaterial: any) {
        const itemMaterialEntity = this.fb.group(new ItemMaterialForm(itemMaterial));
        this.itemMaterialForm.next(itemMaterialEntity);
    }

    saveItemMaterial(itemMaterial: any, index: number) {
        const currentLegalItemDetail = this.legalItemDetailForm.getValue();
        const currentItemMaterial = currentLegalItemDetail.get('itemMaterials') as FormArray;
        if (index >= 0) {
            currentItemMaterial.controls[index].patchValue(itemMaterial);
        } else {
            currentItemMaterial.push(this.fb.group(new ItemMaterialForm(itemMaterial)));
        }
        this.legalItemDetailForm.next(currentLegalItemDetail);
    }

    deleteItemMaterial(index: number) {
        const currentLegalItemDetail = this.legalItemDetailForm.getValue();
        const currentItemMaterial = currentLegalItemDetail.get('itemMaterials') as FormArray;
        currentItemMaterial.removeAt(index);
        this.legalItemDetailForm.next(currentLegalItemDetail);
    }
}
