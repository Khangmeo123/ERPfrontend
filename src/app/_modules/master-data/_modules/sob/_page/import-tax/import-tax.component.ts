import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Subscription} from 'rxjs';
import {SobEntity} from '../../../../_backend/sob/sob.entity';
import {SobSearchEntity} from '../../../../_backend/sob/sob.searchentity';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../../_helpers/entity';
import {ImportTaxEntity} from '../../../../_backend/import-tax/import-tax.entity';
import {ToastrService} from 'ngx-toastr';
import {UomEntity} from '../../../../_backend/uom/uom.entity';
import {UomSearchEntity} from '../../../../_backend/uom/uom.searchentity';
import {ImportTaxService} from './import-tax.service';
import {ImportTaxSearchEntity} from '../../../../_backend/import-tax/import-tax.search-entity';
import {SpecialConsumptionTaxSearchEntity} from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';

@Component({
  selector: 'app-import-tax',
  templateUrl: './import-tax.component.html',
  styleUrls: ['./import-tax.component.scss'],
  providers: [
    ImportTaxService,
    GeneralService,
    ToastrService,
  ],
})
export class ImportTaxComponent implements OnInit {
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

  public importTaxList: ImportTaxEntity[] = [];

  public importTaxCount: number = 0;

  public importTaxSearchEntity: ImportTaxSearchEntity = new ImportTaxSearchEntity();

  public importTaxForm: FormGroup;

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public uomFilterList: UomEntity[] = [];

  public selectedUomFilterList: UomEntity[] = [];

  public uomFilterSearchEntity: UomSearchEntity = new UomSearchEntity();

  public setOfBookId: string = null;

  public parentTaxList: ImportTaxEntity[] = [];

  public selectedParentTaxList: ImportTaxEntity[] = [];

  public parentTaxSearchEntity: ImportTaxSearchEntity = new ImportTaxSearchEntity();

  constructor(
    private importTaxService: ImportTaxService,
    private generalService: GeneralService,
  ) {
    const parentTaxSub: Subscription = this.importTaxService.parentTaxList.subscribe((parentTaxList) => {
      this.parentTaxList = parentTaxList.exceptIds;
      this.selectedParentTaxList = parentTaxList.ids;
    });

    const sobListSub = this.importTaxService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const importTaxSub = this.importTaxService.importTaxList.subscribe((list) => {
      this.importTaxList = list;
    });

    const importTaxCountSub = this.importTaxService.importTaxCount.subscribe((count) => {
      this.importTaxCount = count;
      this.pagination.totalItems = count;
    });

    const uomListSub = this.importTaxService.uomList.subscribe((entities: Entities) => {
      this.uomList = entities.exceptIds;
      this.selectedUomList = entities.ids;
    });

    const importTaxFormSub = this.importTaxService.importTaxForm.subscribe((form: FormGroup) => {
      this.importTaxForm = form;
      if (this.setOfBookId) {
        this.importTaxForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    const uomFilterListSub = this.importTaxService.uomFilterList.subscribe((entities: Entities) => {
      this.uomFilterList = entities.exceptIds;
      this.selectedUomFilterList = entities.ids;
    });

    this.subs.add(sobListSub)
      .add(importTaxSub)
      .add(importTaxFormSub)
      .add(uomListSub)
      .add(uomFilterListSub)
      .add(parentTaxSub)
      .add(importTaxCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  get code() {
    return this.importTaxForm.get('code') as FormControl;
  }

  get name() {
    return this.importTaxForm.get('name') as FormControl;
  }

  get errors() {
    return this.importTaxForm.get('errors') as FormGroup;
  }

  get unitOfMeasureId() {
    return this.importTaxForm.get('unitOfMeasureId') as FormControl;
  }

  get parentId() {
    return this.importTaxForm.get('parentId') as FormControl;
  }

  add() {
    this.importTaxService.add();
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
      this.importTaxSearchEntity.setOfBookId = setOfBookId;
      this.importTaxForm.controls.setOfBookId.setValue(setOfBookId);
      this.setOfBookId = setOfBookId;
      this.getList();
    }
  }

  onSearchSetOfBook(event) {
    this.sobSearchEntity.name.startsWith = event;
    this.importTaxService.getSobList(this.sobSearchEntity);
  }

  getList() {
    this.importTaxService.getList(this.importTaxSearchEntity);
  }

  getSobList() {
    this.importTaxService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.importTaxService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination) {
    this.importTaxSearchEntity.skip = pagination.skip;
    this.importTaxSearchEntity.take = pagination.take;
    this.importTaxService.getList(this.importTaxSearchEntity);
  }

  getUomList() {
    this.uomSearchEntity = new UomSearchEntity();
    if (this.unitOfMeasureId.value) {
      this.uomSearchEntity.ids = [
        this.unitOfMeasureId.value,
      ];
    }
    this.importTaxService.getUnitOfMeasureList(this.uomSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.importTaxService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.importTaxForm.invalid) {
      this.generalService.validateAllFormFields(this.importTaxForm);
    }
    if (this.importTaxForm.valid) {
      const data = this.importTaxForm.getRawValue();
      const entity = new ImportTaxEntity(data);
      this.importTaxService.save(entity, this.importTaxSearchEntity)
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
      this.importTaxSearchEntity.orderBy = event.sortField;
      this.importTaxSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.importTaxSearchEntity = new ImportTaxSearchEntity();
    this.importTaxSearchEntity.setOfBookId = this.setOfBookId;
    this.importTaxSearchEntity.unitOfMeasureId = null;
    this.selectedUomFilterList = [];
    table.reset();
  }

  onClickDelete() {
    this.importTaxService.deactivate(this.importTaxForm.value, this.importTaxSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }

  onGetParentTaxList() {
    this.parentTaxSearchEntity = new ImportTaxSearchEntity();
    this.parentTaxSearchEntity.setOfBookId = this.setOfBookId;
    if (this.parentId.value) {
      this.parentTaxSearchEntity.ids = [
        this.parentId.value,
      ];
    }
    this.importTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onSearchParentTaxList(event) {
    this.parentTaxSearchEntity.name.startsWith = event;
    this.importTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onDisableChange(tax) {
    return (
      tax.disabled
        ? this.importTaxService.enable(tax)
        : this.importTaxService.disable(tax)
    )
      .then(() => {
        tax.disabled = !tax.disabled;
      });
  }

  onOpenUomFilter() {
    const ids = this.uomFilterSearchEntity.ids;
    this.uomFilterSearchEntity = new UomSearchEntity();
    this.uomFilterSearchEntity.ids = [...ids];
    this.importTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }

  onSelectUomFilter(event) {
    this.uomFilterSearchEntity.ids = event;
    if (event.length) {
      this.importTaxSearchEntity.unitOfMeasureId.equal = event[0];
    } else {
      this.importTaxSearchEntity.unitOfMeasureId.equal = null;
    }
    this.getList();
  }

  onSearchUomFilter(event) {
    this.uomFilterSearchEntity.name.startsWith = event;
    this.importTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }
}
