import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobRepository } from './sob.repository';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobForm } from '../../../../_backend/sob/sob.form';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.searchEntity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.searchEntity';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.searchEntity';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import { NaturalResourceTaxSearchEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.searchentity';
import { SpecialConsumptionTaxSearchEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';

export class SobService {

  public sobList: BehaviorSubject<SobEntity[]> = new BehaviorSubject([]);
  public sobCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public currencyList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public importTaxTemplateList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public coaList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public exportTaxTemplateList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public environmentTaxTemplateList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public specialConsumptionTaxTemplateList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public valueAddedTaxTemplateList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public naturalResourceTaxTemplateList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public sobForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private sobRepository: SobRepository, private toastrService: ToastrService) {

    this.sobForm = new BehaviorSubject(this.fb.group(
      new SobForm(),
    ));
  }

  getCoaList(coaSearchEntity: CoaSearchEntity) {
    this.sobRepository.getCoaList(coaSearchEntity).subscribe((list) => {
      if (list) {
        this.coaList.next(list);
      }
    });
  }

  getImportTaxTemplateList(importTaxSearchEntity: ImportTaxSearchEntity) {
    this.sobRepository.getImportTaxTemplateList(importTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.importTaxTemplateList.next(list);
      }
    });
  }

  getExportTaxTemplateList(exportTaxSearchEntity: ExportTaxSearchEntity) {
    this.sobRepository.getExportTaxTemplateList(exportTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.exportTaxTemplateList.next(list);
      }
    });
  }

  getEnvironmentTaxTemplateList(environmentTaxSearchEntity: EnvironmentTaxSearchEntity) {
    this.sobRepository.getEnvironmentTaxTemplateList(environmentTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.environmentTaxTemplateList.next(list);
      }
    });
  }

  getValueAddedTaxTemplateList(valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity) {
    this.sobRepository.getValueAddedTaxTemplateList(valueAddedTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.valueAddedTaxTemplateList.next(list);
      }
    });
  }

  getNaturalResourceTaxTemplateList(naturalResourceTaxSearchEntity: NaturalResourceTaxSearchEntity) {
    this.sobRepository.getNaturalResourceTaxTemplateList(naturalResourceTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.naturalResourceTaxTemplateList.next(list);
      }
    });
  }

  getSpecialConsumptionTaxTemplateList(specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchEntity) {
    this.sobRepository.getSpecialConsumptionTaxTemplateList(specialConsumptionTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.specialConsumptionTaxTemplateList.next(list);
      }
    });
  }

  getList(sobSearchEntity: SobSearchEntity) {
    forkJoin(this.sobRepository.getList(sobSearchEntity),
      this.sobRepository.count(sobSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.sobList.next(list);
      }
      if (count) {
        this.sobCount.next(count);
      }
    });
  }

  getCurrencyList(currencySearchEntity: CurrencySearchEntity) {
    this.sobRepository.getCurrencyList(currencySearchEntity).subscribe((list) => {
      if (list) {
        this.currencyList.next(list);
      }
    });
  }

  add() {
    this.sobForm.next(this.fb.group(
      new SobForm(),
    ));
  }

  cancel() {
    this.sobForm.next(this.fb.group(
      new SobForm(),
    ));
  }

  edit(sobId: string) {
    this.sobRepository.getId(sobId).subscribe(res => {
      if (res) {
        this.sobForm.next(this.fb.group(
          new SobForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(sobEntity: any, sobSearchEntity: SobSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (sobEntity.id === null || sobEntity.id === undefined) {
        this.sobRepository.add(sobEntity).subscribe(res => {
          if (res) {
            this.getList(sobSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.sobForm.next(this.fb.group(
              new SobForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.sobRepository.update(sobEntity).subscribe(res => {
          if (res) {
            this.getList(sobSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.sobForm.next(this.fb.group(
              new SobForm(err),
            ));
            reject(true);
          }
        });
      }
    });

  }

  deactivate(sobEntity: any, sobSearchEntity: SobSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.sobRepository.deactivate(sobEntity).subscribe(res => {
        if (res) {
          this.getList(sobSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.sobForm.next(this.fb.group(
            new SobForm(err),
          ));
          reject(true);
        }
      });
    });

  }
}
