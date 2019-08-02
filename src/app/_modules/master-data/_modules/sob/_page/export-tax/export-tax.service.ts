import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ExportTaxRepository } from './export-tax.repository';
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.searchEntity';
import { ExportTaxForm } from '../../../../_backend/export-tax/export-tax.form';

export class ExportTaxService {
  public exportTaxList: BehaviorSubject<ExportTaxEntity[]>;
  public exportTaxCount: BehaviorSubject<number>;
  public exportTaxForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private exportTaxRepository: ExportTaxRepository, private toastrService: ToastrService) {
    this.exportTaxCount = new BehaviorSubject(0);
    this.exportTaxList = new BehaviorSubject([]);
    this.exportTaxForm = new BehaviorSubject(this.fb.group(
      new ExportTaxForm(),
    ));
  }

  getList(exportTaxSearchEntity: ExportTaxSearchEntity) {
    forkJoin(this.exportTaxRepository.getList(exportTaxSearchEntity),
      this.exportTaxRepository.count(exportTaxSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.exportTaxList.next(list);
      }
      if (count) {
        this.exportTaxCount.next(count);
      }
    });
  }

  add() {
    this.exportTaxForm.next(this.fb.group(
      new ExportTaxForm(),
    ));
  }

  edit(exportTaxId: string) {
    this.exportTaxRepository.getId(exportTaxId).subscribe(res => {
      if (res) {
        this.exportTaxForm.next(this.fb.group(
          new ExportTaxForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(exportTaxEntity: any, exportTaxSearchEntity: ExportTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (exportTaxEntity.id === null || exportTaxEntity.id === undefined) {
        this.exportTaxRepository.add(exportTaxEntity).subscribe(res => {
          if (res) {
            this.getList(exportTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.exportTaxForm.next(this.fb.group(
              new ExportTaxForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.exportTaxRepository.update(exportTaxEntity).subscribe(res => {
          if (res) {
            this.getList(exportTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.exportTaxForm.next(this.fb.group(
              new ExportTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });

  }

  delete(exportTaxEntity: any, exportTaxSearchEntity: ExportTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.exportTaxRepository.delete(exportTaxEntity).subscribe(res => {
        if (res) {
          this.getList(exportTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.exportTaxForm.next(this.fb.group(
            new ExportTaxForm(err),
          ));
          reject(true);
        }
      });
    });

  }
}
