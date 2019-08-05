import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';
import { translate } from '../../../../../../_helpers/string';
import { ImportTaxForm } from '../../../../_backend/import-tax/import-tax.form';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.search-entity';
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';
import { ImportTaxRepository } from './import-tax.repository';

export class ImportTaxService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public importTaxList: BehaviorSubject<ImportTaxEntity[]> = new BehaviorSubject([]);

  public importTaxForm: BehaviorSubject<FormGroup>;

  public importTaxCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public uomList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public parentTaxList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private importTaxRepository: ImportTaxRepository,
    private toastrService: ToastrService,
  ) {
    this.importTaxCount = new BehaviorSubject(0);
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

  getUnitOfMeasureList(uomSearchEntity: UomSearchEntity) {
    this.importTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomList.next(list);
      });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.importTaxRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  resetForm() {
    this.uomList.next(new Entities());
    this.parentTaxList.next(new Entities());
    this.importTaxForm.next(
      this.fb.group(
        new ImportTaxForm(),
      ),
    );
  }

  add() {
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  edit(importTaxId: string) {
    this.resetForm();
    this.importTaxRepository.getId(importTaxId)
      .subscribe(res => {
        if (res) {
          this.importTaxForm.next(
            this.fb.group(
              new ImportTaxForm(res),
            ),
          );
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

  getParentTaxList(parentTaxSearchEntity: ImportTaxSearchEntity): void {
    this.importTaxRepository.getParentTaxList(parentTaxSearchEntity)
      .subscribe((entities: Entities) => {
        this.parentTaxList.next(entities);
      });
  }

  disable(taxEntity: ImportTaxEntity) {
    return this.importTaxRepository.disable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.failure'));
        throw error;
      });
  }

  enable(taxEntity: ImportTaxEntity) {
    return this.importTaxRepository.enable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.failure'));
        throw error;
      });
  }
}
