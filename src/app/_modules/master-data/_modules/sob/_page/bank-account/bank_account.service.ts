import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { BankAccountEntity } from '../../../../_backend/bank-account/bank-account.entity';
import { BankAccountRepository } from './bank_account.repository';
import { BankAccountForm } from '../../../../_backend/bank-account/bank-account.form';
import { BankAccountSearchEntity } from '../../../../_backend/bank-account/bank-account.searchentity';
import { ChartOfAccountSearchEntity } from '../../../../_backend/chart-of-account/chart-of-account.search-entity';

export class BankAccountService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public bankAccountList: BehaviorSubject<BankAccountEntity[]> = new BehaviorSubject([]);
  public bankAccountForm: BehaviorSubject<FormGroup>;
  public bankAccountCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public coaList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  constructor(private fb: FormBuilder, private bankAccountRepository: BankAccountRepository, private toastrService: ToastrService) {
    this.bankAccountCount = new BehaviorSubject(0);
    this.bankAccountForm = new BehaviorSubject(this.fb.group(
      new BankAccountForm(),
    ));
  }

  getCoaList(coaSearchEntity: ChartOfAccountSearchEntity) {
    this.bankAccountRepository.getCoaList(coaSearchEntity)
      .subscribe((coaList: Entities) => {
        this.coaList.next(coaList);
      });
  }

  getList(bankAccountSearchEntity: BankAccountSearchEntity) {
    forkJoin(this.bankAccountRepository.getList(bankAccountSearchEntity),
      this.bankAccountRepository.count(bankAccountSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.bankAccountList.next(list);
      }
      if (count) {
        this.bankAccountCount.next(count);
      }
    });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.bankAccountRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  add() {
    this.bankAccountForm.next(this.fb.group(
      new BankAccountForm(),
    ));
  }

  cancel() {
    this.bankAccountForm.next(this.fb.group(
      new BankAccountForm(),
    ));
  }

  edit(bankAccountId: string) {
    this.bankAccountRepository.getId(bankAccountId).subscribe(res => {
      if (res) {
        this.bankAccountForm.next(this.fb.group(
          new BankAccountForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(bankAccountEntity: any, bankAccountSearchEntity: BankAccountSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (bankAccountEntity.id === null || bankAccountEntity.id === undefined) {
        this.bankAccountRepository.add(bankAccountEntity).subscribe(res => {
          if (res) {
            this.getList(bankAccountSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.bankAccountForm.next(this.fb.group(
              new BankAccountForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.bankAccountRepository.update(bankAccountEntity).subscribe(res => {
          if (res) {
            this.getList(bankAccountSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.bankAccountForm.next(this.fb.group(
              new BankAccountForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(bankAccountEntity: any, bankAccountSearchEntity: BankAccountSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.bankAccountRepository.delete(bankAccountEntity).subscribe(res => {
        if (res) {
          this.getList(bankAccountSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.bankAccountForm.next(this.fb.group(
            new BankAccountForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
