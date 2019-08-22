import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';
import { translate } from '../../../../../../_helpers/string';
import { NaturalResourceTaxForm } from '../../../../_backend/natural-resource-tax/natural-resource-tax.form';
import { NaturalResourceTaxSearchEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.search-entity';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import { NaturalResourceTaxRepository } from './natural-resource-tax.repository';

export class NaturalResourceTaxService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public naturalResourceTaxList: BehaviorSubject<NaturalResourceTaxEntity[]> = new BehaviorSubject([]);

  public naturalResourceTaxForm: BehaviorSubject<FormGroup>;

  public naturalResourceTaxCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public uomList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public uomFilterList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public parentTaxList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private naturalResourceTaxRepository: NaturalResourceTaxRepository,
    private toastrService: ToastrService,
  ) {
    this.naturalResourceTaxCount = new BehaviorSubject(0);
    this.naturalResourceTaxForm = new BehaviorSubject(this.fb.group(
      new NaturalResourceTaxForm(),
    ));
  }

  getList(naturalResourceTaxSearchEntity: NaturalResourceTaxSearchEntity) {
    forkJoin(this.naturalResourceTaxRepository.getList(naturalResourceTaxSearchEntity),
      this.naturalResourceTaxRepository.count(naturalResourceTaxSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.naturalResourceTaxList.next(list);
      }
      if (count) {
        this.naturalResourceTaxCount.next(count);
      }
    });
  }

  getUnitOfMeasureList(uomSearchEntity: UomSearchEntity) {
    this.naturalResourceTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomList.next(list);
      });
  }

  getUnitOfMeasureFilterList(uomSearchEntity: UomSearchEntity) {
    this.naturalResourceTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomFilterList.next(list);
      });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.naturalResourceTaxRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  resetForm() {
    this.uomList.next(new Entities());
    this.parentTaxList.next(new Entities());
    this.naturalResourceTaxForm.next(
      this.fb.group(
        new NaturalResourceTaxForm(),
      ),
    );
  }

  add() {
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  edit(naturalResourceTaxId: string) {
    this.resetForm();
    this.naturalResourceTaxRepository.getId(naturalResourceTaxId)
      .subscribe(res => {
        if (res) {
          this.naturalResourceTaxForm.next(
            this.fb.group(
              new NaturalResourceTaxForm(res),
            ),
          );
        }
      }, err => {
        if (err) {
          console.log(err);
        }
      });
  }

  save(naturalResourceTaxEntity: any, naturalResourceTaxSearchEntity: NaturalResourceTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (naturalResourceTaxEntity.id === null || naturalResourceTaxEntity.id === undefined) {
        this.naturalResourceTaxRepository.add(naturalResourceTaxEntity).subscribe(res => {
          if (res) {
            this.getList(naturalResourceTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.naturalResourceTaxForm.next(this.fb.group(
              new NaturalResourceTaxForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.naturalResourceTaxRepository.update(naturalResourceTaxEntity).subscribe(res => {
          if (res) {
            this.getList(naturalResourceTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.naturalResourceTaxForm.next(this.fb.group(
              new NaturalResourceTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });
  }

  deactivate(naturalResourceTaxEntity: any, naturalResourceTaxSearchEntity: NaturalResourceTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.naturalResourceTaxRepository.deactivate(naturalResourceTaxEntity).subscribe(res => {
        if (res) {
          this.getList(naturalResourceTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.naturalResourceTaxForm.next(this.fb.group(
            new NaturalResourceTaxForm(err),
          ));
          reject(true);
        }
      });
    });
  }

  getParentTaxList(parentTaxSearchEntity: NaturalResourceTaxSearchEntity): void {
    this.naturalResourceTaxRepository.getParentTaxList(parentTaxSearchEntity)
      .subscribe((entities: Entities) => {
        this.parentTaxList.next(entities);
      });
  }

  disable(taxEntity: NaturalResourceTaxEntity) {
    return this.naturalResourceTaxRepository.disable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.error'));
        throw error;
      });
  }

  enable(taxEntity: NaturalResourceTaxEntity) {
    return this.naturalResourceTaxRepository.enable(taxEntity)
      .then(() => {
        this.toastrService.success(translate('general.update.success'));
      })
      .catch((error) => {
        this.toastrService.error(translate('general.update.error'));
        throw error;
      });
  }
}
