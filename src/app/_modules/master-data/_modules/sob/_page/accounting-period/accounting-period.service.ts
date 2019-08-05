import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Entities } from 'src/app/_helpers/entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { AccountingPeriodRepository } from './accounting-period.repository';
import { AccountingPeriodEntity } from '../../../../_backend/accounting-period/accounting-period.entity';
import { AccountingPeriodForm } from '../../../../_backend/accounting-period/accounting-period.form';
import { AccountingPeriodSearchEntity } from '../../../../_backend/accounting-period/accounting-period.searchentity';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';

export class AccountingPeriodService {
  public accountingPeriodList: BehaviorSubject<AccountingPeriodEntity[]>;

  public accountingPeriodCount: BehaviorSubject<number>;

  public accountingPeriodForm: BehaviorSubject<FormGroup>;

  public coaList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public fiscalYearList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public periodTypeList: BehaviorSubject<any[]> = new BehaviorSubject([]);

  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

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
        this.accountingPeriodCount.next(count);
      }
    });
  }

  getPeriodTypeList() {
    this.accountingPeriodRepository.getPeriodTypeList()
      .subscribe((list) => {
        if (list) {
          this.periodTypeList.next(list);
        }
      });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.accountingPeriodRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        this.sobList.next(list);
      });
  }

  getFiscalYearList(fiscalYearSearchEntity: FiscalYearSearchEntity) {
    this.accountingPeriodRepository.getFiscalYearList(fiscalYearSearchEntity)
      .subscribe((list: Entities) => {
        this.fiscalYearList.next(list);
      });
  }

  getCoaList(coaSearchEntity: CoaSearchEntity) {
    this.accountingPeriodRepository.getCoaList(coaSearchEntity)
      .subscribe((list: Entities) => {
        this.coaList.next(list);
      });
  }

  add() {
    this.accountingPeriodForm.next(this.fb.group(
      new AccountingPeriodForm(),
    ));
  }

  cancel() {
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
    return new Promise<boolean>((resolve, reject) => {
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

  }

  deactivate(accountingPeriodEntity: any, accountingPeriodSearchEntity: AccountingPeriodSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.accountingPeriodRepository.deactivate(accountingPeriodEntity).subscribe(res => {
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

  }
}
