import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Entities } from 'src/app/_helpers/entity';
import { ItemOfLegalEntityRepository } from './item-of-legal-entity.repository';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { SobSearchEntity } from 'src/app/_modules/master-data/_backend/sob/sob.searchentity';

export class ItemOfLegalEntityService {
    public legalList: BehaviorSubject<LegalEntity[]>;
    public legalCount: BehaviorSubject<number>;
    public itemList: BehaviorSubject<Entities>;
    public itemsFromLegalList: BehaviorSubject<ItemEntity[]>;
    public itemsFromLegalCount: BehaviorSubject<number>;
    public sobList: BehaviorSubject<Entities>;
    constructor(
        private fb: FormBuilder,
        private itemOflegalEntityRepository: ItemOfLegalEntityRepository,
        private toastrService: ToastrService) {
        this.legalList = new BehaviorSubject([]);
        this.legalCount = new BehaviorSubject(0);
        this.itemsFromLegalList = new BehaviorSubject([]);
        this.itemsFromLegalCount = new BehaviorSubject(0);
        this.itemList = new BehaviorSubject(new Entities());
        this.sobList = new BehaviorSubject(new Entities());
    }

    getLegalList(legalSearchEntity: LegalSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.itemOflegalEntityRepository.getLegalList(legalSearchEntity),
                this.itemOflegalEntityRepository.countlegal(legalSearchEntity)).subscribe(([list, count]) => {
                    if (list) {
                        this.legalList.next(list);
                    }
                    if (count) {
                        this.legalCount.next(count);
                    }
                    resolve(true);
                }, err => {
                    reject(false);
                });
        });
        return defered;
    }

    getItemsFromLegal(itemSearchEntity: ItemSearchEntity) {
        forkJoin(this.itemOflegalEntityRepository.getItemsFromLegal(itemSearchEntity),
            this.itemOflegalEntityRepository.countItemsFromLegal(itemSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.itemsFromLegalList.next(list);
                }
                if (count) {
                    this.itemsFromLegalCount.next(count);
                }
            }, err => {
                if (err) {
                    console.log(err);
                }
            });
    }

    dropDownItemList(itemSearchEntity: ItemSearchEntity) {
        this.itemOflegalEntityRepository.dropDownItemList(itemSearchEntity).subscribe(res => {
            if (res) {
                this.itemList.next(res);
            }
        }, err => {
            console.log(err);
        });
    }

    searchTypingItemList(itemSearchEntity: Observable<ItemSearchEntity>) {
        itemSearchEntity.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(res => {
                return this.itemOflegalEntityRepository.dropDownItemList(res);
            })
        ).subscribe(res => {
            this.itemList.next(res);
        });
    }

    dropDownSobList(sobSearchEntity: SobSearchEntity) {
        this.itemOflegalEntityRepository.dropDownSobList(sobSearchEntity).subscribe(res => {
            if (res) {
                this.sobList.next(res);
            }
        }, err => {
            console.log(err);
        });
    }

    searchTypingSobList(sobSearchEntity: Observable<SobSearchEntity>) {
        sobSearchEntity.pipe(
            debounceTime(400),
            distinctUntilChanged(),
            switchMap(res => {
                return this.itemOflegalEntityRepository.dropDownSobList(res);
            })
        ).subscribe(res => {
            this.sobList.next(res);
        });
    }

    addItemsToLegal(itemIds: string[], legalId: string) {
        this.itemOflegalEntityRepository.addItemsToLegal(itemIds, legalId).subscribe(res => {
            if (res) {
                this.toastrService.success('Hệ thống cập nhật thành công!');
            }
        });
    }
}
