import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UomRepository } from './uom.repository';
import { UomForm } from 'src/app/_modules/master-data/_backend/uom/uom.form';
import { ToastrService } from 'ngx-toastr';
import { UomEntity } from 'src/app/_modules/master-data/_backend/uom/uom.entity';
import { UomSearchEntity } from 'src/app/_modules/master-data/_backend/uom/uom.searchentity';
import { environment } from 'src/environments/environment';

@Injectable()
export class UomService {
  public uomList: BehaviorSubject<UomEntity[]>;
  public uomForm: BehaviorSubject<FormGroup>;
  public uomCount: BehaviorSubject<number>;
  constructor(private fb: FormBuilder, private uomRepository: UomRepository, private toastrService: ToastrService) {
    this.uomCount = new BehaviorSubject(0);
    this.uomList = new BehaviorSubject([]);
    this.uomForm = new BehaviorSubject(this.fb.group(
      new UomForm(),
    ));
  }

  getList(uomSearchEntity: UomSearchEntity) {
    forkJoin(this.uomRepository.getList(uomSearchEntity),
      this.uomRepository.count(uomSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.uomList.next(list);
        }
        if (count) {
          this.uomCount.next(count);
        }
      });
  }

  add() {
    this.uomForm.next(this.fb.group(
      new UomForm(),
    ));
  }

  edit(uomId: string) {
    this.uomRepository.getId(uomId).subscribe(res => {
      if (res) {
        this.uomForm.next(this.fb.group(
          new UomForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(uomEntity: any, uomSearchEntity: UomSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (uomEntity.id === null || uomEntity.id === undefined || uomEntity.id === environment.emtyGuid) {
        this.uomRepository.add(uomEntity).subscribe(res => {
          if (res) {
            this.getList(uomSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.uomForm.next(this.fb.group(
              new UomForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.uomRepository.update(uomEntity).subscribe(res => {
          if (res) {
            this.getList(uomSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.uomForm.next(this.fb.group(
              new UomForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(uomEntity: any, uomSearchEntity: UomSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.uomRepository.delete(uomEntity).subscribe(res => {
        if (res) {
          this.getList(uomSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.uomForm.next(this.fb.group(
            new UomForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }

}
