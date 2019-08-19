import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { FormControl, FormGroup } from '@angular/forms';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { GeneralService } from '../../../../../../_services/general-service.service';
import { Entities } from '../../../../../../_helpers/entity';
import { AccountingPeriodEntity } from '../../../../_backend/accounting-period/accounting-period.entity';
import { AccountingPeriodSearchEntity } from '../../../../_backend/accounting-period/accounting-period.searchentity';
import { AccountingPeriodService } from './accounting-period.service';
import { FiscalYearEntity } from '../../../../_backend/fiscal-year/fiscal-year.entity';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';
import { requiredField } from '../../../../../../_helpers';
import {debug} from 'util';

@Component({
  selector: 'app-accounting-period',
  templateUrl: './accounting-period.component.html',
  styleUrls: ['./accounting-period.component.scss'],
  providers: [
    GeneralService,
    AccountingPeriodService,
  ],
})
export class AccountingPeriodComponent implements OnInit {
  isSaveBookMark: boolean = false;

  bookMarkId: string;

  autoGenerate = false;

  isShowDialog = false;

  pagination = new PaginationModel();

  public popoverTitle: string = 'Popover title';

  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  public confirmClicked: boolean = false;

  public cancelClicked: boolean = false;

  public subs: Subscription = new Subscription();

  public sobList: SobEntity[] = [];

  public selectedSobList: SobEntity[] = [];

  public sobSearchEntity: SobSearchEntity = new SobSearchEntity();

  public accountingPeriodList: AccountingPeriodEntity[] = [];

  public accountingPeriodCount: number = 0;

  public accountingPeriodSearchEntity: AccountingPeriodSearchEntity = new AccountingPeriodSearchEntity();

  public accountingPeriodForm: FormGroup;

  public setOfBookId: string = null;

  public fiscalYearId: string = null;

  public coaList: CoaEntity[] = [];

  public coaSearchEntity: CoaSearchEntity = new CoaSearchEntity();

  public selectedCoaList: CoaEntity[] = [];

  public fiscalYearList: FiscalYearEntity[] = [];

  public selectedFiscalYearList: FiscalYearEntity[] = [];

  public fiscalYearSearchEntity: FiscalYearSearchEntity = new FiscalYearSearchEntity();

  public periodTypeList: any[] = [];

  constructor(
    private accountingPeriodService: AccountingPeriodService,
    private generalService: GeneralService,
  ) {
    const sobListSub = this.accountingPeriodService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const accountingPeriodSub = this.accountingPeriodService.accountingPeriodList.subscribe((list) => {
      this.accountingPeriodList = list;
    });

    const accountingPeriodCountSub = this.accountingPeriodService.accountingPeriodCount.subscribe((count) => {
      this.accountingPeriodCount = count;
      this.pagination.totalItems = count;
    });

    const accountingPeriodFormSub = this.accountingPeriodService.accountingPeriodForm.subscribe((form: FormGroup) => {
      this.accountingPeriodForm = form;
      if (this.setOfBookId) {
        this.accountingPeriodForm.controls.setOfBookId.setValue(this.setOfBookId);
        this.accountingPeriodForm.controls.fiscalYearId.setValue(this.fiscalYearId);
      }
    });

    const periodTypeListSub = this.accountingPeriodService.periodTypeList.subscribe((list) => {
      this.periodTypeList = list;
    });

    const coaListSub = this.accountingPeriodService.coaList.subscribe((list: Entities) => {
      this.coaList = list.exceptIds;
      this.selectedCoaList = list.ids;
    });

    const fiscalYearListSub = this.accountingPeriodService.fiscalYearList.subscribe((list: Entities) => {
      this.fiscalYearList = list.exceptIds;
      this.selectedFiscalYearList = list.ids;
    });

    this.subs.add(sobListSub)
      .add(accountingPeriodSub)
      .add(coaListSub)
      .add(periodTypeListSub)
      .add(fiscalYearListSub)
      .add(accountingPeriodFormSub)
      .add(accountingPeriodCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  get periodTypeId() {
    return this.accountingPeriodForm.get('periodTypeId') as FormControl;
  }

  get startPeriod() {
    return this.accountingPeriodForm.get('startPeriod') as FormControl;
  }

  get endPeriod() {
    return this.accountingPeriodForm.get('endPeriod') as FormControl;
  }

  get errors() {
    return this.accountingPeriodForm.get('errors') as FormGroup;
  }

  onSelectPeriodType(event) {
    this.periodTypeId.setValue(event);
  }

  getPeriodTypeList() {
    return this.accountingPeriodService.getPeriodTypeList();
  }

  onChangePeriodType(event) {
    const {
      target: {
        value,
        checked,
      },
    } = event;
    this.autoGenerate = checked;
    if (checked) {
      this.periodTypeId.setValidators([
        requiredField,
      ]);

      this.startPeriod.clearValidators();
      this.startPeriod.setValue(null);

      this.endPeriod.clearValidators();
      this.endPeriod.setValue(null);

      this.periodTypeId.updateValueAndValidity();
      this.startPeriod.updateValueAndValidity();
      this.endPeriod.updateValueAndValidity();
    } else {
      this.periodTypeId.clearValidators();
      this.periodTypeId.setValue(null);

      this.startPeriod.setValidators([
        requiredField,
      ]);
      this.endPeriod.setValidators([
        requiredField,
      ]);

      this.periodTypeId.updateValueAndValidity();
      this.startPeriod.updateValueAndValidity();
      this.endPeriod.updateValueAndValidity();
    }
  }

  getCoaList() {
    this.accountingPeriodService.getCoaList(this.coaSearchEntity);
  }

  add() {
    this.accountingPeriodService.add();
    this.showDialog();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.accountingPeriodSearchEntity.orderBy = event.sortField;
      this.accountingPeriodSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  getFiscalYearList() {
    this.fiscalYearSearchEntity = new FiscalYearSearchEntity();
    this.fiscalYearSearchEntity.setOfBookId = this.setOfBookId;
    if (this.fiscalYearId) {
      this.fiscalYearSearchEntity.ids = [
        this.fiscalYearId,
      ];
    }
    return this.accountingPeriodService.getFiscalYearList(this.fiscalYearSearchEntity);
  }

  changeFiscalYear(event) {
    const [fiscalYearId] = event;
    this.accountingPeriodSearchEntity.fiscalYearId = fiscalYearId;
    this.accountingPeriodForm.controls.fiscalYearId.setValue(fiscalYearId);
    this.fiscalYearId = fiscalYearId;
    this.getList();
  }

  changeSob(event) {
    this.sobSearchEntity.ids = event;
    if (event && event.length) {
      const [setOfBookId] = event;
      this.accountingPeriodSearchEntity.setOfBookId = setOfBookId;
      this.accountingPeriodForm.controls.setOfBookId.setValue(setOfBookId);
      this.setOfBookId = setOfBookId;
      this.getList();
    }
  }

  onSearchSetOfBook(event) {
    this.sobSearchEntity.name.startsWith = event;
    this.accountingPeriodService.getSobList(this.sobSearchEntity);
  }

  getList() {
    this.accountingPeriodService.getList(this.accountingPeriodSearchEntity);
  }

  getSobList() {
    this.sobSearchEntity = new SobSearchEntity();
    if (this.setOfBookId) {
      this.sobSearchEntity.ids = [
        this.setOfBookId,
      ];
    }
    this.accountingPeriodService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.accountingPeriodService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination) {
    this.accountingPeriodSearchEntity.skip = pagination.skip;
    this.accountingPeriodSearchEntity.take = pagination.take;
    this.accountingPeriodService.getList(this.accountingPeriodSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.accountingPeriodService.cancel();
    this.isShowDialog = false;
  }

  periodTypeSelector = (node) => node.code;

  onClickSave() {
    if (this.accountingPeriodForm.invalid) {
      this.generalService.validateAllFormFields(this.accountingPeriodForm);
    }
    if (this.accountingPeriodForm.valid) {
      this.accountingPeriodService.save(this.accountingPeriodForm.value, this.accountingPeriodSearchEntity)
        .then((res) => {
          this.isShowDialog = res;
        })
        .catch((err) => {
          this.isShowDialog = err;
        });
    }
  }

  clearSearch(table: any) {
    this.accountingPeriodSearchEntity = new AccountingPeriodSearchEntity();
    table.reset();
  }

  onClickDelete() {
    this.accountingPeriodService.deactivate(this.accountingPeriodForm.value, this.accountingPeriodSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }
}
