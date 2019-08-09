import {Component, OnInit} from '@angular/core';
import {PaginationModel} from 'src/app/_shared/modules/pagination/pagination.model';
import {Subscription} from 'rxjs';
import {SobEntity} from '../../../../_backend/sob/sob.entity';
import {SobSearchEntity} from '../../../../_backend/sob/sob.searchentity';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../../_helpers/entity';
import {ToastrService} from 'ngx-toastr';
import {CostCenterService} from './cost-center.service';
import {CostCenterEntity} from '../../../../_backend/cost-center/cost-center.entity';
import {CostCenterSearchEntity} from '../../../../_backend/cost-center/cost-center.searchentity';
import {CoaEntity} from '../../../../_backend/coa/coa.entity';
import {CoaSearchEntity} from '../../../../_backend/coa/coa.searchentity';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss'],
  providers: [
    GeneralService,
    ToastrService,
    CostCenterService,
  ],
})
export class CostCenterComponent implements OnInit {
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

  public costCenterList: CostCenterEntity[] = [];

  public costCenterCount: number = 0;

  public costCenterSearchEntity: CostCenterSearchEntity = new CostCenterSearchEntity();

  public costCenterForm: FormGroup;

  public setOfBookId: string = null;

  public coaList: CoaEntity[] = [];

  public coaSearchEntity: CoaSearchEntity = new CoaSearchEntity();

  public selectedCoaList: CoaEntity[] = [];

  constructor(
    private costCenterService: CostCenterService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
  ) {
    const sobListSub = this.costCenterService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const costCenterSub = this.costCenterService.costCenterList.subscribe((list) => {
      this.costCenterList = list;
    });

    const costCenterCountSub = this.costCenterService.costCenterCount.subscribe((count) => {
      this.costCenterCount = count;
      this.pagination.totalItems = count;
    });

    const costCenterFormSub = this.costCenterService.costCenterForm.subscribe((form: FormGroup) => {
      this.costCenterForm = form;
      if (this.setOfBookId) {
        this.costCenterForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    const coaListSub = this.costCenterService.coaList.subscribe((list: Entities) => {
      this.coaList = list.exceptIds;
      this.selectedCoaList = list.ids;
    });

    this.subs.add(sobListSub)
      .add(costCenterSub)
      .add(coaListSub)
      .add(costCenterFormSub)
      .add(costCenterCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  get validFrom() {
    return this.costCenterForm.get('validFrom') as FormControl;
  }

  get validTo() {
    return this.costCenterForm.get('validTo') as FormControl;
  }

  getCoaList(coaSearchEntity: CoaSearchEntity) {
    this.costCenterService.getCoaList(coaSearchEntity);
  }

  add() {
    this.costCenterService.add();
    this.showDialog();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.costCenterSearchEntity.orderBy = event.sortField;
      this.costCenterSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  changeSob(event) {
    this.sobSearchEntity.ids = event;
    if (event && event.length) {
      const [setOfBookId] = event;
      this.costCenterSearchEntity.setOfBookId = setOfBookId;
      this.costCenterForm.controls.setOfBookId.setValue(setOfBookId);
      this.setOfBookId = setOfBookId;
      this.getList();
    }
  }

  onSearchSetOfBook(event) {
    this.sobSearchEntity.name.startsWith = event;
    this.costCenterService.getSobList(this.sobSearchEntity);
  }

  getList() {
    this.costCenterService.getList(this.costCenterSearchEntity);
  }

  getSobList() {
    this.costCenterService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.costCenterService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination) {
    this.costCenterSearchEntity.skip = pagination.skip;
    this.costCenterSearchEntity.take = pagination.take;
    this.costCenterService.getList(this.costCenterSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.costCenterService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.costCenterForm.invalid) {
      this.generalService.validateAllFormFields(this.costCenterForm);
    }
    if (this.costCenterForm.valid) {
      this.costCenterService.save(this.costCenterForm.value, this.costCenterSearchEntity)
        .then((res) => {
          this.isShowDialog = res;
        })
        .catch((err) => {
          this.isShowDialog = err;
        });
    }
  }

  get chartOfAccountId() {
    return this.costCenterForm.get('chartOfAccountId') as FormControl;
  }

  clearSearch(table: any) {
    this.costCenterSearchEntity = new CostCenterSearchEntity();
    table.reset();
  }

  onClickDelete() {
    this.costCenterService.deactivate(this.costCenterForm.value, this.costCenterSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }

  onSelectChartOfAccount(event) {
    if (event) {
      if (event.length) {
        this.chartOfAccountId.setValue(event[0]);
      } else {
        this.chartOfAccountId.setValue(null);
      }
    }
  }

  onSearchChartOfAccount(event) {
    this.coaSearchEntity.code.startsWith = event;
    this.getCoaList(this.coaSearchEntity);
  }

  onOpenCoaList() {
    const ids = this.coaSearchEntity.ids;
    this.coaSearchEntity = new CoaSearchEntity();
    this.coaSearchEntity.ids = ids;
    this.coaSearchEntity.setOfBookId = this.setOfBookId;
    this.getCoaList(this.coaSearchEntity);
  }

  onFilterChartOfAccount(event) {
    this.coaSearchEntity.ids = event;
    if (event) {
      if (event.length) {
        this.costCenterSearchEntity.chartOfAccountId = event[0];
      } else {
        this.costCenterSearchEntity.chartOfAccountId = null;
      }
    }
    this.getList();
  }
}
