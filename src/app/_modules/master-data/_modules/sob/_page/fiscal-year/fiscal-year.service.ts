import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { FiscalYearEntity } from '../../../../_backend/fiscal-year/fiscal-year.entity';
import { FiscalYearRepository } from './fiscal-year.repository';
import { FiscalYearForm } from '../../../../_backend/fiscal-year/fiscal-year.form';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';

export class FiscalYearService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public fiscalYearList: BehaviorSubject<FiscalYearEntity[]> = new BehaviorSubject([]);
  public fiscalYearForm: BehaviorSubject<FormGroup>;
  public fiscalYearCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private fb: FormBuilder, private fiscalYearRepository: FiscalYearRepository, private toastrService: ToastrService) {
    this.fiscalYearCount = new BehaviorSubject(0);
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

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.fiscalYearRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  add() {
    this.fiscalYearForm.next(this.fb.group(
      new FiscalYearForm(),
    ));
  }

  cancel() {
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
