import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Subscription} from 'rxjs';
import {SobEntity} from '../../../../_backend/sob/sob.entity';
import {SobSearchEntity} from '../../../../_backend/sob/sob.searchentity';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../../_helpers/entity';
import {EnvironmentTaxEntity} from '../../../../_backend/environment-tax/environment-tax.entity';
import {ToastrService} from 'ngx-toastr';
import {UomEntity} from '../../../../_backend/uom/uom.entity';
import {UomSearchEntity} from '../../../../_backend/uom/uom.searchentity';
import {EnvironmentTaxService} from './environment-tax.service';
import {EnvironmentTaxSearchEntity} from '../../../../_backend/environment-tax/environment-tax.search-entity';

@Component({
  selector: 'app-environment-tax',
  templateUrl: './environment-tax.component.html',
  styleUrls: ['./environment-tax.component.scss'],
  providers: [
    EnvironmentTaxService,
    GeneralService,
    ToastrService,
  ],
})
export class EnvironmentTaxComponent implements OnInit {
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

  public environmentTaxList: EnvironmentTaxEntity[] = [];

  public environmentTaxCount: number = 0;

  public environmentTaxSearchEntity: EnvironmentTaxSearchEntity = new EnvironmentTaxSearchEntity();

  public environmentTaxForm: FormGroup;

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public uomFilterList: UomEntity[] = [];

  public selectedUomFilterList: UomEntity[] = [];

  public uomFilterSearchEntity: UomSearchEntity = new UomSearchEntity();

  public setOfBookId: string = null;

  public parentTaxList: EnvironmentTaxEntity[] = [];

  public selectedParentTaxList: EnvironmentTaxEntity[] = [];

  public parentTaxSearchEntity: EnvironmentTaxSearchEntity = new EnvironmentTaxSearchEntity();

  constructor(
    private environmentTaxService: EnvironmentTaxService,
    private generalService: GeneralService,
  ) {
    const parentTaxSub: Subscription = this.environmentTaxService.parentTaxList.subscribe((parentTaxList) => {
      this.parentTaxList = parentTaxList.exceptIds;
      this.selectedParentTaxList = parentTaxList.ids;
    });

    const sobListSub = this.environmentTaxService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const environmentTaxSub = this.environmentTaxService.environmentTaxList.subscribe((list) => {
      this.environmentTaxList = list;
    });

    const environmentTaxCountSub = this.environmentTaxService.environmentTaxCount.subscribe((count) => {
      this.environmentTaxCount = count;
      this.pagination.totalItems = count;
    });

    const uomListSub = this.environmentTaxService.uomList.subscribe((entities: Entities) => {
      this.uomList = entities.exceptIds;
      this.selectedUomList = entities.ids;
    });

    const environmentTaxFormSub = this.environmentTaxService.environmentTaxForm.subscribe((form: FormGroup) => {
      this.environmentTaxForm = form;
      if (this.setOfBookId) {
        this.environmentTaxForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    const uomFilterListSub = this.environmentTaxService.uomFilterList.subscribe((entities: Entities) => {
      this.uomFilterList = entities.exceptIds;
      this.selectedUomFilterList = entities.ids;
    });

    this.subs.add(sobListSub)
      .add(environmentTaxSub)
      .add(environmentTaxFormSub)
      .add(uomListSub)
      .add(uomFilterListSub)
      .add(parentTaxSub)
      .add(environmentTaxCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  get code() {
    return this.environmentTaxForm.get('code') as FormControl;
  }

  get name() {
    return this.environmentTaxForm.get('name') as FormControl;
  }

  get errors() {
    return this.environmentTaxForm.get('errors') as FormGroup;
  }

  get unitOfMeasureId() {
    return this.environmentTaxForm.get('unitOfMeasureId') as FormControl;
  }

  get parentId() {
    return this.environmentTaxForm.get('parentId') as FormControl;
  }

  add() {
    this.environmentTaxService.add();
    this.showDialog();
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
      this.environmentTaxSearchEntity.setOfBookId = setOfBookId;
      this.environmentTaxForm.controls.setOfBookId.setValue(setOfBookId);
      this.setOfBookId = setOfBookId;
      this.getList();
    }
  }

  onSearchSetOfBook(event) {
    this.sobSearchEntity.name.startsWith = event;
    this.environmentTaxService.getSobList(this.sobSearchEntity);
  }

  getList() {
    this.environmentTaxService.getList(this.environmentTaxSearchEntity);
  }

  getSobList() {
    this.environmentTaxService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.environmentTaxService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination) {
    this.environmentTaxSearchEntity.skip = pagination.skip;
    this.environmentTaxSearchEntity.take = pagination.take;
    this.environmentTaxService.getList(this.environmentTaxSearchEntity);
  }

  getUomList() {
    this.uomSearchEntity = new UomSearchEntity();
    if (this.unitOfMeasureId.value) {
      this.uomSearchEntity.ids = [
        this.unitOfMeasureId.value,
      ];
    }
    this.environmentTaxService.getUnitOfMeasureList(this.uomSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.environmentTaxService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.environmentTaxForm.invalid) {
      this.generalService.validateAllFormFields(this.environmentTaxForm);
    }
    if (this.environmentTaxForm.valid) {
      const data = this.environmentTaxForm.getRawValue();
      const entity = new EnvironmentTaxEntity(data);
      this.environmentTaxService.save(entity, this.environmentTaxSearchEntity)
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
      this.environmentTaxSearchEntity.orderBy = event.sortField;
      this.environmentTaxSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.environmentTaxSearchEntity = new EnvironmentTaxSearchEntity();
    this.environmentTaxSearchEntity.setOfBookId = this.setOfBookId;
    table.reset();
  }

  onClickDelete() {
    this.environmentTaxService.deactivate(this.environmentTaxForm.value, this.environmentTaxSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }

  onGetParentTaxList() {
    this.parentTaxSearchEntity = new EnvironmentTaxSearchEntity();
    this.parentTaxSearchEntity.setOfBookId = this.setOfBookId;
    if (this.parentId.value) {
      this.parentTaxSearchEntity.ids = [
        this.parentId.value,
      ];
    }
    this.environmentTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onSearchParentTaxList(event) {
    this.parentTaxSearchEntity.name.startsWith = event;
    this.environmentTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onDisableChange(tax) {
    return (
      tax.disabled
        ? this.environmentTaxService.enable(tax)
        : this.environmentTaxService.disable(tax)
    )
      .then(() => {
        tax.disabled = !tax.disabled;
      });
  }

  onOpenUomFilter() {
    const ids = this.uomFilterSearchEntity.ids;
    this.uomFilterSearchEntity = new UomSearchEntity();
    this.uomFilterSearchEntity.ids = [...ids];
    this.environmentTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }

  onSelectUomFilter(event) {
    this.uomFilterSearchEntity.ids = event;
    if (event.length) {
      this.environmentTaxSearchEntity.unitOfMeasureId.equal = event[0];
    } else {
      this.environmentTaxSearchEntity.unitOfMeasureId.equal = null;
    }
    this.getList();
  }

  onSearchUomFilter(event) {
    this.uomFilterSearchEntity.name.startsWith = event;
    this.environmentTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }
}
