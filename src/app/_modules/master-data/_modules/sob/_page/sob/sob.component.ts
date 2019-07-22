import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { SobService } from './sob.service';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { BookmarkService } from '../../../../../../_services';
import { Router } from '@angular/router';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { ImportTaxEntity } from '../../../../_backend/import-tax/import-tax.entity';
import { ImportTaxSearchEntity } from '../../../../_backend/import-tax/import-tax.searchEntity';
import { ExportTaxEntity } from '../../../../_backend/export-tax/export-tax.entity';
import { ExportTaxSearchEntity } from '../../../../_backend/export-tax/export-tax.searchEntity';
import { EnvironmentTaxEntity } from '../../../../_backend/environment-tax/environment-tax.entity';
import { EnvironmentTaxSearchEntity } from '../../../../_backend/environment-tax/environment-tax.searchEntity';
import { ValueAddedTaxEntity } from '../../../../_backend/value-added-tax/value-added-tax.entity';
import { ValueAddedTaxSearchEntity } from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import { NaturalResourceTaxSearchentity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.searchentity';
import { SpecialConsumptionTaxEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.entity';
import { SpecialConsumptionTaxSearchentity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';

@Component({
  selector: 'app-sob',
  templateUrl: './sob.component.html',
  styleUrls: ['./sob.component.scss'],
  providers: [
    SobService,
  ],
})
export class SobComponent implements OnInit, OnDestroy, OnChanges {
  pageTitle: string = 'sob.header.title';

  isSaveBookMark: boolean = false;

  isShowDialog: boolean = false;

  pagination: PaginationModel = new PaginationModel();

  sobSearchEntity: SobSearchEntity = new SobSearchEntity();

  sobList: SobEntity[] = [];

  currencySearchEntity: CurrencySearchEntity = new CurrencySearchEntity();

  currencyList: CurrencyEntity[] = [];

  coaList: CoaEntity[] = [];

  coaSearchEntity = new CoaSearchEntity();

  importTaxTemplates: ImportTaxEntity[] = [];

  importTaxSearchEntity: ImportTaxSearchEntity = new ImportTaxSearchEntity();

  exportTaxTemplates: ExportTaxEntity[] = [];

  exportTaxSearchEntity: ExportTaxSearchEntity = new ExportTaxSearchEntity();

  environmentTaxTemplates: EnvironmentTaxEntity[] = [];

  environmentTaxSearchEntity: EnvironmentTaxSearchEntity = new EnvironmentTaxSearchEntity();

  valueAddedTaxTemplates: ValueAddedTaxEntity[] = [];

  valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity = new ValueAddedTaxSearchEntity();

  naturalResourceTaxTemplates: NaturalResourceTaxEntity[] = [];

  naturalResourceTaxSearchEntity: NaturalResourceTaxSearchentity = new NaturalResourceTaxSearchentity();

  specialConsumptionTaxTemplates: SpecialConsumptionTaxEntity[] = [];

  specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity = new SpecialConsumptionTaxSearchentity();

  sobForm: FormGroup;

  sobSubs: Subscription = new Subscription();

  popoverTitle: string = '';

  popoverMessage: string = 'Bạn có chắc chắn muốn xóa?';

  visible = false;

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
        this.currencyList = res;
      }
    });

    const coaListSub = this.sobService.coaList.subscribe((res) => {
      if (res) {
        this.coaList = res;
      }
    });

    const importTaxSub = this.sobService.importTaxTemplates.subscribe((res) => {
      if (res) {
        this.importTaxTemplates = res;
      }
    });

    const exportTaxSub = this.sobService.exportTaxTemplates.subscribe((res) => {
      if (res) {
        this.exportTaxTemplates = res;
      }
    });

    const environmentTaxSub = this.sobService.exportTaxTemplates.subscribe((res) => {
      if (res) {
        this.environmentTaxTemplates = res;
      }
    });

    const naturalResourceTaxSub = this.sobService.naturalResourceTaxTemplates.subscribe((res) => {
      if (res) {
        this.naturalResourceTaxTemplates = res;
      }
    });

    const valueAddedTaxSub = this.sobService.valueAddedTaxTemplates.subscribe((res) => {
      if (res) {
        this.valueAddedTaxTemplates = res;
      }
    });

    const specialConsumptionTaxSub = this.sobService.specialConsumptionTaxTemplates.subscribe((res) => {
      if (res) {
        this.specialConsumptionTaxTemplates = res;
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
    this.visible = !this.visible;
  }

  ngOnInit() {
    this.sobSearchEntity.skip = this.pagination.skip;
    this.sobSearchEntity.take = this.pagination.take;
    this.getList();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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

  add() {
    this.isShowDialog = true;
    this.sobService.add();
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
      this.sobSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
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
