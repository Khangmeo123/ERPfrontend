import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EnvironmentTaxRepository } from './environment-tax.repository';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';
import { EnvironmentTaxForm } from '../../../../_backend/environment-tax/environment-tax.form';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.searchEntity';

export class EnvironmentTaxService {
  public environmentTaxList: BehaviorSubject<EnvironmentTaxEntity[]>;
  public environmentTaxCount: BehaviorSubject<number>;
  public environmentTaxForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private environmentTaxRepository: EnvironmentTaxRepository, private toastrService: ToastrService) {
    this.environmentTaxCount = new BehaviorSubject(0);
    this.environmentTaxList = new BehaviorSubject([]);
    this.environmentTaxForm = new BehaviorSubject(this.fb.group(
      new EnvironmentTaxForm(),
    ));
  }

  getList(environmentTaxSearchEntity: EnvironmentTaxSearchEntity) {
    forkJoin(this.environmentTaxRepository.getList(environmentTaxSearchEntity),
      this.environmentTaxRepository.count(environmentTaxSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.environmentTaxList.next(list);
      }
      if (count) {
        this.environmentTaxCount.next(count);
      }
    });
  }

  add() {
    this.environmentTaxForm.next(this.fb.group(
      new EnvironmentTaxForm(),
    ));
  }

  edit(environmentTaxId: string) {
    this.environmentTaxRepository.getId(environmentTaxId).subscribe(res => {
      if (res) {
        this.environmentTaxForm.next(this.fb.group(
          new EnvironmentTaxForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(environmentTaxEntity: any, environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (environmentTaxEntity.id === null || environmentTaxEntity.id === undefined) {
        this.environmentTaxRepository.add(environmentTaxEntity).subscribe(res => {
          if (res) {
            this.getList(environmentTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.environmentTaxForm.next(this.fb.group(
              new EnvironmentTaxForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.environmentTaxRepository.update(environmentTaxEntity).subscribe(res => {
          if (res) {
            this.getList(environmentTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.environmentTaxForm.next(this.fb.group(
              new EnvironmentTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(environmentTaxEntity: any, environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.environmentTaxRepository.delete(environmentTaxEntity).subscribe(res => {
        if (res) {
          this.getList(environmentTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.environmentTaxForm.next(this.fb.group(
            new EnvironmentTaxForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
