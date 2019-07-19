import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BankAccountEntity } from '../../../../_backend/bank-account/bank-account.entity';
import { BankAccountRepository } from './bank_account.repository';
import { BankAccountSearchEntity } from '../../../../_backend/bank-account/bank-account.searchentity';
import { BankAccountForm } from '../../../../_backend/bank-account/bank-account.form';

export class BankAccountService {
  public bankAccountList: BehaviorSubject<BankAccountEntity[]>;
  public bankAccountCount: BehaviorSubject<number>;
  public currencyCount: BehaviorSubject<number>;
  public bankAccountForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private bankAccountRepository: BankAccountRepository, private toastrService: ToastrService) {
    this.bankAccountCount = new BehaviorSubject(0);
    this.bankAccountList = new BehaviorSubject([]);
    this.bankAccountForm = new BehaviorSubject(this.fb.group(
      new BankAccountForm(),
    ));
  }

  getList(bankAccountSearchEntity: BankAccountSearchEntity) {
    forkJoin(this.bankAccountRepository.getList(bankAccountSearchEntity),
      this.bankAccountRepository.count(bankAccountSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.bankAccountList.next(list);
      }
      if (count) {
        this.currencyCount.next(count);
      }
    });
  }

  add() {
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
