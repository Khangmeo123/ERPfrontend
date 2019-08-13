import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';
import { translate } from '../../../../../../_helpers/string';
import { EnvironmentTaxForm } from '../../../../_backend/environment-tax/environment-tax.form';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.search-entity';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';
import { EnvironmentTaxRepository } from './environment-tax.repository';

export class EnvironmentTaxService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public environmentTaxList: BehaviorSubject<EnvironmentTaxEntity[]> = new BehaviorSubject([]);

  public environmentTaxForm: BehaviorSubject<FormGroup>;

  public environmentTaxCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public uomList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public uomFilterList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public parentTaxList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private environmentTaxRepository: EnvironmentTaxRepository,
    private toastrService: ToastrService,
  ) {
    this.environmentTaxCount = new BehaviorSubject(0);
    this.environmentTaxForm = new BehaviorSubject(this.fb.group(
      new EnvironmentTaxForm(),
    ));
  }

  getList(environmentTaxSearchEntity: EnvironmentTaxSearchEntity) {
    forkJoin(this.environmentTaxRepository.getList(environmentTaxSearchEntity),
      this.environmentTaxRepository.count(environmentTaxSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.environmentTaxList.next(list);
      }
      if (count) {
        this.environmentTaxCount.next(count);
      }
    });
  }

  getUnitOfMeasureList(uomSearchEntity: UomSearchEntity) {
    this.environmentTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomList.next(list);
      });
  }

  getUnitOfMeasureFilterList(uomSearchEntity: UomSearchEntity) {
    this.environmentTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomFilterList.next(list);
      });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.environmentTaxRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  resetForm() {
    this.uomList.next(new Entities());
    this.parentTaxList.next(new Entities());
    this.environmentTaxForm.next(
      this.fb.group(
        new EnvironmentTaxForm(),
      ),
    );
  }

  add() {
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  edit(environmentTaxId: string) {
    this.resetForm();
    this.environmentTaxRepository.getId(environmentTaxId)
      .subscribe(res => {
        if (res) {
          this.environmentTaxForm.next(
            this.fb.group(
              new EnvironmentTaxForm(res),
            ),
          );
        }
      }, err => {
        if (err) {
          console.log(err);
        }
      });
  }

  save(environmentTaxEntity: any, environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (environmentTaxEntity.id === null || environmentTaxEntity.id === undefined) {
        this.environmentTaxRepository.add(environmentTaxEntity).subscribe(res => {
          if (res) {
            this.getList(environmentTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.environmentTaxForm.next(this.fb.group(
              new EnvironmentTaxForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.environmentTaxRepository.update(environmentTaxEntity).subscribe(res => {
          if (res) {
            this.getList(environmentTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.environmentTaxForm.next(this.fb.group(
              new EnvironmentTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });
  }

  deactivate(environmentTaxEntity: any, environmentTaxSearchEntity: EnvironmentTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.environmentTaxRepository.deactivate(environmentTaxEntity).subscribe(res => {
        if (res) {
          this.getList(environmentTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.environmentTaxForm.next(this.fb.group(
            new EnvironmentTaxForm(err),
          ));
          reject(true);
        }
      });
    });
  }

  getParentTaxList(parentTaxSearchEntity: EnvironmentTaxSearchEntity): void {
    this.environmentTaxRepository.getParentTaxList(parentTaxSearchEntity)
      .subscribe((entities: Entities) => {
        this.parentTaxList.next(entities);
      });
  }

  disable(taxEntity: EnvironmentTaxEntity) {
    return this.environmentTaxRepository.disable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.failure'));
        throw error;
      });
  }

  enable(taxEntity: EnvironmentTaxEntity) {
    return this.environmentTaxRepository.enable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.failure'));
        throw error;
      });
  }
}
