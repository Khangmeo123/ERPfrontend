import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CurrencyRepository } from './currency.repository';
import { CurrencyForm } from 'src/app/_modules/master-data/_backend/currency/currency.form';
import { ToastrService } from 'ngx-toastr';
import { CurrencyEntity } from 'src/app/_modules/master-data/_backend/currency/currency.entity';
import { CurrencySearchEntity } from 'src/app/_modules/master-data/_backend/currency/currency.searchentity';
import { environment } from 'src/environments/environment';

@Injectable()
export class CurrencyService {
  public currencyList: BehaviorSubject<CurrencyEntity[]>;
  public currencyForm: BehaviorSubject<FormGroup>;
  public currencyCount: BehaviorSubject<number>;
  constructor(private fb: FormBuilder, private currencyRepository: CurrencyRepository, private toastrService: ToastrService) {
    this.currencyCount = new BehaviorSubject(0);
    this.currencyList = new BehaviorSubject([]);
    this.currencyForm = new BehaviorSubject(this.fb.group(
      new CurrencyForm(),
    ));
  }

  getList(currencySearchEntity: CurrencySearchEntity) {
    forkJoin(this.currencyRepository.getList(currencySearchEntity),
      this.currencyRepository.count(currencySearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.currencyList.next(list);
        }
        if (count) {
          this.currencyCount.next(count);
        }
      });
  }

  add() {
    this.currencyForm.next(this.fb.group(
      new CurrencyForm(),
    ));
  }

  edit(currencyId: string) {
    this.currencyRepository.getId(currencyId).subscribe(res => {
      if (res) {
        this.currencyForm.next(this.fb.group(
          new CurrencyForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(currencyEntity: any, currencySearchEntity: CurrencySearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (currencyEntity.id === null || currencyEntity.id === undefined || currencyEntity.id === environment.emptyGuid) {
        this.currencyRepository.add(currencyEntity).subscribe(res => {
          if (res) {
            this.getList(currencySearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.currencyForm.next(this.fb.group(
              new CurrencyForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.currencyRepository.update(currencyEntity).subscribe(res => {
          if (res) {
            this.getList(currencySearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.currencyForm.next(this.fb.group(
              new CurrencyForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(currencyEntity: any, currencySearchEntity: CurrencySearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.currencyRepository.delete(currencyEntity).subscribe(res => {
        if (res) {
          this.getList(currencySearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.currencyForm.next(this.fb.group(
            new CurrencyForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }

}
