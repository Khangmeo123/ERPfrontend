import { ItemForm } from './../../../../../_backend/item/item.form';
import { UomSearchEntity } from './../../../../../_backend/uom/uom.searchentity';
import { EnumEntity, Entities } from './../../../../../../../_helpers/entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ItemDetailRepository } from './item-detail.repository';
import { environment } from 'src/environments/environment';

@Injectable()
export class ItemDetailService {
  public itemForm: BehaviorSubject<FormGroup>;
  public itemListCount: BehaviorSubject<number>;
  public uomList: BehaviorSubject<Entities>;
  public statusList: BehaviorSubject<EnumEntity[]>;
  public characteristicList: BehaviorSubject<EnumEntity[]>;
  constructor(private fb: FormBuilder, private itemDetailRepository: ItemDetailRepository, private toastrService: ToastrService) {
    this.itemForm = new BehaviorSubject(this.fb.group(
      new ItemForm(),
    ));
    this.uomList = new BehaviorSubject(new Entities());
    this.itemListCount = new BehaviorSubject(0);
    this.statusList = new BehaviorSubject([]);
    this.characteristicList = new BehaviorSubject([]);
  }

  getId(itemId?) {
    if (itemId !== null && itemId !== undefined) {
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

  save(itemEntity: any): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (itemEntity.id === null || itemEntity.id === undefined || itemEntity.id === environment.emptyGuid) {
        this.itemDetailRepository.add(itemEntity).subscribe(res => {
          if (res) {
            this.toastrService.success('Cập nhật thành công !');
            resolve();
          }
        }, err => {
          if (err) {
            this.itemForm.next(this.fb.group(
              new ItemForm(err),
            ));
          }
        });
      } else {
        this.itemDetailRepository.update(itemEntity).subscribe(res => {
          if (res) {
            this.toastrService.success('Cập nhật thành công !');
            resolve();
          }
        }, err => {
          if (err) {
            this.itemForm.next(this.fb.group(
              new ItemForm(err),
            ));
          }
        });
      }
    });
    return defered;
  }

  deactivate(itemEntity: any): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.itemDetailRepository.deactivate(itemEntity).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
          resolve();
        }
      }, err => {
        if (err) {
          this.itemForm.next(this.fb.group(
            new ItemForm(err),
          ));
        }
      });
    });
    return defered;
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
    });
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
    });
  }

  getCharacteristicList() {
    this.itemDetailRepository.getCharacteristicList().subscribe(res => {
      if (res) {
        this.characteristicList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }
}
