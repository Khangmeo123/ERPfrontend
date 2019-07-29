import { Component, OnInit } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { FormGroup } from '@angular/forms';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { Entities } from '../../../../../../_helpers/entity';
import { BankAccountEntity } from '../../../../_backend/bank-account/bank-account.entity';
import { BankAccountSearchEntity } from '../../../../_backend/bank-account/bank-account.searchentity';
import { BankAccountService } from './bank_account.service';
import { ChartOfAccountEntity } from '../../../../_backend/chart-of-account/chart-of-account.entity';
import { ChartOfAccountSearchEntity } from '../../../../_backend/chart-of-account/chart-of-account.search-entity';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bank-account',
  templateUrl: './bank-account.component.html',
  styleUrls: ['./bank-account.component.scss'],
  providers: [
    BankAccountService,
    GeneralService,
    ToastrService,
  ]
})
export class BankAccountComponent implements OnInit {
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

  public bankAccountList: BankAccountEntity[] = [];

  public bankAccountCount: number = 0;

  public bankAccountSearchEntity: BankAccountSearchEntity = new BankAccountSearchEntity();

  public bankAccountForm: FormGroup;

  public coaList: ChartOfAccountEntity[] = [];

  public selectedCoaList: ChartOfAccountEntity[] = [];

  public coaSearchEntity: ChartOfAccountSearchEntity = new ChartOfAccountSearchEntity();

  public setOfBookId: string = '';

  constructor(
    private bankAccountService: BankAccountService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
  ) {
    const sobListSub = this.bankAccountService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const coaListSub = this.bankAccountService.coaList.subscribe((coaList: Entities) => {
      this.coaList = coaList.exceptIds;
      this.selectedCoaList = coaList.ids;
    });

    const bankAccountSub = this.bankAccountService.bankAccountList.subscribe((list) => {
      this.bankAccountList = list;
    });

    const bankAccountCountSub = this.bankAccountService.bankAccountCount.subscribe((count) => {
      this.bankAccountCount = count;
      this.pagination.totalItems = count;
    });

    const bankAccountFormSub = this.bankAccountService.bankAccountForm.subscribe((form: FormGroup) => {
      this.bankAccountForm = form;
      if (this.setOfBookId) {
        this.bankAccountForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    this.subs.add(sobListSub)
      .add(bankAccountSub)
      .add(bankAccountFormSub)
      .add(coaListSub)
      .add(bankAccountCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  getCoaList() {
    this.bankAccountService.getCoaList(this.coaSearchEntity);
  }

  add() {
    if (this.currentSob) {
      this.bankAccountService.add();
      this.showDialog();
    } else {
      this.toastrService.error('Phải chọn bộ sổ trước');
    }
  }

  paginationOutput(event) {

  }

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  changeSob([setOfBookId]) {
    this.bankAccountSearchEntity.setOfBookId = setOfBookId;
    this.bankAccountForm.controls.setOfBookId.setValue(setOfBookId);
    this.setOfBookId = setOfBookId;
    this.getList();
  }

  getList() {
    this.bankAccountService.getList(this.bankAccountSearchEntity);
  }

  getSobList() {
    this.bankAccountService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.bankAccountService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination: PaginationModel) {
    this.bankAccountSearchEntity.skip = pagination.skip;
    this.bankAccountSearchEntity.take = pagination.take;
    this.bankAccountService.getList(this.bankAccountSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.bankAccountService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.bankAccountForm.invalid) {
      this.generalService.validateAllFormFields(this.bankAccountForm);
    }
    if (this.bankAccountForm.valid) {
      const data = this.bankAccountForm.getRawValue();
      const entity = new BankAccountEntity(data);
      this.bankAccountService.save(entity, this.bankAccountSearchEntity)
        .then((res) => {
          this.isShowDialog = res;
        })
        .catch((err) => {
          this.isShowDialog = err;
        });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.bankAccountSearchEntity.orderBy = event.sortField;
      this.bankAccountSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.bankAccountSearchEntity = new BankAccountSearchEntity();
    table.reset();
  }

  onClickDelete() {
    this.bankAccountService.delete(this.bankAccountForm.value, this.bankAccountSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }
}
