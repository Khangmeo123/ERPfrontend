import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';
import { ImportTaxRepository } from './import-tax.repository';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.searchEntity';
import { ImportTaxForm } from '../../../../_backend/import-tax/import-tax.form';

export class ImportTaxService {
  public importTaxList: BehaviorSubject<ImportTaxEntity[]>;
  public importTaxCount: BehaviorSubject<number>;
  public importTaxForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private importTaxRepository: ImportTaxRepository, private toastrService: ToastrService) {
    this.importTaxCount = new BehaviorSubject(0);
    this.importTaxList = new BehaviorSubject([]);
    this.importTaxForm = new BehaviorSubject(this.fb.group(
      new ImportTaxForm(),
    ));
  }

  getList(importTaxSearchEntity: ImportTaxSearchEntity) {
    forkJoin(this.importTaxRepository.getList(importTaxSearchEntity),
      this.importTaxRepository.count(importTaxSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.importTaxList.next(list);
      }
      if (count) {
        this.importTaxCount.next(count);
      }
    });
  }

  add() {
    this.importTaxForm.next(this.fb.group(
      new ImportTaxForm(),
    ));
  }

  edit(importTaxId: string) {
    this.importTaxRepository.getId(importTaxId).subscribe(res => {
      if (res) {
        this.importTaxForm.next(this.fb.group(
          new ImportTaxForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(importTaxEntity: any, importTaxSearchEntity: ImportTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (importTaxEntity.id === null || importTaxEntity.id === undefined) {
        this.importTaxRepository.add(importTaxEntity).subscribe(res => {
          if (res) {
            this.getList(importTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.importTaxForm.next(this.fb.group(
              new ImportTaxForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.importTaxRepository.update(importTaxEntity).subscribe(res => {
          if (res) {
            this.getList(importTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.importTaxForm.next(this.fb.group(
              new ImportTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });

  }

  deactivate(importTaxEntity: any, importTaxSearchEntity: ImportTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.importTaxRepository.deactivate(importTaxEntity).subscribe(res => {
        if (res) {
          this.getList(importTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.importTaxForm.next(this.fb.group(
            new ImportTaxForm(err),
          ));
          reject(true);
        }
      });
    });

  }
}
