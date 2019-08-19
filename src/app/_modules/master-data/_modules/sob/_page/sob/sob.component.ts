import { Component, OnDestroy, OnInit } from '@angular/core';
import { SobService } from './sob.service';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../../../../../_services/general-service.service';
import { BookmarkService } from '../../../../../../_services';
import { Router } from '@angular/router';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.search-entity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.search-entity';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.search-entity';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import { NaturalResourceTaxSearchEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.search-entity';
import { SpecialConsumptionTaxSearchEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';
import { ValueAddedTaxEntity } from '../../../../_backend/value-added-tax/value-added-tax.entity';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import { SpecialConsumptionTaxEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.entity';

@Component({
  selector: 'app-sob',
  templateUrl: './sob.component.html',
  styleUrls: ['./sob.component.scss'],
  providers: [
    SobService,
  ],
})
export class SobComponent implements OnInit, OnDestroy {
  pageTitle: string = 'sob.header.title';

  isSaveBookMark: boolean = false;

  isShowDialog: boolean = false;

  pagination: PaginationModel = new PaginationModel();

  sobSearchEntity: SobSearchEntity = new SobSearchEntity();

  sobList: SobEntity[] = [];

  currencySearchEntity: CurrencySearchEntity = new CurrencySearchEntity();

  currencyList: CurrencyEntity[] = [];

  selectedCurrencyList: CurrencyEntity[] = [];

  coaList: CoaEntity[] = [];

  coaSearchEntity = new CoaSearchEntity();

  selectedCoaList: CoaEntity[] = [];

  importTaxTemplateList: ImportTaxEntity[] = [];

  importTaxSearchEntity: ImportTaxSearchEntity = new ImportTaxSearchEntity();

  selectedImportTaxTemplateList: ImportTaxEntity[] = [];

  exportTaxTemplateList: ExportTaxEntity[] = [];

  selectedExportTaxTemplateList: ExportTaxEntity[] = [];

  exportTaxSearchEntity: ExportTaxSearchEntity = new ExportTaxSearchEntity();

  environmentTaxTemplateList: EnvironmentTaxEntity[] = [];

  selectedEnvironmentTaxTemplateList: EnvironmentTaxEntity[] = [];

  environmentTaxSearchEntity: EnvironmentTaxSearchEntity = new EnvironmentTaxSearchEntity();

  valueAddedTaxTemplateList: ValueAddedTaxEntity[] = [];

  selectedValueAddedTaxTemplateList: ValueAddedTaxEntity[] = [];

  valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity = new ValueAddedTaxSearchEntity();

  naturalResourceTaxTemplateList: NaturalResourceTaxEntity[] = [];

  selectedNaturalResourceTaxTemplateList: NaturalResourceTaxEntity[] = [];

  naturalResourceTaxSearchEntity: NaturalResourceTaxSearchEntity = new NaturalResourceTaxSearchEntity();

  specialConsumptionTaxTemplateList: SpecialConsumptionTaxEntity[] = [];

  selectedSpecialConsumptionTaxTemplateList: SpecialConsumptionTaxEntity[] = [];

  specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchEntity = new SpecialConsumptionTaxSearchEntity();

  sobForm: FormGroup;

  sobSubs: Subscription = new Subscription();

  popoverTitle: string = '';

  popoverMessage: string = 'Bạn có chắc chắn muốn xóa?';

  constructor(
    private sobService: SobService,
    private generalService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router,
  ) {
    const sobListSub = this.sobService.sobList.subscribe(res => {
      if (res) {
        this.sobList = res;
      }
    });

    const sobFormSub = this.sobService.sobForm.subscribe(res => {
      if (res) {
        this.sobForm = res;
      }
    });

    const sobCountSub = this.sobService.sobCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });

    const currencyListSub = this.sobService.currencyList.subscribe((res) => {
      if (res) {
        this.currencyList = res.exceptIds;
        this.selectedCurrencyList = res.ids;
      }
    });

    const coaListSub = this.sobService.coaList.subscribe((res) => {
      if (res) {
        this.coaList = res.exceptIds;
        this.selectedCoaList = res.ids;
      }
    });

    const importTaxSub = this.sobService.importTaxTemplateList.subscribe((res) => {
      if (res) {
        this.importTaxTemplateList = res.exceptIds;
        this.selectedImportTaxTemplateList = res.ids;
      }
    });

    const exportTaxSub = this.sobService.exportTaxTemplateList.subscribe((res) => {
      if (res) {
        this.exportTaxTemplateList = res.exceptIds;
        this.selectedExportTaxTemplateList = res.ids;
      }
    });

    const environmentTaxSub = this.sobService.environmentTaxTemplateList.subscribe((res) => {
      if (res) {
        this.environmentTaxTemplateList = res.exceptIds;
        this.selectedEnvironmentTaxTemplateList = res.ids;
      }
    });

    const naturalResourceTaxSub = this.sobService.naturalResourceTaxTemplateList.subscribe((res) => {
      if (res) {
        this.naturalResourceTaxTemplateList = res.exceptIds;
        this.selectedNaturalResourceTaxTemplateList = res.ids;
      }
    });

    const valueAddedTaxSub = this.sobService.valueAddedTaxTemplateList.subscribe((res) => {
      if (res) {
        this.valueAddedTaxTemplateList = res.exceptIds;
        this.selectedValueAddedTaxTemplateList = res.ids;
      }
    });

    const specialConsumptionTaxSub = this.sobService.specialConsumptionTaxTemplateList.subscribe((res) => {
      if (res) {
        this.specialConsumptionTaxTemplateList = res.exceptIds;
        this.selectedSpecialConsumptionTaxTemplateList = res.ids;
      }
    });

    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});
    this.sobSubs
      .add(sobListSub)
      .add(sobFormSub)
      .add(sobCountSub)
      .add(bookMarkNotify)
      .add(currencyListSub)
      .add(coaListSub)
      .add(importTaxSub)
      .add(exportTaxSub)
      .add(environmentTaxSub)
      .add(naturalResourceTaxSub)
      .add(specialConsumptionTaxSub)
      .add(valueAddedTaxSub);
  }

  get name() {
    return this.sobForm.get('name') as FormControl;
  }

  get currencyId() {
    return this.sobForm.get('currencyId') as FormControl;
  }

  get code() {
    return this.sobForm.get('code') as FormControl;
  }

  get errors() {
    return this.sobForm.get('errors') as FormControl;
  }

  onSelectId(data, field: string) {
    const control: FormControl = this.sobForm.get(field) as FormControl;
    if (control !== null) {
      if (data && data.length) {
        control.setValue(data[0]);
      } else {
        control.setValue(null);
      }
    }
  }

  getImportTaxTemplateList() {
    this.importTaxSearchEntity = new ImportTaxSearchEntity();
    if (this.sobForm.controls.importTaxTemplateId.value) {
      this.importTaxSearchEntity.ids = [
        this.sobForm.controls.importTaxTemplateId.value,
      ];
    } else {
      this.importTaxSearchEntity.ids = this.selectedImportTaxTemplateList.map((item) => item.id);
    }
    this.sobService.getImportTaxTemplateList(this.importTaxSearchEntity);
  }

  getExportTaxTemplateList() {
    this.exportTaxSearchEntity = new ExportTaxSearchEntity();
    if (this.sobForm.controls.exportTaxTemplateId.value) {
      this.exportTaxSearchEntity.ids = [
        this.sobForm.controls.exportTaxTemplateId.value,
      ];
    } else {
      this.exportTaxSearchEntity.ids = this.selectedExportTaxTemplateList.map((item) => item.id);
    }
    this.sobService.getExportTaxTemplateList(this.exportTaxSearchEntity);
  }

  getEnvironmentTemplateList() {
    this.environmentTaxSearchEntity = new EnvironmentTaxSearchEntity();
    if (this.sobForm.controls.environmentTaxTemplateId.value) {
      this.environmentTaxSearchEntity.ids = [
        this.sobForm.controls.environmentTaxTemplateId.value,
      ];
    } else {
      this.environmentTaxSearchEntity.ids = this.selectedEnvironmentTaxTemplateList.map((item) => item.id);
    }
    this.sobService.getEnvironmentTaxTemplateList(this.environmentTaxSearchEntity);
  }

  getNaturalResourceTaxTemplateList() {
    this.naturalResourceTaxSearchEntity = new NaturalResourceTaxSearchEntity();
    if (this.sobForm.controls.naturalResourceTaxTemplateId.value) {
      this.naturalResourceTaxSearchEntity.ids = [
        this.sobForm.controls.naturalResourceTaxTemplateId.value,
      ];
    } else {
      this.naturalResourceTaxSearchEntity.ids = this.selectedNaturalResourceTaxTemplateList.map((item) => item.id);
    }
    this.sobService.getNaturalResourceTaxTemplateList(this.naturalResourceTaxSearchEntity);
  }

  getValueAddedTaxTemplateList() {
    this.valueAddedTaxSearchEntity = new ValueAddedTaxSearchEntity();
    if (this.sobForm.controls.valueAddedTaxTemplateId.value) {
      this.valueAddedTaxSearchEntity.ids = [
        this.sobForm.controls.valueAddedTaxTemplateId.value,
      ];
    } else {
      this.valueAddedTaxSearchEntity.ids = this.selectedValueAddedTaxTemplateList.map((item) => item.id);
    }
    this.sobService.getValueAddedTaxTemplateList(this.valueAddedTaxSearchEntity);
  }

  getSpecialConsumptionTaxTemplateList() {
    this.specialConsumptionTaxSearchEntity = new SpecialConsumptionTaxSearchEntity();
    if (this.sobForm.controls.specialConsumptionTaxTemplateId.value) {
      this.specialConsumptionTaxSearchEntity.ids = [
        this.sobForm.controls.specialConsumptionTaxTemplateId.value,
      ];
    } else {
      this.specialConsumptionTaxSearchEntity.ids = this.selectedSpecialConsumptionTaxTemplateList.map((item) => item.id);
    }
    this.sobService.getSpecialConsumptionTaxTemplateList(this.specialConsumptionTaxSearchEntity);
  }

  toggleModal() {
    this.isShowDialog = !this.isShowDialog;
  }

  ngOnInit() {
    this.sobSearchEntity.skip = this.pagination.skip;
    this.sobSearchEntity.take = this.pagination.take;
    this.getList();
  }

  getCurrencyList() {
    this.currencySearchEntity = new CurrencySearchEntity();
    if (this.sobForm.controls.currencyId.value) {
      this.currencySearchEntity.ids = [
        this.sobForm.controls.currencyId.value,
      ];
    } else {
      this.currencySearchEntity.ids = this.selectedCurrencyList.map((item) => item.id);
    }
    this.sobService.getCurrencyList(this.currencySearchEntity);
  }

  getCoaList() {
    this.sobService.getCoaList(this.coaSearchEntity);
  }

  ngOnDestroy() {
    this.sobSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.sobSearchEntity.skip = 0;
    this.sobSearchEntity.take = this.pagination.take;
    this.sobService.getList(this.sobSearchEntity);
  }

  cancelModal() {
    this.sobService.cancel();
    this.toggleModal();
  }

  add() {
    this.sobService.add();
    this.isShowDialog = true;
  }

  edit(sobId: string) {
    this.sobService.edit(sobId);
    this.isShowDialog = true;
  }

  deactivate() {
    this.sobService.deactivate(this.sobForm.value, this.sobSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.sobForm.valid) {
      this.generalService.validateAllFormFields(this.sobForm);
    } else {
      this.sobService.save(this.sobForm.value, this.sobSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.sobSearchEntity.orderBy = event.sortField;
      this.sobSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  paginationOut(pagination) {
    this.sobSearchEntity.skip = pagination.skip;
    this.sobSearchEntity.take = pagination.take;
    this.sobService.getList(this.sobSearchEntity);
  }

  clearSearch(table: any) {
    this.sobSearchEntity = new SobSearchEntity();
    table.reset();
  }

  onSearchCurrency(event) {
    this.currencySearchEntity.code.startsWith = event;
    this.sobService.getCurrencyList(this.currencySearchEntity);
  }

  onSearchChartOfAccount(event) {
    this.coaSearchEntity.name.startsWith = event;
    this.sobService.getCoaList(this.coaSearchEntity);
  }

  onSearchImportTaxTemplate(event) {
    this.importTaxSearchEntity.name.startsWith = event;
    this.sobService.getCoaList(this.coaSearchEntity);
  }

  onSearchExportTaxTemplate(event) {
    this.exportTaxSearchEntity.name.startsWith = event;
    this.sobService.getExportTaxTemplateList(this.exportTaxSearchEntity);
  }

  onSearchValueAddedTaxTemplate(event) {
    this.valueAddedTaxSearchEntity.name.startsWith = event;
    this.sobService.getValueAddedTaxTemplateList(this.valueAddedTaxSearchEntity);
  }

  onSearchNaturalResourceTemplate(event) {
    this.naturalResourceTaxSearchEntity.name.startsWith = event;
    this.sobService.getNaturalResourceTaxTemplateList(this.naturalResourceTaxSearchEntity);
  }

  onSearchSpecialConsumptionTaxTemplate(event) {
    this.specialConsumptionTaxSearchEntity.name.startsWith = event;
    this.sobService.getSpecialConsumptionTaxTemplateList(this.specialConsumptionTaxSearchEntity);
  }

  onSearchEnvironmentTaxTemplate(event) {
    this.environmentTaxSearchEntity.name.startsWith = event;
    this.sobService.getEnvironmentTaxTemplateList(this.environmentTaxSearchEntity);
  }

  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({name: this.pageTitle, route: this.router.url});
    } else {
      this.bookmarkService.deleteBookMarks({name: this.pageTitle, route: this.router.url});
    }
  }
}
