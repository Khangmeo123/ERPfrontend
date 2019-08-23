import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';
import { translate } from '../../../../../../_helpers/string';
import { ValueAddedTaxForm } from '../../../../_backend/value-added-tax/value-added-tax.form';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import { ValueAddedTaxEntity } from '../../../../_backend/value-added-tax/value-added-tax.entity';
import { ValueAddedTaxRepository } from './value-added-tax.repository';

export class ValueAddedTaxService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public valueAddedTaxList: BehaviorSubject<ValueAddedTaxEntity[]> = new BehaviorSubject([]);

  public valueAddedTaxForm: BehaviorSubject<FormGroup>;

  public valueAddedTaxCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public uomList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public uomFilterList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public parentTaxList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private valueAddedTaxRepository: ValueAddedTaxRepository,
    private toastrService: ToastrService,
  ) {
    this.valueAddedTaxCount = new BehaviorSubject(0);
    this.valueAddedTaxForm = new BehaviorSubject(this.fb.group(
      new ValueAddedTaxForm(),
    ));
  }

  getList(valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity) {
    forkJoin(this.valueAddedTaxRepository.getList(valueAddedTaxSearchEntity),
      this.valueAddedTaxRepository.count(valueAddedTaxSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.valueAddedTaxList.next(list);
      }
      if (count) {
        this.valueAddedTaxCount.next(count);
      }
    });
  }

  getUnitOfMeasureList(uomSearchEntity: UomSearchEntity) {
    this.valueAddedTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomList.next(list);
      });
  }

  getUnitOfMeasureFilterList(uomSearchEntity: UomSearchEntity) {
    this.valueAddedTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomFilterList.next(list);
      });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.valueAddedTaxRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  resetForm() {
    this.uomList.next(new Entities());
    this.parentTaxList.next(new Entities());
    this.valueAddedTaxForm.next(
      this.fb.group(
        new ValueAddedTaxForm(),
      ),
    );
  }

  add() {
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  edit(valueAddedTaxId: string) {
    this.resetForm();
    this.valueAddedTaxRepository.getId(valueAddedTaxId)
      .subscribe(res => {
        if (res) {
          this.valueAddedTaxForm.next(
            this.fb.group(
              new ValueAddedTaxForm(res),
            ),
          );
        }
      }, err => {
        if (err) {
          console.log(err);
        }
      });
  }

  save(valueAddedTaxEntity: any, valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (valueAddedTaxEntity.id === null || valueAddedTaxEntity.id === undefined) {
        this.valueAddedTaxRepository.add(valueAddedTaxEntity).subscribe(res => {
          if (res) {
            this.getList(valueAddedTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.valueAddedTaxForm.next(this.fb.group(
              new ValueAddedTaxForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.valueAddedTaxRepository.update(valueAddedTaxEntity).subscribe(res => {
          if (res) {
            this.getList(valueAddedTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.valueAddedTaxForm.next(this.fb.group(
              new ValueAddedTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });
  }

  deactivate(valueAddedTaxEntity: any, valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.valueAddedTaxRepository.deactivate(valueAddedTaxEntity).subscribe(res => {
        if (res) {
          this.getList(valueAddedTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.valueAddedTaxForm.next(this.fb.group(
            new ValueAddedTaxForm(err),
          ));
          reject(true);
        }
      });
    });
  }

  getParentTaxList(parentTaxSearchEntity: ValueAddedTaxSearchEntity): void {
    this.valueAddedTaxRepository.getParentTaxList(parentTaxSearchEntity)
      .subscribe((entities: Entities) => {
        this.parentTaxList.next(entities);
      });
  }

  disable(taxEntity: ValueAddedTaxEntity) {
    return this.valueAddedTaxRepository.disable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.error'));
        throw error;
      });
  }

  enable(taxEntity: ValueAddedTaxEntity) {
    return this.valueAddedTaxRepository.enable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.error'));
        throw error;
      });
  }
}
