import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {ToastrService} from 'ngx-toastr';
import {Subject, Subscription} from 'rxjs';
import {FormControl, FormGroup} from '@angular/forms';
import {TaxTemplateEntity, TaxTemplateTypeEntity} from '../../../../_backend/tax-template/tax-template.entity';
import {TaxTemplateSearchEntity} from '../../../../_backend/tax-template/tax-template.search-entity';
import {TaxTemplateService} from './tax-template.service';
import {Entities} from '../../../../../../_helpers/entity';
import {UomEntity} from '../../../../_backend/uom/uom.entity';
import {UomSearchEntity} from '../../../../_backend/uom/uom.searchentity';
import {Router} from '@angular/router';

@Component({
  selector: 'app-tax-template',
  templateUrl: './tax-template.component.html',
  styleUrls: ['./tax-template.component.scss'],
  providers: [
    GeneralService,
    ToastrService,
    TaxTemplateService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class TaxTemplateComponent implements OnInit, OnDestroy {
  public modal: boolean = false;

  public pagination: PaginationModel = new PaginationModel();

  public taxTemplateList: TaxTemplateEntity[] = [];

  public taxTemplateSearchEntity: TaxTemplateSearchEntity = new TaxTemplateSearchEntity();

  public subscription: Subscription = new Subscription();

  public exportLink: string = '/master-data/business-group/tax-template/export';

  public downloadLink: string = '/master-data/business-group/tax-template/download-template';

  public taxTemplateForm: FormGroup;

  public typeList: TaxTemplateTypeEntity[] = [];

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public uomTyping: Subject<UomSearchEntity> = new Subject<UomSearchEntity>();

  constructor(
    private generalService: GeneralService,
    private toastrService: ToastrService,
    private taxTemplateService: TaxTemplateService,
    private router: Router,
  ) {
    const listSub: Subscription = this.taxTemplateService.taxTemplateList
      .subscribe((taxTemplateList: TaxTemplateEntity[]) => {
        this.taxTemplateList = taxTemplateList;
      });

    const countSub: Subscription = this.taxTemplateService.taxTemplateCount
      .subscribe((count: number) => {
        this.pagination.totalItems = count;
      });

    const formSub: Subscription = this.taxTemplateService.taxTemplateForm.subscribe((form: FormGroup) => {
      this.taxTemplateForm = form;
    });

    const typeListSub: Subscription = this.taxTemplateService.typeList.subscribe((list: TaxTemplateTypeEntity[]) => {
      this.typeList = list;
    });

    const uomListSub: Subscription = this.taxTemplateService.uomList.subscribe((entities: Entities) => {
      this.uomList = entities.exceptIds;
      this.selectedUomList = entities.ids;
    });

    const uomTypingSub: Subscription = this.taxTemplateService.searchUomListByTyping(this.uomTyping);

    this.subscription
      .add(listSub)
      .add(countSub)
      .add(formSub)
      .add(typeListSub)
      .add(uomTypingSub);
  }

  get code() {
    return this.taxTemplateForm.get('code') as FormControl;
  }

  get type() {
    return this.taxTemplateForm.get('type') as FormControl;
  }

  get name() {
    return this.taxTemplateForm.get('name') as FormControl;
  }

  get errors() {
    return this.taxTemplateForm.get('errors') as FormGroup;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getList();
  }

  paginationOut(event) {
    this.taxTemplateSearchEntity.skip = event.skip;
    this.taxTemplateSearchEntity.take = event.take;
    this.getList();
  }

  getList() {
    this.taxTemplateService.getList(this.taxTemplateSearchEntity);
  }

  public toggleModal() {
    this.modal = !this.modal;
  }

  sort(event) {
    if (event.sortField && event.sortOrder) {
      this.taxTemplateSearchEntity.orderBy = event.sortField;
      this.taxTemplateSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table) {
    this.taxTemplateSearchEntity = new TaxTemplateSearchEntity();
    table.reset();
  }

  save() {
    if (this.taxTemplateForm.invalid) {
      this.generalService.validateAllFormFields(this.taxTemplateForm);
    }

    if (this.taxTemplateForm.valid) {
      return this.taxTemplateService.save(this.taxTemplateForm.value)
        .then(() => {
          this.getList();
          this.toggleModal();
        });
    }
  }

  cancel() {
    this.taxTemplateService.resetForm();
    this.toggleModal();
  }

  edit(taxTemplateEntity: TaxTemplateEntity) {
    this.taxTemplateService.edit(taxTemplateEntity);
    this.toggleModal();
  }

  delete(taxTemplateEntity: TaxTemplateEntity) {
    this.taxTemplateService.delete(taxTemplateEntity)
      .then(() => {
        this.getList();
        this.toggleModal();
      });
  }

  importTemplate(files: FileList) {
    this.taxTemplateService.importFile(files)
      .then(() => {
        this.getList();
      });
  }

  taxTemplateTypeSelector = node => node;

  onFilterTaxTemplateType(event) {
    if (event) {
      this.taxTemplateSearchEntity.typeDisplay = event.display;
      this.taxTemplateSearchEntity.typeId = event.id;
    }
    this.getList();
  }

  add() {
    return this.router.navigate(
      ['/master-data/business-group/tax-template/tax-template-detail'],
    );
  }
}
