import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FiscalYearEntity } from '../../../../_backend/fiscal-year/fiscal-year.entity';
import { FiscalYearRepository } from './fiscal-year.repository';
import { FiscalYearForm } from '../../../../_backend/fiscal-year/fiscal-year.form';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';

export class FiscalYearService {
  public fiscalYearList: BehaviorSubject<FiscalYearEntity[]>;
  public fiscalYearCount: BehaviorSubject<number>;
  public fiscalYearForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private fiscalYearRepository: FiscalYearRepository, private toastrService: ToastrService) {
    this.fiscalYearCount = new BehaviorSubject(0);
    this.fiscalYearList = new BehaviorSubject([]);
    this.fiscalYearForm = new BehaviorSubject(this.fb.group(
      new FiscalYearForm(),
    ));
  }

  getList(fiscalYearSearchEntity: FiscalYearSearchEntity) {
    forkJoin(this.fiscalYearRepository.getList(fiscalYearSearchEntity),
      this.fiscalYearRepository.count(fiscalYearSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.fiscalYearList.next(list);
      }
      if (count) {
        this.fiscalYearCount.next(count);
      }
    });
  }

  add() {
    this.fiscalYearForm.next(this.fb.group(
      new FiscalYearForm(),
    ));
  }

  edit(fiscalYearId: string) {
    this.fiscalYearRepository.getId(fiscalYearId).subscribe(res => {
      if (res) {
        this.fiscalYearForm.next(this.fb.group(
          new FiscalYearForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(fiscalYearEntity: any, fiscalYearSearchEntity: FiscalYearSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (fiscalYearEntity.id === null || fiscalYearEntity.id === undefined) {
        this.fiscalYearRepository.add(fiscalYearEntity).subscribe(res => {
          if (res) {
            this.getList(fiscalYearSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.fiscalYearForm.next(this.fb.group(
              new FiscalYearForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.fiscalYearRepository.update(fiscalYearEntity).subscribe(res => {
          if (res) {
            this.getList(fiscalYearSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.fiscalYearForm.next(this.fb.group(
              new FiscalYearForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(fiscalYearEntity: any, fiscalYearSearchEntity: FiscalYearSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.fiscalYearRepository.delete(fiscalYearEntity).subscribe(res => {
        if (res) {
          this.getList(fiscalYearSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.fiscalYearForm.next(this.fb.group(
            new FiscalYearForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
