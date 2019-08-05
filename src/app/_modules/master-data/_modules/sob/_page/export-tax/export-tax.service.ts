import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';
import { translate } from '../../../../../../_helpers/string';
import { ExportTaxForm } from '../../../../_backend/export-tax/export-tax.form';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.search-entity';
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';
import { ExportTaxRepository } from './export-tax.repository';

export class ExportTaxService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public exportTaxList: BehaviorSubject<ExportTaxEntity[]> = new BehaviorSubject([]);

  public exportTaxForm: BehaviorSubject<FormGroup>;

  public exportTaxCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public uomList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public parentTaxList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private exportTaxRepository: ExportTaxRepository,
    private toastrService: ToastrService,
  ) {
    this.exportTaxCount = new BehaviorSubject(0);
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

  getUnitOfMeasureList(uomSearchEntity: UomSearchEntity) {
    this.exportTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomList.next(list);
      });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.exportTaxRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  resetForm() {
    this.uomList.next(new Entities());
    this.parentTaxList.next(new Entities());
    this.exportTaxForm.next(
      this.fb.group(
        new ExportTaxForm(),
      ),
    );
  }

  add() {
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  edit(exportTaxId: string) {
    this.resetForm();
    this.exportTaxRepository.getId(exportTaxId)
      .subscribe(res => {
        if (res) {
          this.exportTaxForm.next(
            this.fb.group(
              new ExportTaxForm(res),
            ),
          );
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

  deactivate(exportTaxEntity: any, exportTaxSearchEntity: ExportTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.exportTaxRepository.deactivate(exportTaxEntity).subscribe(res => {
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

  getParentTaxList(parentTaxSearchEntity: ExportTaxSearchEntity): void {
    this.exportTaxRepository.getParentTaxList(parentTaxSearchEntity)
      .subscribe((entities: Entities) => {
        this.parentTaxList.next(entities);
      });
  }

  disable(taxEntity: ExportTaxEntity) {
    return this.exportTaxRepository.disable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.failure'));
        throw error;
      });
  }

  enable(taxEntity: ExportTaxEntity) {
    return this.exportTaxRepository.enable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.failure'));
        throw error;
      });
  }
}
