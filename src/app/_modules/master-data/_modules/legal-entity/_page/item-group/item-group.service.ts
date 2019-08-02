import { ItemSearchEntity } from './../../../../_backend/item/item.searchentity';
import { ItemGroupSearchEntity } from 'src/app/_modules/master-data/_backend/item-group/item-group.searchentity';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { ItemGroupRepository } from './item-group.repository';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { ItemGroupEntity } from 'src/app/_modules/master-data/_backend/item-group/item-group.entity';
import { ItemGroupForm } from 'src/app/_modules/master-data/_backend/item-group/item-group.form';
import { environment } from 'src/environments/environment';

export class ItemGroupService {
    public legalEntityList: BehaviorSubject<Entities>;
    public itemGroupList: BehaviorSubject<ItemGroupEntity[]>;
    public itemGroupCount: BehaviorSubject<number>;
    public itemGroupForm: BehaviorSubject<FormGroup>;
    public itemList: BehaviorSubject<Entities>;
    public itemsFromItemGroupList: BehaviorSubject<ItemEntity[]>;
    public itemsFromItemGroupCount: BehaviorSubject<number>;
    constructor(
        private fb: FormBuilder,
        private itemGroupRepository: ItemGroupRepository,
        private toastrService: ToastrService) {
        this.legalEntityList = new BehaviorSubject(new Entities());
        this.itemGroupList = new BehaviorSubject([]);
        this.itemGroupCount = new BehaviorSubject(0);
        this.itemGroupForm = new BehaviorSubject(this.fb.group(new ItemGroupForm()));
        this.itemList = new BehaviorSubject(new Entities());
        this.itemsFromItemGroupList = new BehaviorSubject([]);
        this.itemsFromItemGroupCount = new BehaviorSubject(0);
    }

    dropDownLegalEntity(legalSearchEntity: LegalSearchEntity) {
        this.itemGroupRepository.dropDownLegalList(legalSearchEntity).subscribe(res => {
            if (res) {
                this.legalEntityList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    searchTypingLegalEntity(legalSearchEntity: Observable<LegalSearchEntity>) {
        legalSearchEntity.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(res => {
                return this.itemGroupRepository.dropDownLegalList(res);
            }),
        ).subscribe(res => {
            this.legalEntityList.next(res);
        });
    }

    getItemGroupListFromLegal(itemGroupSearchEntity: ItemGroupSearchEntity) {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.itemGroupRepository.getItemGroupsListFromLegal(itemGroupSearchEntity),
                this.itemGroupRepository.countItemGroupsFromLegal(itemGroupSearchEntity)).subscribe(([list, count]) => {
                    if (list) {
                        this.itemGroupList.next(list);
                    }
                    if (count) {
                        this.itemGroupCount.next(count);
                    }
                    resolve(true);
                }, err => {
                    reject(false);
                });
        });
        return defered;
    }

    addItemGroupFromLegal(legalEntityId: string) {
        const itemGroupForm = this.fb.group(new ItemGroupForm());
        itemGroupForm.controls.legalEntityId.setValue(legalEntityId);
        this.itemGroupForm.next(itemGroupForm);
    }

    editItemGroupFromLegal(itemGroupId: string) {
        this.itemGroupRepository.getItemGroupIdFromLegal(itemGroupId).subscribe(res => {
            this.itemGroupForm.next(this.fb.group(new ItemGroupForm(res)));
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    saveItemGroupToLegal(itemGroupEntity: any, itemGroupSearchEntity: ItemGroupSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            if (itemGroupEntity.id === null || itemGroupEntity.id === undefined || itemGroupEntity.id === environment.emtyGuid) {
                this.itemGroupRepository.addItemGroupsFromLegal(itemGroupEntity).subscribe(res => {
                    if (res) {
                        this.getItemGroupListFromLegal(itemGroupSearchEntity);
                        this.toastrService.success('Cập nhật thành công !');
                        resolve(false);
                    }
                }, err => {
                    if (err) {
                        this.itemGroupForm.next(this.fb.group(
                            new ItemGroupForm(err),
                        ));
                        reject(true);
                    }
                });
            } else {
                this.itemGroupRepository.updateItemGroupsFromLegal(itemGroupEntity).subscribe(res => {
                    if (res) {
                        this.getItemGroupListFromLegal(itemGroupSearchEntity);
                        this.toastrService.success('Cập nhật thành công !');
                        resolve(false);
                    }
                }, err => {
                    if (err) {
                        this.itemGroupForm.next(this.fb.group(
                            new ItemGroupForm(err),
                        ));
                        reject(true);
                    }
                });
            }
        });
        return defered;
    }

    dropDownItemList(itemSearchEntity: ItemSearchEntity) {
        this.itemGroupRepository.dropDownItemList(itemSearchEntity).subscribe(res => {
            if (res) {
                this.itemList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    searchTypingItemList(itemSearchEntity: Observable<ItemSearchEntity>) {
        itemSearchEntity.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(res => {
                return this.itemGroupRepository.dropDownItemList(res);
            }),
        ).subscribe(res => {
            this.itemList.next(res);
        });
    }

    getItemsFromItemGroup(itemSearchEntity: ItemSearchEntity) {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.itemGroupRepository.getItemsFromItemGroup(itemSearchEntity),
                this.itemGroupRepository.countItemsFromItemGroup(itemSearchEntity)).subscribe(([list, count]) => {
                    if (list) {
                        this.itemsFromItemGroupList.next(list);
                    }
                    if (count) {
                        this.itemsFromItemGroupCount.next(count);
                    }
                    resolve(true);
                }, err => {
                    reject(false);
                });
        });
        return defered;
    }

    addItemsToItemGroup(itemIds: string[], itemGroupId: string): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.itemGroupRepository.addItemsToItemGroup(itemIds, itemGroupId).subscribe(res => {
                if (res) {
                    this.toastrService.success('Hệ thống cập nhật thành công!');
                    resolve(res);
                }
            }, err => {
                if (err) {
                    reject(err);
                }
            });
        });
        return defered;
    }

    deleteItemFromItemGroup(itemId: string, itemGroupId: string): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.itemGroupRepository.deleteItemFromItemGroup(itemId, itemGroupId).subscribe(res => {
                if (res) {
                    this.toastrService.success('Hệ thống cập nhật thành công!');
                    resolve(res);
                }
            }, err => {
                if (err) {
                    reject(err);
                }
            });
        });
        return defered;
    }
}
