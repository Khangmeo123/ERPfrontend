import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {DatePipe} from '@angular/common';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {GeneralService} from '../../../../../../../_helpers/general-service.service';
import {ToastrService} from 'ngx-toastr';
import {TaxTemplateDetailService} from './tax-template-detail.service';
import {TaxTemplateTypeEntity} from '../../../../../_backend/tax-template/tax-template.entity';
import {UomEntity} from '../../../../../_backend/uom/uom.entity';
import {UomSearchEntity} from '../../../../../_backend/uom/uom.searchentity';
import {Entities} from '../../../../../../../_helpers/entity';

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
  public ruleModal: boolean = false;

  public taxTemplateForm: FormGroup;

  public generalTab: boolean = true;

  public subscription: Subscription = new Subscription();

  public taxTemplateContentForm: FormGroup;

  public typeList: TaxTemplateTypeEntity[] = [];

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public uomTyping: Subject<UomSearchEntity> = new Subject<UomSearchEntity>();

  constructor(
    private taxTemplateDetailService: TaxTemplateDetailService,
    private route: ActivatedRoute,
    private generalService: GeneralService,
    private router: Router,
    private toastrService: ToastrService,
    private fb: FormBuilder,
    private datePipe: DatePipe,
  ) {
    const taxTemplateDetailSub: Subscription = this.taxTemplateDetailService.taxTemplateForm
      .subscribe((form: FormGroup) => {
        this.taxTemplateForm = form;
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

    });

    this.subscription
      .add(taxTemplateDetailSub)
      .add(routeSub)
      .add(uomListSub)
      .add(uomTypingSub)
      .add(typeListSub);
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

  get errors() {
    return this.taxTemplateForm.get('errors') as FormGroup;
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
    return this.router.navigate([
      '/master-data/legal-entity/tax-template/tax-template-list',
    ]);
  }


  redirectToList() {
    return this.router.navigate(['/master-data/legal-entity/tax-template/tax-template-list']);
  }

  onSelectTaxTemplateType(event) {
    if (event) {
      this.typeId.setValue(event.id);
      this.typeDisplay.setValue(event.display);
    }
  }
}
