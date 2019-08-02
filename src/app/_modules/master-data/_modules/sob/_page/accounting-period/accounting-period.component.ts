import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { FormControl, FormGroup } from '@angular/forms';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { ToastrService } from 'ngx-toastr';
import { Entities } from '../../../../../../_helpers/entity';
import { AccountingPeriodEntity } from '../../../../_backend/accounting-period/accounting-period.entity';
import { AccountingPeriodSearchEntity } from '../../../../_backend/accounting-period/accounting-period.searchentity';
import { AccountingPeriodService } from './accounting-period.service';
import { FiscalYearEntity } from '../../../../_backend/fiscal-year/fiscal-year.entity';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';

@Component({
  selector: 'app-accounting-period',
  templateUrl: './accounting-period.component.html',
  styleUrls: ['./accounting-period.component.scss'],
  providers: [
    GeneralService,
    ToastrService,
    AccountingPeriodService,
  ]
})
export class AccountingPeriodComponent implements OnInit {
  isSaveBookMark: boolean = false;

  bookMarkId: string;

  isChecked = false;

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

  public fiscalYearId: string = '';

  public coaList: CoaEntity[] = [];

  public coaSearchEntity: CoaSearchEntity = new CoaSearchEntity();

  public selectedCoaList: CoaEntity[] = [];

  public fiscalYearList: FiscalYearEntity[] = [];

  public fiscalYearSearchEntity: FiscalYearSearchEntity = new FiscalYearSearchEntity();

  public periodTypeList: any[] = [];

  constructor(
    private accountingPeriodService: AccountingPeriodService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
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

    const fiscalYearListSub = this.accountingPeriodService.fiscalYearList.subscribe((list: FiscalYearEntity[]) => {
      this.fiscalYearList = list;
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

  get validFrom() {
    return this.accountingPeriodForm.get('validFrom') as FormControl;
  }

  get validTo() {
    return this.accountingPeriodForm.get('validTo') as FormControl;
  }

  getPeriodTypeList() {
    return this.accountingPeriodService.getPeriodTypeList();
  }

  onClickChange() {
    this.isChecked = !this.isChecked;
  }

  getCoaList() {
    this.accountingPeriodService.getCoaList(this.coaSearchEntity);
  }

  add() {
    if (this.setOfBookId) {
      this.accountingPeriodService.add();
      this.showDialog();
    } else {
      this.toastrService.error('Phải chọn bộ sổ trước?');
    }
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
    return this.accountingPeriodService.getFiscalYearList(this.fiscalYearSearchEntity);
  }

  changeFiscalYear(event) {
    const [fiscalYearId] = event;
    this.accountingPeriodSearchEntity.fiscalYearId = fiscalYearId;
    this.accountingPeriodForm.controls.fiscalYearId.setValue(fiscalYearId);
    this.setOfBookId = fiscalYearId;
    this.getList();
  }

  changeSob(event) {
    const [setOfBookId] = event;
    this.accountingPeriodSearchEntity.setOfBookId = setOfBookId;
    this.accountingPeriodForm.controls.setOfBookId.setValue(setOfBookId);
    this.setOfBookId = setOfBookId;
    this.getList();
  }

  getList() {
    this.accountingPeriodService.getList(this.accountingPeriodSearchEntity);
  }

  getSobList() {
    this.accountingPeriodService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.accountingPeriodService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination: PaginationModel) {
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
