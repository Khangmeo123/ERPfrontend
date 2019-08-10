import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Subscription} from 'rxjs';
import {SobEntity} from '../../../../_backend/sob/sob.entity';
import {SobSearchEntity} from '../../../../_backend/sob/sob.searchentity';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../../_helpers/entity';
import {CoaService} from './coa.service';
import {CoaEntity} from '../../../../_backend/coa/coa.entity';
import {CoaSearchEntity} from '../../../../_backend/coa/coa.searchentity';
import {ToastrService} from 'ngx-toastr';
import {CharacteristicEntity} from '../../../../_backend/characteristic/characteristic.entity';

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

  public pagination: PaginationModel = new PaginationModel();

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

  public selectedParentAccountList: CoaSearchEntity[] = [];

  public parentSearchEntity: CoaSearchEntity = new CoaSearchEntity();

  public coaCount: number = 0;

  public coaSearchEntity: CoaSearchEntity = new CoaSearchEntity();

  public coaForm: FormGroup;

  public setOfBookId: string = null;

  public characteristicList: CharacteristicEntity[] = [];

  constructor(
    private coaService: CoaService,
    private generalService: GeneralService,
  ) {
    const sobListSub = this.coaService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const coaSub = this.coaService.coaList.subscribe((list: any[]) => {
      this.coaList = list;
    });

    const parentAccountSub = this.coaService.parentAccountList.subscribe((entities: Entities) => {
      this.parentAccountList = entities.exceptIds;
      this.selectedParentAccountList = entities.ids;
    });

    const coaCountSub = this.coaService.coaCount.subscribe((count) => {
      this.coaCount = count;
      this.pagination.totalItems = count;
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

  get characteristicId() {
    return this.coaForm.get('characteristicId') as FormControl;
  }

  get parentId() {
    return this.coaForm.get('parentId') as FormControl;
  }

  getParentAccountList() {
    const ids = this.parentSearchEntity.ids;
    this.parentSearchEntity = new CoaSearchEntity();
    this.parentSearchEntity.ids = [
      ...ids,
    ];
    this.parentSearchEntity.setOfBookId = this.setOfBookId;
    this.coaService.getParentAccountList(this.parentSearchEntity);
  }

  searchParentTaxList(event) {
    this.parentSearchEntity.code.startsWith = event;
    this.coaService.getParentAccountList(this.parentSearchEntity);
  }

  getCharacteristicList() {
    if (!this.characteristicList.length) {
      this.coaService.getCharacteristicList();
    }
  }

  onSelectParentChartOfAccount(event) {
    if (event && event.length) {
      this.parentId.setValue(event[0]);
    }
  }

  add() {
    this.coaService.add();
    this.showDialog();
  }

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  changeSob(event) {
    this.sobSearchEntity.ids = event;
    if (event.length) {
      const [setOfBookId] = event;
      this.coaSearchEntity.setOfBookId = setOfBookId;
      this.coaForm.controls.setOfBookId.setValue(setOfBookId);
      this.setOfBookId = setOfBookId;
      this.getList();
    }
  }

  getList() {
    this.coaService.getList(this.coaSearchEntity);
  }

  getSobList() {
    const ids = this.sobSearchEntity.ids;
    this.sobSearchEntity = new SobSearchEntity();
    this.sobSearchEntity.ids = ids;
    this.coaService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.coaService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination) {
    this.coaSearchEntity.skip = pagination.skip;
    this.coaSearchEntity.take = pagination.take;
    this.coaService.getList(this.coaSearchEntity);
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
    this.coaSearchEntity.setOfBookId = this.setOfBookId;
    table.reset();
  }

  onClickDelete() {
    this.coaService.deactivate(this.coaForm.value, this.coaSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }

  onFilterCharacteristic(event) {
    this.coaSearchEntity.characteristicId = event;
    this.getList();
  }

  onSearchSetOfBook(event) {
    this.sobSearchEntity.name.startsWith = event;
    this.coaService.getSobList(this.sobSearchEntity);
  }
}
