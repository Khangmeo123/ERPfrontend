import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobRepository } from './sob.repository';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobForm } from '../../../../_backend/sob/sob.form';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';

export class SobService {
  public sobList: BehaviorSubject<SobEntity[]>;
  public currencyList: BehaviorSubject<CurrencyEntity[]>;
  public sobCount: BehaviorSubject<number>;
  public currencyCount: BehaviorSubject<number>;
  public sobForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private sobRepository: SobRepository, private toastrService: ToastrService) {
    this.sobCount = new BehaviorSubject(0);
    this.sobList = new BehaviorSubject([]);
    this.currencyList = new BehaviorSubject([]);
    this.sobForm = new BehaviorSubject(this.fb.group(
      new SobForm(),
    ));
  }

  getList(sobSearchEntity: SobSearchEntity) {
    forkJoin(this.sobRepository.getList(sobSearchEntity),
      this.sobRepository.count(sobSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.sobList.next(list);
      }
      if (count) {
        this.currencyCount.next(count);
      }
    });
  }

  getCurrencyList(currencySearchEntity: CurrencySearchEntity) {
    forkJoin(this.sobRepository.getCurrencyList(currencySearchEntity),
      this.sobRepository.countCurrency(currencySearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.currencyList.next(list);
      }
      if (count) {
        this.sobCount.next(count);
      }
    });
  }

  add() {
    this.sobForm.next(this.fb.group(
      new SobForm(),
    ));
  }

  edit(sobId: string) {
    this.sobRepository.getId(sobId).subscribe(res => {
      if (res) {
        this.sobForm.next(this.fb.group(
          new SobForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(sobEntity: any, sobSearchEntity: SobSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (sobEntity.id === null || sobEntity.id === undefined) {
        this.sobRepository.add(sobEntity).subscribe(res => {
          if (res) {
            this.getList(sobSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.sobForm.next(this.fb.group(
              new SobForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.sobRepository.update(sobEntity).subscribe(res => {
          if (res) {
            this.getList(sobSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.sobForm.next(this.fb.group(
              new SobForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(sobEntity: any, sobSearchEntity: SobSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.sobRepository.delete(sobEntity).subscribe(res => {
        if (res) {
          this.getList(sobSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.sobForm.next(this.fb.group(
            new SobForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
