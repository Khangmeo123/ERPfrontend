import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ItemEntity} from '../../../../../_backend/item/item.entity';
import {SplitRuleEntity} from '../../../../../_backend/code-formula/code-formula.entity';
import {CodeFormulaDetailService} from './code-formula-detail.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GeneralService} from '../../../../../../../_helpers/general-service.service';
import {ItemSearchEntity} from '../../../../../_backend/item/item.searchentity';
import {PaginationModel} from '../../../../../../../_shared/modules/pagination/pagination.model';
import {SplitRuleContentSearchEntity} from '../../../../../_backend/code-formula/code-formula.search-entity';

@Component({
  selector: 'app-code-formula-detail',
  templateUrl: './code-formula-detail.component.html',
  styleUrls: ['./code-formula-detail.component.scss'],
  providers: [
    CodeFormulaDetailService,
    GeneralService,
  ],
})
export class CodeFormulaDetailComponent implements OnInit, OnChanges, OnDestroy {
  public codeFormulaForm: FormGroup;

  public generalTab: boolean = true;

  public ruleTab: boolean = true;

  public itemTab: boolean = true;

  public itemModal: boolean = false;

  public codeFormulaItemForm: FormGroup;

  public subscription: Subscription = new Subscription();

  public appliedItemList: ItemEntity[] = [];

  public appliedItemSearchEntity: ItemSearchEntity = new ItemSearchEntity();

  public appliedItemPagination: PaginationModel = new PaginationModel();

  public itemList: ItemEntity[] = [];

  public itemSearchEntity: ItemSearchEntity = new ItemSearchEntity();

  public itemPagination: PaginationModel = new PaginationModel();

  public splitRuleContentSearchEntity = new SplitRuleContentSearchEntity();

  constructor(
    private codeFormulaDetailService: CodeFormulaDetailService,
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private router: Router,
  ) {
    const codeFormulaDetailSub: Subscription = this.codeFormulaDetailService.codeFormulaForm.subscribe((form: FormGroup) => {
      this.codeFormulaForm = form;
    });

    const routeSub: Subscription = this.route.queryParams.subscribe((params: Params) => {
      if (params && params.id) {
        const splitRuleEntity: SplitRuleEntity = new SplitRuleEntity();
        splitRuleEntity.id = params.id;
        this.codeFormulaDetailService.get(splitRuleEntity);
      }
    });

    this.subscription
      .add(codeFormulaDetailSub)
      .add(routeSub);
  }

  get code() {
    return this.codeFormulaForm.get('code') as FormControl;
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

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.codeFormulaDetailService.getItemList(this.itemSearchEntity);
    this.codeFormulaDetailService.getAppliedItemList(this.appliedItemSearchEntity);
  }

  toggleGeneralTab() {
    this.generalTab = !this.generalTab;
  }

  toggleRuleTab() {
    this.ruleTab = !this.ruleTab;
  }

  toggleItemTab() {
    this.itemTab = !this.itemTab;
  }

  toggleItemModal() {
    this.itemModal = !this.itemModal;
  }

  addItem() {
    this.codeFormulaDetailService.getItemList(this.itemSearchEntity);
    this.toggleItemModal();
  }

  editItem(item: ItemEntity) {

  }

  save() {
    if (this.codeFormulaForm.invalid) {
      this.generalService.validateAllFormFields(this.codeFormulaForm);
    }
    if (this.codeFormulaForm.valid) {
      return this.codeFormulaDetailService.save(this.codeFormulaForm.value);
    }
  }

  saveItem() {

  }

  deleteItem(item: ItemEntity) {

  }

  editRule(rule: SplitRuleEntity) {

  }

  cancelItem() {
    this.toggleItemModal();
  }

  cancel() {
    this.codeFormulaDetailService.cancel();
    return this.router.navigate([
      '/master-data/legal-entity/code-formula/code-formula-list',
    ]);
  }
}
