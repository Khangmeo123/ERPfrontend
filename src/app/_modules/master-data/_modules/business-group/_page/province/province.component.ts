import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {ProvinceEntity} from '../../../../_backend/province/province.entity';
import {ProvinceSearchEntity} from '../../../../_backend/province/province.searchentity';
import {GeneralService} from '../../../../../../_services/general-service.service';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {ProvinceService} from './province.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-province',
  templateUrl: './province.component.html',
  styleUrls: ['./province.component.scss'],
  providers: [
    GeneralService,
    ToastrService,
    ProvinceService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class ProvinceComponent implements OnInit, OnDestroy {
  public modal: boolean = false;

  public pagination: PaginationModel = new PaginationModel();

  public provinceList: ProvinceEntity[] = [];

  public provinceSearchEntity: ProvinceSearchEntity = new ProvinceSearchEntity();

  public subscription: Subscription = new Subscription();

  public exportLink: string = '/master-data/business-group/province/export';

  public downloadLink: string = '/master-data/business-group/province/download-template';

  public provinceForm: FormGroup;


  constructor(private generalService: GeneralService, private toastrService: ToastrService, private provinceService: ProvinceService) {
    const listSub: Subscription = this.provinceService.provinceList.subscribe((provinceList: ProvinceEntity[]) => {
      this.provinceList = provinceList;
    });

    const countSub: Subscription = this.provinceService.provinceCount.subscribe((count: number) => {
      this.pagination.totalItems = count;
    });

    const formSub: Subscription = this.provinceService.provinceForm.subscribe((form: FormGroup) => {
      this.provinceForm = form;
    });

    this.subscription
      .add(listSub)
      .add(countSub)
      .add(formSub);
  }

  get code() {
    return this.provinceForm.get('code') as FormControl;
  }

  get name() {
    return this.provinceForm.get('name') as FormControl;
  }

  get errors() {
    return this.provinceForm.get('errors') as FormGroup;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.getList();
  }

  paginationOut(event) {
    this.provinceSearchEntity.skip = event.skip;
    this.provinceSearchEntity.take = event.take;
    this.getList();
  }

  getList() {
    this.provinceService.getList(this.provinceSearchEntity);
  }

  public toggleModal() {
    this.modal = !this.modal;
  }

  sort(event) {
    if (event.sortField && event.sortOrder) {
      this.provinceSearchEntity.orderBy = event.sortField;
      this.provinceSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table) {
    this.provinceSearchEntity = new ProvinceSearchEntity();
    table.reset();
  }

  save() {
    if (this.provinceForm.invalid) {
      this.generalService.validateAllFormFields(this.provinceForm);
    }

    if (this.provinceForm.valid) {
      return this.provinceService.save(this.provinceForm.value)
        .then(() => {
          this.getList();
          this.toggleModal();
        });
    }
  }

  cancel() {
    this.provinceService.resetForm();
    this.toggleModal();
  }

  edit(provinceEntity: ProvinceEntity) {
    this.provinceService.edit(provinceEntity);
    this.toggleModal();
  }

  delete(provinceEntity: ProvinceEntity) {
    this.provinceService.delete(provinceEntity)
      .then(() => {
        this.getList();
        this.toggleModal();
      });
  }

  importTemplate(files: FileList) {
    this.provinceService.importFile(files)
      .then(() => {
        this.getList();
      });
  }

  add() {
    this.provinceService.resetForm();
    this.toggleModal();
  }
}
