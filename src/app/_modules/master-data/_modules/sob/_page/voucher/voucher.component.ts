import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { FormGroup } from '@angular/forms';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { Entities } from '../../../../../../_helpers/entity';
import { VoucherListSearchEntity } from '../../../../_backend/voucher-list/voucher-list.searchentity';
import { VoucherListEntity } from '../../../../_backend/voucher-list/voucher-list.entity';
import { VoucherListService } from './voucher.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.scss'],
  providers: [
    GeneralService,
    VoucherListService,
    ToastrService,
  ]
})
export class VoucherComponent implements OnInit {
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

  public voucherListList: VoucherListEntity[] = [];

  public voucherListCount: number = 0;

  public voucherListSearchEntity: VoucherListSearchEntity = new VoucherListSearchEntity();

  public voucherListForm: FormGroup;

  public setOfBookId: string = '';

  constructor(
    private voucherListService: VoucherListService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
  ) {
    const sobListSub = this.voucherListService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const voucherListSub = this.voucherListService.voucherListList.subscribe((list) => {
      this.voucherListList = list;
    });

    const voucherListCountSub = this.voucherListService.voucherListCount.subscribe((count) => {
      this.voucherListCount = count;
      this.pagination.totalItems = count;
    });

    const voucherListFormSub = this.voucherListService.voucherListForm.subscribe((form: FormGroup) => {
      this.voucherListForm = form;
      if (this.setOfBookId) {
        this.voucherListForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    this.subs.add(sobListSub)
      .add(voucherListSub)
      .add(voucherListFormSub)
      .add(voucherListCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  add() {
    if (this.setOfBookId) {
      this.voucherListService.add();
      this.showDialog();
    } else {
      this.toastrService.error('Phải chọn bộ sổ trước?');
    }
  }

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  changeSob(event) {
    const [setOfBookId] = event;
    this.voucherListSearchEntity.setOfBookId = setOfBookId;
    this.voucherListForm.controls.setOfBookId.setValue(setOfBookId);
    this.setOfBookId = setOfBookId;
    this.getList();
  }

  getList() {
    this.voucherListService.getList(this.voucherListSearchEntity);
  }

  getSobList() {
    this.voucherListService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.voucherListService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(event) {
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.voucherListService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.voucherListForm.invalid) {
      this.generalService.validateAllFormFields(this.voucherListForm);
    }
    if (this.voucherListForm.valid) {
      const data = this.voucherListForm.getRawValue();
      const entity = new VoucherListEntity(data);
      this.voucherListService.save(entity, this.voucherListSearchEntity)
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
      this.voucherListSearchEntity.orderBy = event.sortField;
      this.voucherListSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.voucherListSearchEntity = new VoucherListSearchEntity();
    table.reset();
  }

  onClickDelete() {
    this.voucherListService.delete(this.voucherListForm.value, this.voucherListSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }
}
