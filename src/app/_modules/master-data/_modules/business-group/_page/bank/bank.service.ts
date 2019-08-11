import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BankRepository } from './bank.repository';
import { BankForm } from 'src/app/_modules/master-data/_backend/bank/bank.form';
import { ToastrService } from 'ngx-toastr';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { environment } from 'src/environments/environment';

@Injectable()
export class BankService {
  public bankList: BehaviorSubject<BankEntity[]>;
  public bankForm: BehaviorSubject<FormGroup>;
  public bankCount: BehaviorSubject<number>;
  constructor(private fb: FormBuilder, private bankRepository: BankRepository, private toastrService: ToastrService) {
    this.bankCount = new BehaviorSubject(0);
    this.bankList = new BehaviorSubject([]);
    this.bankForm = new BehaviorSubject(this.fb.group(
      new BankForm(),
    ));
  }

  getList(bankSearchEntity: BankSearchEntity) {
    forkJoin(this.bankRepository.getList(bankSearchEntity),
      this.bankRepository.count(bankSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.bankList.next(list);
        }
        if (count) {
          this.bankCount.next(count);
        }
      });
  }

  add() {
    this.bankForm.next(this.fb.group(
      new BankForm(),
    ));
  }

  edit(bankId: string) {
    this.bankRepository.getId(bankId).subscribe(res => {
      if (res) {
        this.bankForm.next(this.fb.group(
          new BankForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(bankEntity: any, bankSearchEntity: BankSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (bankEntity.id === null || bankEntity.id === undefined || bankEntity.id === environment.emptyGuid) {
        this.bankRepository.add(bankEntity).subscribe(res => {
          if (res) {
            this.getList(bankSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.bankForm.next(this.fb.group(
              new BankForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.bankRepository.update(bankEntity).subscribe(res => {
          if (res) {
            this.getList(bankSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.bankForm.next(this.fb.group(
              new BankForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  deactivate(bankEntity: any, bankSearchEntity: BankSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.bankRepository.deactivate(bankEntity).subscribe(res => {
        if (res) {
          this.getList(bankSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.bankForm.next(this.fb.group(
            new BankForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }

  importFile(file: File) {
    this.bankRepository.importFile(file).subscribe(res => {
      if (res) {
        console.log(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }
}
