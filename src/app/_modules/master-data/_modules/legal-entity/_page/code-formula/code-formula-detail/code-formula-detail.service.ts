import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subscription} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CodeFormulaForm, SplitRuleContentForm, SplitRuleTestForm} from '../../../../../_backend/code-formula/code-formula.form';
import {
  ItemFieldEntity,
  SplitRuleContentEntity,
  SplitRuleEntity,
  SplitRuleTestEntity,
} from '../../../../../_backend/code-formula/code-formula.entity';
import {CodeFormulaDetailRepository} from './code-formula-detail.repository';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../../../_helpers/string';
import {ItemSearchEntity} from '../../../../../_backend/item/item.searchentity';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {Entities} from '../../../../../../../_helpers/entity';

@Injectable({
  providedIn: 'root',
})
export class CodeFormulaDetailService {

  public codeFormulaForm: BehaviorSubject<FormGroup>;

  public splitRuleContentForm: BehaviorSubject<FormGroup>;

  public itemList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public itemFieldList: BehaviorSubject<ItemFieldEntity[]> = new BehaviorSubject<ItemFieldEntity[]>([]);

  public splitRuleTestForm: BehaviorSubject<FormGroup>;

  constructor(
    private fb: FormBuilder,
    private codeFormulaDetailRepository: CodeFormulaDetailRepository,
    private toastrService: ToastrService,
  ) {
    this.codeFormulaForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new CodeFormulaForm(),
      ),
    );

    this.splitRuleContentForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new SplitRuleContentForm(),
      ),
    );

    this.splitRuleTestForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new SplitRuleTestForm(),
      ),
    );
  }

  resetForm() {
    this.codeFormulaForm.next(
      this.fb.group(
        new CodeFormulaForm(),
      ),
    );
  }

  resetSplitRuleContentForm() {
    this.splitRuleContentForm.next(
      this.fb.group(
        new SplitRuleContentForm(),
      ),
    );
  }

  get(splitRuleEntity: SplitRuleEntity): Promise<SplitRuleEntity> {
    return new Promise<SplitRuleEntity>((resolve, reject) => {
      this.codeFormulaDetailRepository.get(splitRuleEntity)
        .subscribe(
          (entity: SplitRuleEntity) => {
            const form = this.fb.group(
              new CodeFormulaForm(entity),
            );
            this.codeFormulaForm.next(
              form,
            );
            this.splitRuleTestForm.value.patchValue({
              splitRuleId: form.value.id,
            });
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('codeFormula.get.error'));
            reject(error);
          },
        );
    });
  }

  getItemList(itemSearchEntity: ItemSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.codeFormulaDetailRepository.getItemList(itemSearchEntity)
        .subscribe(
          (itemEntities: Entities) => {
            this.itemList.next(itemEntities);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  save(splitRuleEntity: SplitRuleEntity): Promise<SplitRuleEntity> {
    return new Promise<SplitRuleEntity>((resolve, reject) => {
      return (
        splitRuleEntity.id
          ? this.codeFormulaDetailRepository.update(splitRuleEntity)
          : this.codeFormulaDetailRepository.create(splitRuleEntity)
      )
        .subscribe(
          (entity: SplitRuleEntity) => {
            this.toastrService.success(translate('codeFormula.update.success'));
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('codeFormula.update.error'));
            reject(error);
          },
        );
    });
  }

  searchItemByTyping(itemSearchEntity: Observable<ItemSearchEntity>): Subscription {
    return itemSearchEntity.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      switchMap(
        (searchEntity: ItemSearchEntity) => {
          return this.codeFormulaDetailRepository.getItemList(searchEntity);
        },
      ),
    )
      .subscribe(
        (entities: Entities) => {
          this.itemList.next(entities);
        },
      );
  }

  getItemFieldList(): Promise<ItemFieldEntity[]> {
    return new Promise<ItemFieldEntity[]>((resolve, reject) => {
      this.codeFormulaDetailRepository.getItemFieldList()
        .subscribe(
          (enumList: ItemFieldEntity[]) => {
            this.itemFieldList.next(enumList);
            resolve(enumList);
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  deleteRule(splitRule: SplitRuleContentEntity) {

  }

  editRule(splitRule: SplitRuleContentEntity) {
    this.splitRuleContentForm.next(
      this.fb.group(
        new SplitRuleContentForm(splitRule),
      ),
    );
  }

  analyzeSplitRule(splitRuleTestEntity: SplitRuleTestEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.codeFormulaDetailRepository.analyzeSplitRule(splitRuleTestEntity)
        .subscribe(
          (entity: SplitRuleTestEntity) => {
            this.splitRuleTestForm.next(
              this.fb.group(
                entity,
              ),
            );
            resolve();
          },
          (error: Error) => {
            this.toastrService.error('codeFormula.test.error');
            reject(error);
          },
        );
    });
  }
}
