import { Component, OnInit } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { FormGroup } from '@angular/forms';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { Entities } from '../../../../../../_helpers/entity';
import { CoaService } from './coa.service';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { ToastrService } from 'ngx-toastr';
import { CharacteristicEntity } from '../../../../_backend/characteristic/characteristic.entity';

@Component({
  selector: 'app-coa',
  templateUrl: './coa.component.html',
  styleUrls: ['./coa.component.scss'],
  providers: [
    CoaService,
    GeneralService,
    ToastrService,
  ],
})
export class CoaComponent implements OnInit {
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

  public coaList: CoaEntity[] = [];

  public parentAccountList: CoaEntity[] = [];

  public parentAccountSearchEntity: CoaSearchEntity = new CoaSearchEntity();

  public selectedParentAccountList: CoaEntity[] = [];

  public coaCount: number = 0;

  public coaSearchEntity: CoaSearchEntity = new CoaSearchEntity();

  public coaForm: FormGroup;

  public setOfBookId: string = '';

  public characteristicList: CharacteristicEntity[] = [];

  constructor(
    private coaService: CoaService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
  ) {
    const sobListSub = this.coaService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const coaSub = this.coaService.coaList.subscribe((list: any[]) => {
      this.coaList = list;
    });

    const parentAccountSub = this.coaService.parentAccountList.subscribe((list) => {
      this.parentAccountList = list;
    });

    const coaCountSub = this.coaService.coaCount.subscribe((count) => {
      this.coaCount = count;
    });

    const coaFormSub = this.coaService.coaForm.subscribe((form: FormGroup) => {
      this.coaForm = form;
      if (this.setOfBookId) {
        this.coaForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    const characteristicListSub = this.coaService.characteristicList.subscribe((list) => {
      this.characteristicList = list;
    });

    this.coaService.add();

    this.subs.add(sobListSub)
      .add(coaSub)
      .add(coaFormSub)
      .add(characteristicListSub)
      .add(parentAccountSub)
      .add(coaCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  getParentAccountList() {
    this.coaService.getParentAccountList(this.parentAccountSearchEntity);
  }

  getCharacteristicList() {
    this.coaService.getCharacteristicList();
  }

  add() {
    if (this.currentSob) {
      this.coaService.add();
      this.showDialog();
    } else {
      this.toastrService.error('Phải chọn bộ sổ trước');
    }
  }

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  changeSob([setOfBookId]) {
    this.coaSearchEntity.setOfBookId = setOfBookId;
    this.coaForm.controls.setOfBookId.setValue(setOfBookId);
    this.setOfBookId = setOfBookId;
    this.getList();
  }

  getList() {
    this.coaService.getList(this.coaSearchEntity);
  }

  getSobList() {
    this.coaService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.coaService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(event) {
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.coaService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.coaForm.invalid) {
      this.generalService.validateAllFormFields(this.coaForm);
    }
    if (this.coaForm.valid) {
      this.coaService.save(this.coaForm.value, this.coaSearchEntity)
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
      this.coaSearchEntity.orderBy = event.sortField;
      this.coaSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.coaSearchEntity = new CoaSearchEntity();
    table.reset();
  }

  onClickDelete() {
    this.coaService.delete(this.coaForm.value, this.coaSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }
}
