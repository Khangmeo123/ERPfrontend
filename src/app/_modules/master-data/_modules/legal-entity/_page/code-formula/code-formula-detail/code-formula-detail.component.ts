import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ItemEntity} from '../../../../../_backend/item/item.entity';
import {
  ItemFieldEntity,
  SplitRuleContentEntity,
  SplitRuleEntity,
  SplitRuleTestEntity,
} from '../../../../../_backend/code-formula/code-formula.entity';
import {CodeFormulaDetailService} from './code-formula-detail.service';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GeneralService} from '../../../../../../../_helpers/general-service.service';
import {ItemSearchEntity} from '../../../../../_backend/item/item.searchentity';
import {SplitRuleContentSearchEntity} from '../../../../../_backend/code-formula/code-formula.search-entity';
import {translate} from '../../../../../../../_helpers/string';
import {ToastrService} from 'ngx-toastr';
import {Entities} from '../../../../../../../_helpers/entity';

@Component({
  selector: 'app-code-formula-detail',
  templateUrl: './code-formula-detail.component.html',
  styleUrls: ['./code-formula-detail.component.scss'],
  providers: [
    CodeFormulaDetailService,
    GeneralService,
    DatePipe,
  ],
})
export class CodeFormulaDetailComponent implements OnInit, OnChanges, OnDestroy {
  public ruleModal: boolean = false;

  public codeFormulaForm: FormGroup;

  public generalTab: boolean = true;

  public subscription: Subscription = new Subscription();

  public appliedItemSearchEntity: ItemSearchEntity = new ItemSearchEntity();

  public itemList: ItemEntity[] = [];

  public selectedItemList: ItemEntity[] = [];

  public itemSearchEntity: ItemSearchEntity = new ItemSearchEntity();

  public itemSearchTypingSubject: Subject<ItemSearchEntity> = new Subject<ItemSearchEntity>();

  public splitRuleContentSearchEntity = new SplitRuleContentSearchEntity();

  public itemFields: ItemFieldEntity[] = [];

  public splitRuleContentForm: FormGroup;

  public splitRuleTestForm: FormGroup;

  constructor(
    private codeFormulaDetailService: CodeFormulaDetailService,
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private router: Router,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    const codeFormulaDetailSub: Subscription = this.codeFormulaDetailService.codeFormulaForm
      .subscribe((form: FormGroup) => {
        this.codeFormulaForm = form;
      });

    const splitRuleContentFormSub: Subscription = this.codeFormulaDetailService.splitRuleContentForm
      .subscribe((form: FormGroup) => {
        this.splitRuleContentForm = form;
      });

    const splitRuleTestFormSub: Subscription = this.codeFormulaDetailService.splitRuleTestForm
      .subscribe((form: FormGroup) => {
        this.splitRuleTestForm = form;
        this.splitRuleTestForm.patchValue({
          mfrDate: form.value.mfrDate ? this.datePipe.transform(form.value.mfrDate, 'dd/MM/yyyy') : null,
          expirationDate: form.value.expirationDate ? this.datePipe.transform(form.value.expirationDate, 'dd/MM/yyyy') : null,
        });
      });

    const itemListSub: Subscription = this.codeFormulaDetailService.itemList.subscribe((entities: Entities) => {
      this.itemList = entities.exceptIds;
      this.selectedItemList = entities.ids;
    });

    const itemFieldSub: Subscription = this.codeFormulaDetailService.itemFieldList
      .subscribe((list: ItemFieldEntity[]) => {
        this.itemFields = list;
      });

    const routeSub: Subscription = this.route.queryParams.subscribe((params: Params) => {
      const splitRuleEntity: SplitRuleEntity = new SplitRuleEntity();
      if (!params.legalEntityId) {
        const message: string = translate('codeFormula.legalEntity.missingLegalEntityId');
        this.toastrService.error(message);
        return this.redirectToList();
      }
      splitRuleEntity.id = params.id || null;
      splitRuleEntity.legalEntityId = params.legalEntityId || null;

      this.legalEntityId.setValue(splitRuleEntity.legalEntityId);

      if (params.id) {
        this.codeFormulaDetailService.get(splitRuleEntity)
          .then(() => {
          });
      }
    });

    const itemTypingSub: Subscription = this.codeFormulaDetailService.searchItemByTyping(this.itemSearchTypingSubject);

    this.subscription
      .add(codeFormulaDetailSub)
      .add(routeSub)
      .add(itemTypingSub)
      .add(itemListSub)
      .add(itemFieldSub)
      .add(splitRuleContentFormSub)
      .add(splitRuleTestFormSub);

    this.codeFormulaDetailService.getItemFieldList()
      .catch(() => {
        this.toastrService.error(translate('codeFormula.field.error'));
      });
  }

  get legalEntityId() {
    return this.codeFormulaForm.get('legalEntityId') as FormControl;
  }

  get code() {
    return this.codeFormulaForm.get('code') as FormControl;
  }

  get name() {
    return this.codeFormulaForm.get('name') as FormControl;
  }

  get length() {
    return this.codeFormulaForm.get('length') as FormControl;
  }

  get identifierStringStart() {
    return this.codeFormulaForm.get('identifierStringStart') as FormControl;
  }

  get identifierStringEnd() {
    return this.codeFormulaForm.get('identifierStringEnd') as FormControl;
  }

  get identifierStringValues() {
    return this.codeFormulaForm.get('identifierStringValues') as FormControl;
  }

  get errors() {
    return this.codeFormulaForm.get('errors') as FormGroup;
  }

  get itemDetails() {
    return this.codeFormulaForm.get('itemDetails') as FormArray;
  }

  get splitRuleContents() {
    return this.codeFormulaForm.get('splitRuleContents') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }

  toggleGeneralTab() {
    this.generalTab = !this.generalTab;
  }

  async addItem() {
    this.codeFormulaForm.setControl('itemDetails', this.fb.array([
      ...this.itemDetails.value,
      ...this.selectedItemList,
    ]));
    this.selectedItemList = [];
    this.itemSearchEntity.ids = [];
  }

  itemSelector = (node) => node;

  save() {
    if (this.codeFormulaForm.invalid) {
      this.generalService.validateAllFormFields(this.codeFormulaForm);
    }
    if (this.codeFormulaForm.valid) {
      return this.codeFormulaDetailService.save(this.codeFormulaForm.value)
        .then(() => {
          return this.redirectToList();
        });
    }
  }

  cancel() {
    this.codeFormulaDetailService.resetForm();
    return this.router.navigate([
      '/master-data/legal-entity/code-formula/code-formula-list',
    ]);
  }

  onOpenItemList(ids: string[]) {
    this.itemSearchEntity = new ItemSearchEntity();
    this.itemSearchEntity.ids = ids;
    return this.codeFormulaDetailService.getItemList(this.itemSearchEntity);
  }

  onSearchItems(event) {
    const searchEntity: ItemSearchEntity = new ItemSearchEntity();
    searchEntity.name.startsWith = event;
    searchEntity.legalEntityId = this.legalEntityId.value;
    searchEntity.ids = this.itemSearchEntity.ids;
    this.itemSearchTypingSubject.next(searchEntity);
  }

  onSelectItems(items) {
    this.itemSearchEntity.ids = items.map((item: ItemEntity) => item.id);
    this.selectedItemList = items;
  }

  onClearSelectedItems() {
    this.selectedItemList = [];
    this.itemSearchEntity.ids = [];
  }

  redirectToList() {
    return this.router.navigate(['/master-data/legal-entity/code-formula/code-formula-list']);
  }

  onLoadItems(event) {
    if (this.codeFormulaForm.value.id) {
      return this.codeFormulaDetailService.getItemList(this.itemSearchEntity);
    }
  }

  removeItemFromList(item: ItemEntity) {
    const rest: ItemEntity[] = this.itemDetails.value.filter((i: ItemEntity, index) => item.id !== i.id);
    this.codeFormulaForm.setControl('itemDetails', this.fb.array(rest));
  }

  onFilterSplitRules(event) {

  }

  toggleRuleModal() {
    this.ruleModal = !this.ruleModal;
  }

  deleteRule(index: number) {
    this.splitRuleContents.removeAt(index);
  }

  addRule() {
    this.codeFormulaDetailService.resetSplitRuleContentForm();
    this.toggleRuleModal();
  }

  saveRule() {
    if (this.splitRuleContentForm.invalid) {
      this.generalService.validateAllFormFields(this.splitRuleContentForm);
    }

    if (this.splitRuleContentForm.valid) {
      let data: SplitRuleContentEntity[] = [];
      const splitRuleContentEntity: SplitRuleContentEntity = new SplitRuleContentEntity(this.splitRuleContentForm.value);
      if (splitRuleContentEntity.id) {
        const index: number = this.splitRuleContents.value.find((r: SplitRuleContentEntity) => r.id === splitRuleContentEntity.id);
        this.splitRuleContents.setControl(index, this.fb.group(splitRuleContentEntity));
      } else {
        data = [
          ...this.splitRuleContents.value,
          this.splitRuleContentForm.value,
        ];
        this.codeFormulaForm.setControl(
          'splitRuleContents',
          this.fb.array(
            data.map((splitRule: SplitRuleContentEntity) => this.fb.group(splitRule)),
          ),
        );
      }
      this.ruleModal = false;
    }
  }

  splitRuleContentSelector = node => node;

  onSelectSplitRuleContent(splitRuleContentEntity) {
    this.splitRuleContentForm.controls.itemFieldId.setValue(splitRuleContentEntity.id);
    this.splitRuleContentForm.controls.itemFieldDisplay.setValue(splitRuleContentEntity.display);
  }

  cancelRule() {
    this.codeFormulaDetailService.resetSplitRuleContentForm();
    this.toggleRuleModal();
  }

  editRule(splitRule: SplitRuleContentEntity) {
    this.codeFormulaDetailService.editRule(splitRule);
    this.ruleModal = true;
  }

  onTestRule(event) {
    const {value} = event.target;

    if (value) {
      this.codeFormulaDetailService.analyzeSplitRule(
        new SplitRuleTestEntity(this.splitRuleTestForm.value),
      );
    }
  }

  onChangeTab(event) {
    if (event.index === 2) {
      this.codeFormulaDetailService.save(this.codeFormulaForm.value)
        .then(() => {
        });
    }
  }
}
