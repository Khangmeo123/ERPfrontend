import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { SpecialConsumptionTaxEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.entity';
import { SpecialConsumptionTaxRepository } from './special-consumption-tax.repository';
import { SpecialConsumptionTaxForm } from '../../../../_backend/special-consumption-tax/special-consumption-tax.form';
import { SpecialConsumptionTaxSearchEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';

export class SpecialConsumptionTaxService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public specialConsumptionTaxList: BehaviorSubject<SpecialConsumptionTaxEntity[]> = new BehaviorSubject([]);

  public specialConsumptionTaxForm: BehaviorSubject<FormGroup>;

  public specialConsumptionTaxCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public uomList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public parentTaxList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private specialConsumptionTaxRepository: SpecialConsumptionTaxRepository,
    private toastrService: ToastrService,
  ) {
    this.specialConsumptionTaxCount = new BehaviorSubject(0);
    this.specialConsumptionTaxForm = new BehaviorSubject(this.fb.group(
      new SpecialConsumptionTaxForm(),
    ));
  }

  getList(specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchEntity) {
    forkJoin(this.specialConsumptionTaxRepository.getList(specialConsumptionTaxSearchEntity),
      this.specialConsumptionTaxRepository.count(specialConsumptionTaxSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.specialConsumptionTaxList.next(list);
      }
      if (count) {
        this.specialConsumptionTaxCount.next(count);
      }
    });
  }

  getUnitOfMeasureList(uomSearchEntity: UomSearchEntity) {
    this.specialConsumptionTaxRepository.getUnitOfMeasureList(uomSearchEntity)
      .subscribe((list) => {
        this.uomList.next(list);
      });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.specialConsumptionTaxRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  add() {
    this.specialConsumptionTaxForm.next(this.fb.group(
      new SpecialConsumptionTaxForm(),
    ));
  }

  cancel() {
    this.specialConsumptionTaxForm.next(this.fb.group(
      new SpecialConsumptionTaxForm(),
    ));
  }

  edit(specialConsumptionTaxId: string) {
    this.specialConsumptionTaxRepository.getId(specialConsumptionTaxId).subscribe(res => {
      if (res) {
        this.specialConsumptionTaxForm.next(this.fb.group(
          new SpecialConsumptionTaxForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(specialConsumptionTaxEntity: any, specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (specialConsumptionTaxEntity.id === null || specialConsumptionTaxEntity.id === undefined) {
        this.specialConsumptionTaxRepository.add(specialConsumptionTaxEntity).subscribe(res => {
          if (res) {
            this.getList(specialConsumptionTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.specialConsumptionTaxForm.next(this.fb.group(
              new SpecialConsumptionTaxForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.specialConsumptionTaxRepository.update(specialConsumptionTaxEntity).subscribe(res => {
          if (res) {
            this.getList(specialConsumptionTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.specialConsumptionTaxForm.next(this.fb.group(
              new SpecialConsumptionTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });
  }

  deactivate(specialConsumptionTaxEntity: any, specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.specialConsumptionTaxRepository.deactivate(specialConsumptionTaxEntity).subscribe(res => {
        if (res) {
          this.getList(specialConsumptionTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.specialConsumptionTaxForm.next(this.fb.group(
            new SpecialConsumptionTaxForm(err),
          ));
          reject(true);
        }
      });
    });
  }

  getParentTaxList(parentTaxSearchEntity: SpecialConsumptionTaxSearchEntity): void {
    this.specialConsumptionTaxRepository.getParentTaxList(parentTaxSearchEntity)
      .subscribe((entities: Entities) => {
        this.parentTaxList.next(entities);
      });
  }
}
