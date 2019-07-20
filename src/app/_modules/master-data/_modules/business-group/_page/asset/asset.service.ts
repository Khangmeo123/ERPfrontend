import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { AssetRepository } from './asset.repository';
import { AssetForm } from 'src/app/_modules/master-data/_backend/asset/asset.form';
import { ToastrService } from 'ngx-toastr';
import { AssetEntity } from 'src/app/_modules/master-data/_backend/asset/asset.entity';
import { AssetSearchEntity } from 'src/app/_modules/master-data/_backend/asset/asset.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';

@Injectable()
export class AssetService {
  public assetList: BehaviorSubject<AssetEntity[]>;
  public assetForm: BehaviorSubject<FormGroup>;
  public assetCount: BehaviorSubject<number>;
  public assetTypes: BehaviorSubject<EnumEntity[]>;
  public assetStatuses: BehaviorSubject<EnumEntity[]>;
  constructor(private fb: FormBuilder, private assetRepository: AssetRepository, private toastrService: ToastrService) {
    this.assetCount = new BehaviorSubject(0);
    this.assetList = new BehaviorSubject([]);
    this.assetTypes = new BehaviorSubject([]);
    this.assetStatuses = new BehaviorSubject([]);
    this.assetForm = new BehaviorSubject(this.fb.group(
      new AssetForm(),
    ));
  }

  getList(assetSearchEntity: AssetSearchEntity) {
    forkJoin(this.assetRepository.getList(assetSearchEntity),
      this.assetRepository.count(assetSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.assetList.next(list);
        }
        if (count) {
          this.assetCount.next(count);
        }
      });
  }

  add() {
    this.assetForm.next(this.fb.group(
      new AssetForm(),
    ));
  }

  edit(assetId: string) {
    this.assetRepository.getId(assetId).subscribe(res => {
      if (res) {
        this.assetForm.next(this.fb.group(
          new AssetForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(assetEntity: any, assetSearchEntity: AssetSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (assetEntity.id === null || assetEntity.id === undefined) {
        this.assetRepository.add(assetEntity).subscribe(res => {
          if (res) {
            this.getList(assetSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.assetForm.next(this.fb.group(
              new AssetForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.assetRepository.update(assetEntity).subscribe(res => {
          if (res) {
            this.getList(assetSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.assetForm.next(this.fb.group(
              new AssetForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(assetEntity: any, assetSearchEntity: AssetSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.assetRepository.delete(assetEntity).subscribe(res => {
        if (res) {
          this.getList(assetSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.assetForm.next(this.fb.group(
            new AssetForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }

  getTypeList() {
    this.assetRepository.getTypeList().subscribe(res => {
      if (res) {
        this.assetTypes.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    })
  }

  getStatusList() {
    this.assetRepository.getStatusList().subscribe(res => {
      if (res) {
        this.assetStatuses.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    })
  }
}
