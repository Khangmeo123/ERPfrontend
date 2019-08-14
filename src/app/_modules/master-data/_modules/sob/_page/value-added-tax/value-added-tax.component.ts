import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Subscription} from 'rxjs';
import {SobEntity} from '../../../../_backend/sob/sob.entity';
import {SobSearchEntity} from '../../../../_backend/sob/sob.searchentity';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../../_helpers/entity';
import {ValueAddedTaxEntity} from '../../../../_backend/value-added-tax/value-added-tax.entity';
import {ToastrService} from 'ngx-toastr';
import {UomEntity} from '../../../../_backend/uom/uom.entity';
import {UomSearchEntity} from '../../../../_backend/uom/uom.searchentity';
import {ValueAddedTaxService} from './value-added-tax.service';
import {ValueAddedTaxSearchEntity} from '../../../../_backend/value-added-tax/value-added-tax.search-entity';
import {SpecialConsumptionTaxSearchEntity} from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';

@Component({
  selector: 'app-value-added-tax',
  templateUrl: './value-added-tax.component.html',
  styleUrls: ['./value-added-tax.component.scss'],
  providers: [
    ValueAddedTaxService,
    GeneralService,
    ToastrService,
  ],
})
export class ValueAddedTaxComponent implements OnInit {
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

  public valueAddedTaxList: ValueAddedTaxEntity[] = [];

  public valueAddedTaxCount: number = 0;

  public valueAddedTaxSearchEntity: ValueAddedTaxSearchEntity = new ValueAddedTaxSearchEntity();

  public valueAddedTaxForm: FormGroup;

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public uomFilterList: UomEntity[] = [];

  public selectedUomFilterList: UomEntity[] = [];

  public uomFilterSearchEntity: UomSearchEntity = new UomSearchEntity();

  public setOfBookId: string = null;

  public parentTaxList: ValueAddedTaxEntity[] = [];

  public selectedParentTaxList: ValueAddedTaxEntity[] = [];

  public parentTaxSearchEntity: ValueAddedTaxSearchEntity = new ValueAddedTaxSearchEntity();

  constructor(
    private valueAddedTaxService: ValueAddedTaxService,
    private generalService: GeneralService,
  ) {
    const parentTaxSub: Subscription = this.valueAddedTaxService.parentTaxList.subscribe((parentTaxList) => {
      this.parentTaxList = parentTaxList.exceptIds;
      this.selectedParentTaxList = parentTaxList.ids;
    });

    const sobListSub = this.valueAddedTaxService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const valueAddedTaxSub = this.valueAddedTaxService.valueAddedTaxList.subscribe((list) => {
      this.valueAddedTaxList = list;
    });

    const valueAddedTaxCountSub = this.valueAddedTaxService.valueAddedTaxCount.subscribe((count) => {
      this.valueAddedTaxCount = count;
      this.pagination.totalItems = count;
    });

    const uomListSub = this.valueAddedTaxService.uomList.subscribe((entities: Entities) => {
      this.uomList = entities.exceptIds;
      this.selectedUomList = entities.ids;
    });

    const valueAddedTaxFormSub = this.valueAddedTaxService.valueAddedTaxForm.subscribe((form: FormGroup) => {
      this.valueAddedTaxForm = form;
      if (this.setOfBookId) {
        this.valueAddedTaxForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    const uomFilterListSub = this.valueAddedTaxService.uomFilterList.subscribe((entities: Entities) => {
      this.uomFilterList = entities.exceptIds;
      this.selectedUomFilterList = entities.ids;
    });

    this.subs.add(sobListSub)
      .add(valueAddedTaxSub)
      .add(valueAddedTaxFormSub)
      .add(uomListSub)
      .add(uomFilterListSub)
      .add(parentTaxSub)
      .add(valueAddedTaxCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  get code() {
    return this.valueAddedTaxForm.get('code') as FormControl;
  }

  get name() {
    return this.valueAddedTaxForm.get('name') as FormControl;
  }

  get errors() {
    return this.valueAddedTaxForm.get('errors') as FormGroup;
  }

  get unitOfMeasureId() {
    return this.valueAddedTaxForm.get('unitOfMeasureId') as FormControl;
  }

  get parentId() {
    return this.valueAddedTaxForm.get('parentId') as FormControl;
  }

  add() {
    this.valueAddedTaxService.add();
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
      this.valueAddedTaxSearchEntity.setOfBookId = setOfBookId;
      this.valueAddedTaxForm.controls.setOfBookId.setValue(setOfBookId);
      this.setOfBookId = setOfBookId;
      this.getList();
    }
  }

  getList() {
    this.valueAddedTaxService.getList(this.valueAddedTaxSearchEntity);
  }

  getSobList() {
    this.valueAddedTaxService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.valueAddedTaxService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination) {
    this.valueAddedTaxSearchEntity.skip = pagination.skip;
    this.valueAddedTaxSearchEntity.take = pagination.take;
    this.valueAddedTaxService.getList(this.valueAddedTaxSearchEntity);
  }

  getUomList() {
    this.uomSearchEntity = new UomSearchEntity();
    if (this.unitOfMeasureId.value) {
      this.uomSearchEntity.ids = [
        this.unitOfMeasureId.value,
      ];
    }
    this.valueAddedTaxService.getUnitOfMeasureList(this.uomSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.valueAddedTaxService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.valueAddedTaxForm.invalid) {
      this.generalService.validateAllFormFields(this.valueAddedTaxForm);
    }
    if (this.valueAddedTaxForm.valid) {
      const data = this.valueAddedTaxForm.getRawValue();
      const entity = new ValueAddedTaxEntity(data);
      this.valueAddedTaxService.save(entity, this.valueAddedTaxSearchEntity)
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
      this.valueAddedTaxSearchEntity.orderBy = event.sortField;
      this.valueAddedTaxSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.valueAddedTaxSearchEntity = new ValueAddedTaxSearchEntity();
    this.valueAddedTaxSearchEntity.setOfBookId = this.setOfBookId;
    this.valueAddedTaxSearchEntity.unitOfMeasureId = null;
    this.selectedUomFilterList = [];
    table.reset();
  }

  onClickDelete() {
    this.valueAddedTaxService.deactivate(this.valueAddedTaxForm.value, this.valueAddedTaxSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }

  onGetParentTaxList() {
    this.parentTaxSearchEntity = new ValueAddedTaxSearchEntity();
    this.parentTaxSearchEntity.setOfBookId = this.setOfBookId;
    if (this.parentId.value) {
      this.parentTaxSearchEntity.ids = [
        this.parentId.value,
      ];
    }
    this.valueAddedTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onSearchParentTaxList(event) {
    this.parentTaxSearchEntity.name.startsWith = event;
    this.valueAddedTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onDisableChange(tax) {
    return (
      tax.disabled
        ? this.valueAddedTaxService.enable(tax)
        : this.valueAddedTaxService.disable(tax)
    )
      .then(() => {
        tax.disabled = !tax.disabled;
      });
  }

  onOpenUomFilter() {
    const ids = this.uomFilterSearchEntity.ids;
    this.uomFilterSearchEntity = new UomSearchEntity();
    this.uomFilterSearchEntity.ids = [...ids];
    this.valueAddedTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }

  onSelectUomFilter(event) {
    this.uomFilterSearchEntity.ids = event;
    if (event.length) {
      this.valueAddedTaxSearchEntity.unitOfMeasureId.equal = event[0];
    } else {
      this.valueAddedTaxSearchEntity.unitOfMeasureId.equal = null;
    }
    this.getList();
  }

  onSearchUomFilter(event) {
    this.uomFilterSearchEntity.name.startsWith = event;
    this.valueAddedTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }

  onSearchSetOfBook(event) {
    this.sobSearchEntity.name.startsWith = event;
    this.valueAddedTaxService.getSobList(this.sobSearchEntity);
  }
}
