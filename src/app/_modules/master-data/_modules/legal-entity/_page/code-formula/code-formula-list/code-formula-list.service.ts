import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {Entities} from '../../../../../../../_helpers/entity';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import {LegalSearchEntity} from '../../../../../_backend/legal/legal.searchentity';
import {translate} from '../../../../../../../_helpers/string';
import {SplitRuleEntity} from '../../../../../_backend/code-formula/code-formula.entity';
import {CodeFormulaForm} from '../../../../../_backend/code-formula/code-formula.form';
import {CodeFormulaListRepository} from './code-formula-list.repository';
import {CodeFormulaSearchEntity} from '../../../../../_backend/code-formula/code-formula.search-entity';

@Injectable({
  providedIn: 'root',
})
export class CodeFormulaListService {

  public legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  public codeFormulaForm: BehaviorSubject<FormGroup>;

  public codeFormulaList: BehaviorSubject<SplitRuleEntity[]> = new BehaviorSubject<SplitRuleEntity[]>([]);

  public codeFormulaCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private codeFormulaRepository: CodeFormulaListRepository, private fb: FormBuilder, private toastrService: ToastrService) {
    this.codeFormulaForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new CodeFormulaForm(),
      ),
    );
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      return this.codeFormulaRepository.getLegalEntityList(legalSearchEntity)
        .subscribe(
          (entities: Entities) => {
            this.legalEntityList.next(entities);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  resetForm() {
    this.codeFormulaForm.next(
      this.fb.group(
        new CodeFormulaForm(),
      ),
    );
  }

  add() {
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  edit(splitRuleEntity: SplitRuleEntity) {
    this.codeFormulaForm.next(
      this.fb.group(
        new CodeFormulaForm(splitRuleEntity),
      ),
    );
  }

  save(splitRuleEntity: SplitRuleEntity, codeFormulaSearchEntity: CodeFormulaSearchEntity): Promise<SplitRuleEntity> {
    return new Promise<SplitRuleEntity>((resolve, reject) => {
      return (
        splitRuleEntity.id
          ? this.codeFormulaRepository.update(splitRuleEntity)
          : this.codeFormulaRepository.create(splitRuleEntity)
      )
        .subscribe(
          (entity: SplitRuleEntity) => {
            this.toastrService.success(translate('codeFormula.update.success'));
            this.codeFormulaRepository.getList(codeFormulaSearchEntity);
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('codeFormula.update.error'));
            reject(error);
          },
        );
    });
  }


  getList(codeFormulaSearchEntity: CodeFormulaSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      forkJoin(
        this.codeFormulaRepository.getList(codeFormulaSearchEntity),
        this.codeFormulaRepository.count(codeFormulaSearchEntity),
      )
        .subscribe(
          ([list, count]) => {
            if (count) {
              this.codeFormulaCount.next(count);
            }
            if (list && list.length) {
              this.codeFormulaList.next(list);
            }
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  delete(splitRuleEntity: SplitRuleEntity, codeFormulaSearchEntity: CodeFormulaSearchEntity): Promise<SplitRuleEntity> {
    return new Promise<SplitRuleEntity>((resolve, reject) => {
      return this.codeFormulaRepository.delete(splitRuleEntity)
        .subscribe(
          (entity: SplitRuleEntity) => {
            this.toastrService.success(translate('codeFormula.update.success'));
            this.codeFormulaRepository.getList(codeFormulaSearchEntity);
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('codeFormula.update.error'));
            reject(error);
          },
        );
    });
  }
}
