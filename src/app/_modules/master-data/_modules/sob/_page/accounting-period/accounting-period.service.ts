import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountingPeriodForm } from '../../../../_backend/accounting-period/accounting-period.form';
import { AccountingPeriodEntity } from '../../../../_backend/accounting-period/accounting-period.entity';
import { AccountingPeriodRepository } from './accounting-period.repository';
import { AccountingPeriodSearchEntity } from '../../../../_backend/accounting-period/accounting-period.searchentity';

export class AccountingPeriodService {
  public accountingPeriodList: BehaviorSubject<AccountingPeriodEntity[]>;
  public accountingPeriodCount: BehaviorSubject<number>;
  public currencyCount: BehaviorSubject<number>;
  public accountingPeriodForm: BehaviorSubject<FormGroup>;

  constructor(
    private fb: FormBuilder,
    private accountingPeriodRepository: AccountingPeriodRepository,
    private toastrService: ToastrService,
  ) {
    this.accountingPeriodCount = new BehaviorSubject(0);
    this.accountingPeriodList = new BehaviorSubject([]);
    this.accountingPeriodForm = new BehaviorSubject(this.fb.group(
      new AccountingPeriodForm(),
    ));
  }

  getList(accountingPeriodSearchEntity: AccountingPeriodSearchEntity) {
    forkJoin(this.accountingPeriodRepository.getList(accountingPeriodSearchEntity),
      this.accountingPeriodRepository.count(accountingPeriodSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.accountingPeriodList.next(list);
      }
      if (count) {
        this.currencyCount.next(count);
      }
    });
  }

  add() {
    this.accountingPeriodForm.next(this.fb.group(
      new AccountingPeriodForm(),
    ));
  }

  edit(accountingPeriodId: string) {
    this.accountingPeriodRepository.getId(accountingPeriodId).subscribe(res => {
      if (res) {
        this.accountingPeriodForm.next(this.fb.group(
          new AccountingPeriodForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(accountingPeriodEntity: any, accountingPeriodSearchEntity: AccountingPeriodSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (accountingPeriodEntity.id === null || accountingPeriodEntity.id === undefined) {
        this.accountingPeriodRepository.add(accountingPeriodEntity).subscribe(res => {
          if (res) {
            this.getList(accountingPeriodSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.accountingPeriodForm.next(this.fb.group(
              new AccountingPeriodForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.accountingPeriodRepository.update(accountingPeriodEntity).subscribe(res => {
          if (res) {
            this.getList(accountingPeriodSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.accountingPeriodForm.next(this.fb.group(
              new AccountingPeriodForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(accountingPeriodEntity: any, accountingPeriodSearchEntity: AccountingPeriodSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.accountingPeriodRepository.delete(accountingPeriodEntity).subscribe(res => {
        if (res) {
          this.getList(accountingPeriodSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.accountingPeriodForm.next(this.fb.group(
            new AccountingPeriodForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
