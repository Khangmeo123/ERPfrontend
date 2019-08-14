import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subscription} from 'rxjs';
import {LegalEntity} from '../../../../../_backend/legal/legal.entity';
import {LegalSearchEntity} from '../../../../../_backend/legal/legal.searchentity';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../../../_helpers/entity';
import {SplitRuleEntity} from '../../../../../_backend/code-formula/code-formula.entity';
import {CodeFormulaSearchEntity} from '../../../../../_backend/code-formula/code-formula.search-entity';
import {CodeFormulaListService} from './code-formula-list.service';
import {PaginationModel} from '../../../../../../../_shared/modules/pagination/pagination.model';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-code-formula',
  templateUrl: './code-formula-list.component.html',
  styleUrls: ['./code-formula-list.component.scss'],
  providers: [
    ToastrService,
  ],
})
export class CodeFormulaListComponent implements OnInit, OnChanges, OnDestroy {

  public subscription: Subscription = new Subscription();

  public legalEntity: LegalEntity = null;

  public legalEntityList: LegalEntity[] = [];

  public legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  public selectedLegalEntityList: LegalEntity[] = [];

  public modal: boolean = false;

  public codeFormulaForm: FormGroup;

  public codeFormulaList: SplitRuleEntity[] = [];

  public codeFormulaSearchEntity: CodeFormulaSearchEntity = new CodeFormulaSearchEntity();

  public pagination: PaginationModel = new PaginationModel();

  constructor(
    private codeFormulaService: CodeFormulaListService,
    private generalService: GeneralService,
    private router: Router,
    private toastrService: ToastrService,
  ) {

    const legalEntitySub: Subscription = this.codeFormulaService.legalEntityList.subscribe((entities: Entities) => {
      this.legalEntityList = entities.exceptIds;
      this.selectedLegalEntityList = entities.ids;

      if (this.legalEntityList.length) {
        const legalEntity: LegalEntity = this.legalEntityList[0];
        this.codeFormulaSearchEntity.legalEntityId = legalEntity.id;
        this.selectLegalEntity(legalEntity);
        this.getList();
      }
    });

    const codeFormulaFormSub: Subscription = this.codeFormulaService.codeFormulaForm.subscribe((form: FormGroup) => {
      this.codeFormulaForm = form;
    });

    const codeFormulaListSub: Subscription = this.codeFormulaService.codeFormulaList.subscribe((list: SplitRuleEntity[]) => {
      this.codeFormulaList = list;
    });

    const codeFormulaCountSub: Subscription = this.codeFormulaService.codeFormulaCount.subscribe((count: number) => {
      this.pagination.totalItems = count;
    });

    this.subscription
      .add(legalEntitySub)
      .add(codeFormulaFormSub)
      .add(codeFormulaListSub)
      .add(codeFormulaCountSub);
  }

  get code() {
    return this.codeFormulaForm.get('code') as FormControl;
  }

  get name() {
    return this.codeFormulaForm.get('name') as FormControl;
  }

  get errors() {
    return this.codeFormulaForm.get('errors') as FormControl;
  }

  public legalEntitySelector = node => node;

  async ngOnInit() {
    this.getLegalEntityList();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  selectLegalEntity(legalEntity: LegalEntity) {
    this.legalEntity = legalEntity;
  }

  getLegalEntityList() {
    this.legalSearchEntity = new LegalSearchEntity();
    if (this.legalEntity) {
      this.legalSearchEntity.ids = [
        this.legalEntity.id,
      ];
    }
    return this.codeFormulaService.getLegalEntityList(this.legalSearchEntity);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  async getList() {
    return this.codeFormulaService.getList(this.codeFormulaSearchEntity);
  }

  async onOpenLegalEntityList() {
    await this.getLegalEntityList();
  }

  onSearchLegalEntity(event) {
    this.legalSearchEntity.name.startsWith = event;
    return this.codeFormulaService.getLegalEntityList(this.legalSearchEntity);
  }

  onSelectLegalEntity(event) {
    if (event) {
      if (event.length) {
        this.selectLegalEntity(event[0]);
      }
    }
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  add() {
    this.codeFormulaService.add();
    return this.openModal();
  }

  edit(splitRuleEntity: SplitRuleEntity) {
    this.codeFormulaService.edit(splitRuleEntity);
    return this.router.navigate(
      ['/master-data/legal-entity/code-formula/code-formula-detail'],
      {
        queryParams: {
          id: splitRuleEntity.id,
          legalEntityId: this.legalEntity.id,
        },
      },
    );
  }

  cancel() {
    this.codeFormulaService.cancel();
    this.closeModal();
  }

  save() {
    if (this.codeFormulaForm.invalid) {
      this.generalService.validateAllFormFields(this.codeFormulaForm);
    }
    if (this.codeFormulaForm.valid) {

    }
  }

  delete(splitRuleEntity: SplitRuleEntity) {
    this.codeFormulaService.delete(splitRuleEntity, this.codeFormulaSearchEntity)
      .then(() => {
        this.closeModal();
      });
  }

  paginationOut(event) {
    this.codeFormulaSearchEntity.skip = event.skip;
    this.codeFormulaSearchEntity.take = event.take;
    return this.getList();
  }

  addSplitRule() {
    return this.router.navigate(
      ['/master-data/legal-entity/code-formula/code-formula-detail'],
      {
        queryParams: {
          legalEntityId: this.legalEntity.id,
        },
      },
    );
  }
}
