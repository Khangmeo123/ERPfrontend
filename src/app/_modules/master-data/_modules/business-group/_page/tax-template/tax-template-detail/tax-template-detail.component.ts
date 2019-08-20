import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GeneralService} from '../../../../../../../_services/general-service.service';
import {ToastrService} from 'ngx-toastr';
import {TaxTemplateDetailService} from './tax-template-detail.service';
import {TaxTemplateEntity, TaxTemplateTypeEntity} from '../../../../../_backend/tax-template/tax-template.entity';
import {UomEntity} from '../../../../../_backend/uom/uom.entity';
import {UomSearchEntity} from '../../../../../_backend/uom/uom.searchentity';
import {Entities} from '../../../../../../../_helpers/entity';
import {TaxTemplateContentEntity} from '../../../../../_backend/tax-template-content/tax-template-content.entity';
import {TaxTemplateContentSearchEntity} from '../../../../../_backend/tax-template-content/tax-template-content.search-entity';
import {TaxTemplateContentForm} from '../../../../../_backend/tax-template-content/tax-template-content.form';

@Component({
  selector: 'app-tax-template-detail',
  templateUrl: './tax-template-detail.component.html',
  styleUrls: ['./tax-template-detail.component.scss'],
  providers: [
    TaxTemplateDetailService,
    GeneralService,
    DatePipe,
  ],
})
export class TaxTemplateDetailComponent implements OnInit, OnChanges, OnDestroy {
  public taxModal: boolean = false;

  public taxTemplateForm: FormGroup;

  public generalTab: boolean = true;

  public subscription: Subscription = new Subscription();

  public typeList: TaxTemplateTypeEntity[] = [];

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public uomTyping: Subject<UomSearchEntity> = new Subject<UomSearchEntity>();

  public taxTemplateDetailSearchEntity = new TaxTemplateContentSearchEntity();

  public taxTemplateContentForm: FormGroup;

  public exportLink: string = '';

  public downloadLink: string = '';

  public parentTaxList: TaxTemplateContentEntity[] = [];

  public selectedParentTaxList: TaxTemplateContentEntity[] = [];

  public parentTaxSearchEntity: TaxTemplateContentSearchEntity = new TaxTemplateContentSearchEntity();

  constructor(
    private taxTemplateDetailService: TaxTemplateDetailService,
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private router: Router,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    const taxTemplateFormSub: Subscription = this.taxTemplateDetailService.taxTemplateForm
      .subscribe((form: FormGroup) => {
        this.taxTemplateForm = form;
      });

    const TaxTemplateContentFormSub: Subscription = this.taxTemplateDetailService.taxTemplateContentForm
      .subscribe((form: FormGroup) => {
        this.taxTemplateContentForm = form;
      });

    const typeListSub: Subscription = this.taxTemplateDetailService.typeList.subscribe((list: TaxTemplateTypeEntity[]) => {
      this.typeList = list;
    });

    const uomListSub: Subscription = this.taxTemplateDetailService.uomList.subscribe((entities: Entities) => {
      this.uomList = entities.exceptIds;
      this.selectedUomList = entities.ids;
    });

    const uomTypingSub: Subscription = this.taxTemplateDetailService.searchUomListByTyping(this.uomTyping);

    const routeSub: Subscription = this.route.queryParams.subscribe((params: Params) => {
      if (params.id) {
        const taxTemplateEntity: TaxTemplateEntity = new TaxTemplateEntity();
        taxTemplateEntity.id = params.id;
        this.taxTemplateDetailService.get(taxTemplateEntity);
      }
    });

    this.subscription
      .add(taxTemplateFormSub)
      .add(routeSub)
      .add(uomListSub)
      .add(uomTypingSub)
      .add(typeListSub)
      .add(TaxTemplateContentFormSub);
  }

  get legalEntityId() {
    return this.taxTemplateForm.get('legalEntityId') as FormControl;
  }

  get code() {
    return this.taxTemplateForm.get('code') as FormControl;
  }

  get name() {
    return this.taxTemplateForm.get('name') as FormControl;
  }

  get typeId() {
    return this.taxTemplateForm.get('typeId') as FormControl;
  }

  get typeDisplay() {
    return this.taxTemplateForm.get('typeDisplay') as FormControl;
  }

  get specificCode() {
    return this.taxTemplateContentForm.get('code') as FormControl;
  }

  get specificName() {
    return this.taxTemplateContentForm.get('code') as FormControl;
  }

  get parentCode() {
    return this.taxTemplateContentForm.get('parentCode') as FormControl;
  }

  get rate() {
    return this.taxTemplateContentForm.get('rate') as FormControl;
  }

  get description() {
    return this.taxTemplateContentForm.get('description') as FormControl;
  }

  get unitOfMeasureId() {
    return this.taxTemplateContentForm.get('unitOfMeasureId') as FormControl;
  }

  get unitOfMeasureName() {
    return this.taxTemplateContentForm.get('unitOfMeasureName') as FormControl;
  }

  get errors() {
    return this.taxTemplateForm.get('errors') as FormGroup;
  }

  get specificErrors() {
    return this.taxTemplateContentForm.get('errors') as FormGroup;
  }

  get taxTemplateContents() {
    return this.taxTemplateForm.get('taxTemplateContents') as FormArray;
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

  taxTemplateTypeSelector = (node) => node;

  save() {
    if (this.taxTemplateForm.invalid) {
      this.generalService.validateAllFormFields(this.taxTemplateForm);
    }
    if (this.taxTemplateForm.valid) {
      return this.taxTemplateDetailService.save(this.taxTemplateForm.value)
        .then(() => {
          return this.redirectToList();
        });
    }
  }

  cancel() {
    this.taxTemplateDetailService.resetForm();
    this.router.navigate(['/master-data/business-group/tax-template/tax-template-list'])
      .then(() => {
      });
  }

  redirectToList() {
    return this.router.navigate(['/master-data/business-group/tax-template/tax-template-list']);
  }

  onSelectTaxTemplateType(event) {
    if (event) {
      this.typeId.setValue(event.id);
      this.typeDisplay.setValue(event.display);
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.taxTemplateDetailSearchEntity.orderBy = event.sortField;
      this.taxTemplateDetailSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
  }

  add() {
    this.taxTemplateDetailService.resetTaxTemplateContentForm();
    this.taxModal = true;
  }

  editTaxTemplate(taxTemplateDetailEntity: TaxTemplateContentEntity) {
    this.taxTemplateDetailService.editTaxTemplate(taxTemplateDetailEntity);
    this.taxModal = true;
  }

  deleteTaxTemplate(index: number) {
    this.taxTemplateContents.removeAt(index);
  }

  clearSearch(table) {
    this.taxTemplateDetailSearchEntity = new TaxTemplateContentSearchEntity();
    table.reset();
  }

  getUnitOfMeasureList() {
    this.uomSearchEntity = new UomSearchEntity();
    if (this.unitOfMeasureId.value) {
      this.uomSearchEntity.ids = [
        this.unitOfMeasureId.value,
      ];
    }
    return this.taxTemplateDetailService.getUnitOfMeasureList(this.uomSearchEntity);
  }

  onSelectUnitOfMeasure(event) {
    if (event && event.length) {
      this.unitOfMeasureId.setValue(event[0]);
    } else {
      this.unitOfMeasureId.setValue(null);
    }
  }

  saveTaxTemplate() {
    if (this.taxTemplateContentForm.invalid) {
      this.generalService.validateAllFormFields(this.taxTemplateContentForm);
    }

    if (this.taxTemplateContentForm.valid) {
      const taxTemplateDetailEntity: TaxTemplateContentEntity = new TaxTemplateContentEntity(this.taxTemplateContentForm.value);
      if (taxTemplateDetailEntity.id) {
        const index: number = this.taxTemplateContents.value.find((item) => item.id === taxTemplateDetailEntity.id);
        this.taxTemplateContents.setControl(index, this.fb.group(
          new TaxTemplateContentForm(taxTemplateDetailEntity),
        ));
      } else {
        const data: TaxTemplateContentEntity[] = [
          ...this.taxTemplateContents.value,
          taxTemplateDetailEntity,
        ];
        this.taxTemplateForm.setControl(
          'taxTemplateContents',
          this.fb.array(
            data.map((item) => this.fb.group(
              new TaxTemplateContentForm(item),
              ),
            ),
          ));
      }

      this.taxModal = false;
    }
  }

  cancelTaxTemplate() {
    this.taxTemplateDetailService.resetTaxTemplateContentForm();
    this.taxModal = false;
  }

  getParentTaxList() {
    const {ids} = this.parentTaxSearchEntity;
    this.parentTaxSearchEntity = new TaxTemplateContentSearchEntity();
    this.parentTaxSearchEntity.ids = ids;
    this.taxTemplateDetailService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onSearchParentTaxList(event) {

  }
}
