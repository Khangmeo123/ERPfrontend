import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin, Observable, Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {translate} from '../../../../../../_helpers/string';
import {ToastrService} from 'ngx-toastr';
import {TaxTemplateEntity, TaxTemplateTypeEntity} from '../../../../_backend/tax-template/tax-template.entity';
import {TaxTemplateRepository} from './tax-template.repository';
import {TaxTemplateForm} from '../../../../_backend/tax-template/tax-template.form';
import {TaxTemplateSearchEntity} from '../../../../_backend/tax-template/tax-template.search-entity';
import {UomSearchEntity} from '../../../../_backend/uom/uom.searchentity';
import {Entities} from '../../../../../../_helpers/entity';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaxTemplateService {
  public taxTemplateList: BehaviorSubject<TaxTemplateEntity[]> = new BehaviorSubject<TaxTemplateEntity[]>([]);

  public taxTemplateCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public taxTemplateForm: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  public typeList: BehaviorSubject<TaxTemplateTypeEntity[]> = new BehaviorSubject<TaxTemplateTypeEntity[]>([]);

  public uomList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(private fb: FormBuilder, private taxTemplateRepository: TaxTemplateRepository, private toastrService: ToastrService) {
    this.taxTemplateForm.next(
      this.fb.group(
        new TaxTemplateForm(),
      ),
    );
  }

  public getList(taxTemplateSearchEntity: TaxTemplateSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      forkJoin(
        this.taxTemplateRepository.getList(taxTemplateSearchEntity),
        this.taxTemplateRepository.count(taxTemplateSearchEntity),
      )
        .subscribe(
          ([list, count]) => {
            this.taxTemplateList.next(list);
            this.taxTemplateCount.next(count);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  public getTypeList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.taxTemplateRepository.getTypeList()
        .subscribe(
          (list: TaxTemplateTypeEntity[]) => {
            this.typeList.next(list);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  public getUnitOfMeasureList(uomSearchEntity: UomSearchEntity): Promise<Entities> {
    return new Promise<Entities>((resolve, reject) => {
      return this.taxTemplateRepository.getUnitOfMeasureList(uomSearchEntity)
        .subscribe(
          (entities: Entities) => {
            this.uomList.next(entities);
            resolve(entities);
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  public get(taxTemplateSearchEntity: TaxTemplateSearchEntity): Promise<TaxTemplateEntity> {
    return new Promise<TaxTemplateEntity>((resolve, reject) => {
      this.taxTemplateRepository.get(taxTemplateSearchEntity)
        .subscribe(
          (taxTemplate: TaxTemplateEntity) => {
            this.taxTemplateForm.next(
              this.fb.group(
                new TaxTemplateForm(taxTemplate),
              ),
            );
            resolve();
          },
          (error: Error) => {
            this.toastrService.error(translate('taxTemplate.get.error'));
            reject(error);
          },
        );
    });
  }

  public save(taxTemplateEntity: TaxTemplateEntity): Promise<TaxTemplateEntity> {
    return new Promise<TaxTemplateEntity>((resolve, reject) => {
      (
        taxTemplateEntity.id
          ? this.taxTemplateRepository.update(taxTemplateEntity)
          : this.taxTemplateRepository.create(taxTemplateEntity)
      )
        .subscribe(
          (taxTemplate: TaxTemplateEntity) => {
            this.toastrService.success(translate('taxTemplate.update.success'));
            resolve(taxTemplate);
          },
          (error: Error) => {
            this.toastrService.error(translate('taxTemplate.update.error'));
            reject(error);
          },
        );
    });
  }

  public delete(taxTemplateEntity: TaxTemplateEntity): Promise<TaxTemplateEntity> {
    return new Promise<TaxTemplateEntity>((resolve, reject) => {
      this.taxTemplateRepository.delete(taxTemplateEntity)
        .subscribe(
          (taxTemplate: TaxTemplateEntity) => {
            this.toastrService.success(translate('taxTemplate.delete.success'));
            resolve(taxTemplate);
          },
          (error: Error) => {
            this.toastrService.error(translate('taxTemplate.create.error'));
            reject(error);
          },
        );
    });
  }

  public resetForm() {
    this.taxTemplateForm.next(
      this.fb.group(
        new TaxTemplateForm(),
      ),
    );
  }

  edit(taxTemplateEntity: TaxTemplateEntity) {
    this.taxTemplateForm.next(
      this.fb.group(
        new TaxTemplateForm(taxTemplateEntity),
      ),
    );
  }

  importFile(files: FileList) {
    return new Promise((resolve, reject) => {
      this.taxTemplateRepository.importFile(files).subscribe(res => {
        if (res) {
          this.toastrService.success(translate('general.import.success'));
          resolve();
        }
      }, err => {
        if (err) {
          this.toastrService.error(translate('general.import.error'));
          reject(err);
        }
      });
    });
  }

  public searchUomListByTyping(uomTyping: Observable<UomSearchEntity>): Subscription {
    return uomTyping.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (uomSearchEntity: UomSearchEntity) => {
          return this.taxTemplateRepository.getUnitOfMeasureList(uomSearchEntity);
        },
      ),
    )
      .subscribe((entities: Entities) => {
        this.uomList.next(entities);
      });
  }
}
