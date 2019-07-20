import { ItemForm } from './../../../../../_backend/item/item.form';
import { UomSearchEntity } from './../../../../../_backend/uom/uom.searchentity';
import { EnumEntity, Entities } from './../../../../../../../_helpers/entity';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UomEntity } from 'src/app/_modules/master-data/_backend/uom/uom.entity';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ItemDetailRepository } from './item-detail.repository';

@Injectable({
  providedIn: 'root',
})
export class ItemDetailService {
  public itemForm: BehaviorSubject<FormGroup>;
  public itemListCount: BehaviorSubject<number>;
  public uomList: BehaviorSubject<Entities>;
  public statusList: BehaviorSubject<EnumEntity[]>;
  constructor(private fb: FormBuilder, private itemDetailRepository: ItemDetailRepository, private toastrService: ToastrService) {
    this.itemForm = new BehaviorSubject(this.fb.group(
      new ItemForm(),
    ));
    this.uomList = new BehaviorSubject(new Entities());
    this.itemListCount = new BehaviorSubject(0);
    this.statusList = new BehaviorSubject([]);
  }

  getId(itemId?) {
    if (itemId === null || itemId === undefined) {
      this.itemForm.next(this.fb.group(
        new ItemForm(),
      ));
    } else {
      this.itemDetailRepository.getId(itemId).subscribe(res => {
        if (res) {
          this.itemForm.next(this.fb.group(
            new ItemForm(res),
          ));
        }
      }, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  save(itemEntity: any) {
    if (itemEntity.id === null || itemEntity.id === undefined) {
      this.itemDetailRepository.add(itemEntity).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
        }
      }, err => {
        if (err) {
          this.itemForm.next(this.fb.group(
            new ItemForm(err),
          ))
        }
      });
    } else {
      this.itemDetailRepository.update(itemEntity).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
        }
      }, err => {
        if (err) {
          this.itemForm.next(this.fb.group(
            new ItemForm(err),
          ));
        }
      });
    }
  }

  delete(itemEntity: any) {
    this.itemDetailRepository.delete(itemEntity).subscribe(res => {
      if (res) {
        this.toastrService.success('Cập nhật thành công !');
      }
    }, err => {
      if (err) {
        this.itemForm.next(this.fb.group(
          new ItemForm(err),
        ));
      }
    });
  }

  getUomList(uomSearchEntity: UomSearchEntity) {
    this.itemDetailRepository.getUomList(uomSearchEntity).subscribe(res => {
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
        return this.itemDetailRepository.getUomList(searchEntity);
      })).subscribe(res => {
        if (res) {
          this.uomList.next(res);
        }
      });
  }

  getStatusList() {
    this.itemDetailRepository.getStatusList().subscribe(res => {
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
