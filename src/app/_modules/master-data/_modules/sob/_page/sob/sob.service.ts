import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobRepository } from './sob.repository';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobForm } from '../../../../_backend/sob/sob.form';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';
import { SpecialConsumptionTaxEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.entity';
import { ValueAddedTaxEntity } from '../../../../_backend/value-added-tax/value-added-tax.entity';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.searchEntity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.searchEntity';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import { NaturalResourceTaxSearchentity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.searchentity';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.searchEntity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { SpecialConsumptionTaxSearchentity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';

export class SobService {

  public sobList: BehaviorSubject<SobEntity[]> = new BehaviorSubject([]);
  public sobCount: BehaviorSubject<number> = new BehaviorSubject(0);

  public currencyList: BehaviorSubject<CurrencyEntity[]> = new BehaviorSubject([]);
  public importTaxTemplates: BehaviorSubject<ImportTaxEntity[]> = new BehaviorSubject([]);
  public coaList: BehaviorSubject<CoaEntity[]> = new BehaviorSubject([]);
  public exportTaxTemplates: BehaviorSubject<ExportTaxEntity[]> = new BehaviorSubject([]);
  public environmentTaxTemplates: BehaviorSubject<EnvironmentTaxEntity[]> = new BehaviorSubject([]);
  public specialConsumptionTaxTemplates: BehaviorSubject<SpecialConsumptionTaxEntity[]> = new BehaviorSubject([]);
  public valueAddedTaxTemplates: BehaviorSubject<ValueAddedTaxEntity[]> = new BehaviorSubject([]);
  public naturalResourceTaxTemplates: BehaviorSubject<NaturalResourceTaxEntity[]> = new BehaviorSubject([]);

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

  getImportTaxTemplates(importTaxSearchEntity: ImportTaxSearchEntity) {
    this.sobRepository.getImportTaxTemplates(importTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.importTaxTemplates.next(list);
      }
    });
  }

  getExportTaxTemplates(exportTaxSearchEntity: ExportTaxSearchEntity) {
    this.sobRepository.getExportTaxTemplates(exportTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.exportTaxTemplates.next(list);
      }
    });
  }

  getEnvironmentTaxTemplates(environmentTaxSearchEntity: EnvironmentTaxSearchEntity) {
    this.sobRepository.getEnvironmentTaxTemplates(environmentTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.environmentTaxTemplates.next(list);
      }
    });
  }

  getValueAddedTaxTemplates(valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity) {
    this.sobRepository.getValueAddedTaxTemplates(valueAddedTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.valueAddedTaxTemplates.next(list);
      }
    });
  }

  getNaturalResourceTaxTemplates(naturalResourceTaxSearchEntity: NaturalResourceTaxSearchentity) {
    this.sobRepository.getNaturalResourceTaxTemplates(naturalResourceTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.naturalResourceTaxTemplates.next(list);
      }
    });
  }

  getSpecialConsumptionTaxTemplates(specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity) {
    this.sobRepository.getSpecialConsumptionTaxTemplates(specialConsumptionTaxSearchEntity).subscribe((list) => {
      if (list) {
        this.specialConsumptionTaxTemplates.next(list);
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
    const defered = new Promise<boolean>((resolve, reject) => {
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
    return defered;
  }

  delete(sobEntity: any, sobSearchEntity: SobSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.sobRepository.delete(sobEntity).subscribe(res => {
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
    return defered;
  }
}
