import { Component, OnDestroy, OnInit } from '@angular/core';
import { SobService } from './sob.service';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { BookmarkService } from '../../../../../../_services';
import { Router } from '@angular/router';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.searchEntity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.searchEntity';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.searchEntity';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import { NaturalResourceTaxSearchentity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.searchentity';
import { SpecialConsumptionTaxSearchentity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';
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

  importTaxTemplates: ImportTaxEntity[] = [];

  importTaxSearchEntity: ImportTaxSearchEntity = new ImportTaxSearchEntity();

  selectedImportTaxTemplates: ImportTaxEntity[] = [];

  exportTaxTemplates: ExportTaxEntity[] = [];

  selectedExportTaxTemplates: ExportTaxEntity[] = [];

  exportTaxSearchEntity: ExportTaxSearchEntity = new ExportTaxSearchEntity();

  environmentTaxTemplates: EnvironmentTaxEntity[] = [];

  selectedEnvironmentTaxTemplates: EnvironmentTaxEntity[] = [];

  environmentTaxSearchEntity: EnvironmentTaxSearchEntity = new EnvironmentTaxSearchEntity();

  valueAddedTaxTemplates: ValueAddedTaxEntity[] = [];

  selectedValueAddedTaxTemplates: ValueAddedTaxEntity[] = [];

  valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity = new ValueAddedTaxSearchEntity();

  naturalResourceTaxTemplates: NaturalResourceTaxEntity[] = [];

  selectedNaturalResourceTaxTemplates: NaturalResourceTaxEntity[] = [];

  naturalResourceTaxSearchEntity: NaturalResourceTaxSearchentity = new NaturalResourceTaxSearchentity();

  specialConsumptionTaxTemplates: SpecialConsumptionTaxEntity[] = [];

  selectedSpecialConsumptionTaxTemplates: SpecialConsumptionTaxEntity[] = [];

  specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity = new SpecialConsumptionTaxSearchentity();

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

    const importTaxSub = this.sobService.importTaxTemplates.subscribe((res) => {
      if (res) {
        this.importTaxTemplates = res.exceptIds;
        this.selectedImportTaxTemplates = res.ids;
      }
    });

    const exportTaxSub = this.sobService.exportTaxTemplates.subscribe((res) => {
      if (res) {
        this.exportTaxTemplates = res.exceptIds;
        this.selectedExportTaxTemplates = res.ids;
      }
    });

    const environmentTaxSub = this.sobService.environmentTaxTemplates.subscribe((res) => {
      if (res) {
        this.environmentTaxTemplates = res.exceptIds;
        this.selectedEnvironmentTaxTemplates = res.ids;
      }
    });

    const naturalResourceTaxSub = this.sobService.naturalResourceTaxTemplates.subscribe((res) => {
      if (res) {
        this.naturalResourceTaxTemplates = res.exceptIds;
        this.selectedNaturalResourceTaxTemplates = res.ids;
      }
    });

    const valueAddedTaxSub = this.sobService.valueAddedTaxTemplates.subscribe((res) => {
      if (res) {
        this.valueAddedTaxTemplates = res.exceptIds;
        this.selectedValueAddedTaxTemplates = res.ids;
      }
    });

    const specialConsumptionTaxSub = this.sobService.specialConsumptionTaxTemplates.subscribe((res) => {
      if (res) {
        this.specialConsumptionTaxTemplates = res.exceptIds;
        this.selectedSpecialConsumptionTaxTemplates = res.ids;
      }
    });

    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});
    this.sobSubs.add(sobListSub)
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

  onSelectId(data: string[], field: string) {
    const control: FormControl = this.sobForm.get(field) as FormControl;
    if (control !== null) {
      if (data.length) {
        control.setValue(data[0]);
      } else {
        control.setValue(null);
      }
    }
  }

  getImportTaxTemplates() {
    this.sobService.getImportTaxTemplates(this.importTaxSearchEntity);
  }

  getExportTaxTemplates() {
    this.sobService.getExportTaxTemplates(this.exportTaxSearchEntity);
  }

  getEnvironmentTemplates() {
    this.sobService.getEnvironmentTaxTemplates(this.environmentTaxSearchEntity);
  }

  getNaturalResourceTaxTemplates() {
    this.sobService.getNaturalResourceTaxTemplates(this.naturalResourceTaxSearchEntity);
  }

  getValueAddedTaxTemplates() {
    this.sobService.getValueAddedTaxTemplates(this.valueAddedTaxSearchEntity);
  }

  getSpecialConsumptionTaxTemplates() {
    this.sobService.getSpecialConsumptionTaxTemplates(this.specialConsumptionTaxSearchEntity);
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

  delete() {
    this.sobService.delete(this.sobForm.value, this.sobSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.sobForm.valid) {
      this.generalService.validateAllFormFields(this.sobForm);
      console.log(this.sobForm.getRawValue());
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

  paginationOut(pagination: PaginationModel) {
    this.sobSearchEntity.skip = pagination.skip;
    this.sobSearchEntity.take = pagination.take;
    this.sobService.getList(this.sobSearchEntity);
  }

  clearSearch(table: any) {
    this.sobSearchEntity = new SobSearchEntity();
    table.reset();
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
