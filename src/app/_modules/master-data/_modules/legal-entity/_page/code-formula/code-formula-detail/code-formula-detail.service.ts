import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CodeFormulaForm} from '../../../../../_backend/code-formula/code-formula.form';
import {SplitRuleEntity} from '../../../../../_backend/code-formula/code-formula.entity';
import {CodeFormulaDetailRepository} from './code-formula-detail.repository';
import {ToastrService} from 'ngx-toastr';
import {translate} from '../../../../../../../_helpers/string';
import {ItemSearchEntity} from '../../../../../_backend/item/item.searchentity';
import {ItemEntity} from '../../../../../_backend/item/item.entity';

@Injectable({
  providedIn: 'root',
})
export class CodeFormulaDetailService {

  public codeFormulaForm: BehaviorSubject<FormGroup>;

  public itemList: BehaviorSubject<ItemEntity[]> = new BehaviorSubject<ItemEntity[]>([]);

  public itemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public appliedItemList: BehaviorSubject<ItemEntity[]> = new BehaviorSubject<ItemEntity[]>([]);

  public appliedItemCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

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
  }

  resetForm() {
    this.codeFormulaForm.next(
      this.fb.group(
        new CodeFormulaForm(),
      ),
    );
  }

  get(splitRuleEntity: SplitRuleEntity): Promise<SplitRuleEntity> {
    return new Promise<SplitRuleEntity>((resolve, reject) => {
      this.codeFormulaDetailRepository.get(splitRuleEntity)
        .subscribe(
          (entity: SplitRuleEntity) => {
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
      forkJoin(
        this.codeFormulaDetailRepository.getItemList(itemSearchEntity),
        this.codeFormulaDetailRepository.countItemList(itemSearchEntity),
      )
        .subscribe(
          ([list, count]) => {
            this.itemList.next(list);
            this.itemCount.next(count);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  getAppliedItemList(itemSearchEntity: ItemSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      forkJoin(
        this.codeFormulaDetailRepository.getItemList(itemSearchEntity),
        this.codeFormulaDetailRepository.countItemList(itemSearchEntity),
      )
        .subscribe(
          ([list, count]) => {
            this.appliedItemList.next(list);
            this.appliedItemCount.next(count);
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
            resolve(entity);
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  cancel() {
    this.resetForm();
  }
}
