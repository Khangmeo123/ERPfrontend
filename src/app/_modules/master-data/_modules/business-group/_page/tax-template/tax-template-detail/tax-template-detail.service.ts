import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../../../_helpers/string';
import {Entities} from '../../../../../../../_helpers/entity';
import {TaxTemplateDetailRepository} from './tax-template-detail.repository';
import {TaxTemplateForm} from '../../../../../_backend/tax-template/tax-template.form';
import {TaxTemplateEntity, TaxTemplateTypeEntity} from '../../../../../_backend/tax-template/tax-template.entity';
import {UomSearchEntity} from '../../../../../_backend/uom/uom.searchentity';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaxTemplateDetailService {

  public taxTemplateForm: BehaviorSubject<FormGroup>;

  public typeList: BehaviorSubject<TaxTemplateTypeEntity[]> = new BehaviorSubject<TaxTemplateTypeEntity[]>([]);

  public uomList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  constructor(
    private fb: FormBuilder,
    private taxTemplateDetailRepository: TaxTemplateDetailRepository,
    private toastrService: ToastrService,
  ) {
    this.taxTemplateForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new TaxTemplateForm(),
      ),
    );
  }

  resetForm() {
    this.taxTemplateForm.next(
      this.fb.group(
        new TaxTemplateForm(),
      ),
    );
  }

  public getTypeList(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.taxTemplateDetailRepository.getTypeList()
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
      return this.taxTemplateDetailRepository.getUnitOfMeasureList(uomSearchEntity)
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

  get(taxTemplateEntity: TaxTemplateEntity): Promise<TaxTemplateEntity> {
    return new Promise<TaxTemplateEntity>((resolve, reject) => {
      this.taxTemplateDetailRepository.get(taxTemplateEntity)
        .subscribe(
          (entity: TaxTemplateEntity) => {
            const form = this.fb.group(
              new TaxTemplateForm(entity),
            );
            this.taxTemplateForm.next(
              form,
            );
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('taxTemplate.get.error'));
            reject(error);
          },
        );
    });
  }

  save(taxTemplateEntity: TaxTemplateEntity): Promise<TaxTemplateEntity> {
    return new Promise<TaxTemplateEntity>((resolve, reject) => {
      return (
        taxTemplateEntity.id
          ? this.taxTemplateDetailRepository.update(taxTemplateEntity)
          : this.taxTemplateDetailRepository.create(taxTemplateEntity)
      )
        .subscribe(
          (entity: TaxTemplateEntity) => {
            this.toastrService.success(translate('taxTemplate.update.success'));
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('taxTemplate.update.error'));
            reject(error);
          },
        );
    });
  }

  public searchUomListByTyping(uomTyping: Observable<UomSearchEntity>): Subscription {
    return uomTyping.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (uomSearchEntity: UomSearchEntity) => {
          return this.taxTemplateDetailRepository.getUnitOfMeasureList(uomSearchEntity);
        },
      ),
    )
      .subscribe((entities: Entities) => {
        this.uomList.next(entities);
      });
  }
}
