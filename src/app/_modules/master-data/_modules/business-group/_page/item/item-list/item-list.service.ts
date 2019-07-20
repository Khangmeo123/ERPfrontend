import { UomSearchEntity } from './../../../../../_backend/uom/uom.searchentity';
import { EnumEntity, Entities } from './../../../../../../../_helpers/entity';
import { ItemListRepository } from './item-list.repository';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UomEntity } from 'src/app/_modules/master-data/_backend/uom/uom.entity';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ItemListService {
  public itemList: BehaviorSubject<ItemEntity[]>;
  public itemListCount: BehaviorSubject<number>;
  public uomList: BehaviorSubject<Entities>;
  public statusList: BehaviorSubject<EnumEntity[]>;
  constructor(private fb: FormBuilder, private itemListRepository: ItemListRepository, private toastrService: ToastrService) {
    this.itemList = new BehaviorSubject([]);
    this.uomList = new BehaviorSubject(new Entities());
    this.itemListCount = new BehaviorSubject(0);
    this.statusList = new BehaviorSubject([]);
  }

  getList(itemSearchEntity: ItemSearchEntity) {
    forkJoin(this.itemListRepository.getList(itemSearchEntity),
      this.itemListRepository.count(itemSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.itemList.next(list);
        }
        if (count) {
          this.itemListCount.next(count);
        }
      });
  }

  getUomList(uomSearchEntity: UomSearchEntity) {
    this.itemListRepository.getUomList(uomSearchEntity).subscribe(res => {
      if (res) {
        this.uomList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    })
  }

  getUomListByTyping(uomSearchEntity: Observable<UomSearchEntity>) {
    uomSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.itemListRepository.getUomList(searchEntity);
      })).subscribe(res => {
        if (res) {
          this.uomList.next(res);
        }
      });
  }

  getStatusList() {
    this.itemListRepository.getStatusList().subscribe(res => {
      if (res) {
        this.statusList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    })
  }
}
