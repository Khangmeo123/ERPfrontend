import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { ToastrService } from 'ngx-toastr';
import { Entities } from '../../../../../../_helpers/entity';
import { FiscalYearEntity } from '../../../../_backend/fiscal-year/fiscal-year.entity';
import { FiscalYearSearchEntity } from '../../../../_backend/fiscal-year/fiscal-year.searchentity';
import { FiscalYearService } from './fiscal-year.service';

@Component({
  selector: 'app-fiscal-year',
  templateUrl: './fiscal-year.component.html',
  styleUrls: ['./fiscal-year.component.scss'],
  providers: [
    FiscalYearService,
    GeneralService,
    ToastrService,
  ]
})
export class FiscalYearComponent implements OnInit {
  isSaveBookMark: boolean = false;

  bookMarkId: string;

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

  public fiscalYearList: FiscalYearEntity[] = [];

  public fiscalYearCount: number = 0;

  public fiscalYearSearchEntity: FiscalYearSearchEntity = new FiscalYearSearchEntity();

  public fiscalYearForm: FormGroup;

  public setOfBookId: string = '';

  public inventoryValuationMethodList = [];

  public statusList = [];

  constructor(
    private fiscalYearService: FiscalYearService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
  ) {
    const sobListSub = this.fiscalYearService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const fiscalYearSub = this.fiscalYearService.fiscalYearList.subscribe((list) => {
      this.fiscalYearList = list;
    });

    const fiscalYearCountSub = this.fiscalYearService.fiscalYearCount.subscribe((count) => {
      this.fiscalYearCount = count;
      this.pagination.totalItems = count;
    });

    const inventoryValuationMethodListSub = this.fiscalYearService.inventoryValuationMethodList.subscribe((list) => {
      this.inventoryValuationMethodList = list;
    });

    const statusListSub = this.fiscalYearService.statusList.subscribe((list) => {
      this.statusList = list;
    });

    const fiscalYearFormSub = this.fiscalYearService.fiscalYearForm.subscribe((form: FormGroup) => {
      this.fiscalYearForm = form;
      if (this.setOfBookId) {
        this.fiscalYearForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    this.subs.add(sobListSub)
      .add(fiscalYearSub)
      .add(fiscalYearFormSub)
      .add(inventoryValuationMethodListSub)
      .add(fiscalYearCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  get startDate() {
    return this.fiscalYearForm.get('startDate') as FormControl;
  }

  get endDate() {
    return this.fiscalYearForm.get('endDate') as FormControl;
  }

  get inventoryValuationMethod() {
    return this.fiscalYearForm.get('inventoryValuationMethod') as FormControl;
  }

  getInventoryValuationMethodList() {
    this.fiscalYearService.getInventoryValuationMethodList();
  }

  add() {
    if (this.setOfBookId) {
      this.fiscalYearService.add();
      this.showDialog();
    } else {
      this.toastrService.error('Phải chọn bộ sổ trước?');
    }
  }

  get statusId() {
    return this.fiscalYearForm.get('statusId') as FormControl;
  }

  valuationMethodSelector = (node) => node.code;

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  changeSob(event) {
    const [setOfBookId] = event;
    this.fiscalYearSearchEntity.setOfBookId = setOfBookId;
    this.fiscalYearForm.controls.setOfBookId.setValue(setOfBookId);
    this.setOfBookId = setOfBookId;
    this.getList();
  }

  getList() {
    this.fiscalYearService.getList(this.fiscalYearSearchEntity);
  }

  getSobList() {
    this.fiscalYearService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.fiscalYearService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination: PaginationModel) {
    this.fiscalYearSearchEntity.skip = pagination.skip;
    this.fiscalYearSearchEntity.take = pagination.take;
    this.fiscalYearService.getList(this.fiscalYearSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.fiscalYearService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.fiscalYearForm.invalid) {
      this.generalService.validateAllFormFields(this.fiscalYearForm);
    }
    if (this.fiscalYearForm.valid) {
      const data = this.fiscalYearForm.getRawValue();
      const entity = new FiscalYearEntity(data);
      this.fiscalYearService.save(entity, this.fiscalYearSearchEntity)
        .then((res) => {
          this.isShowDialog = res;
        })
        .catch((err) => {
          this.isShowDialog = err;
        });
    }
  }

  getStatusList() {
    this.fiscalYearService.getStatusList();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.fiscalYearSearchEntity.orderBy = event.sortField;
      this.fiscalYearSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.fiscalYearSearchEntity = new FiscalYearSearchEntity();
    table.reset();
  }

  onClickDelete() {
    this.fiscalYearService.delete(this.fiscalYearForm.value, this.fiscalYearSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }
}
