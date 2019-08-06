import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Subscription} from 'rxjs';
import {SobEntity} from '../../../../_backend/sob/sob.entity';
import {SobSearchEntity} from '../../../../_backend/sob/sob.searchentity';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../../_helpers/entity';
import {ExportTaxEntity} from '../../../../_backend/export-tax/export-tax.entity';
import {ToastrService} from 'ngx-toastr';
import {UomEntity} from '../../../../_backend/uom/uom.entity';
import {UomSearchEntity} from '../../../../_backend/uom/uom.searchentity';
import {ExportTaxService} from './export-tax.service';
import {ExportTaxSearchEntity} from '../../../../_backend/export-tax/export-tax.search-entity';

@Component({
  selector: 'app-export-tax',
  templateUrl: './export-tax.component.html',
  styleUrls: ['./export-tax.component.scss'],
  providers: [
    ExportTaxService,
    GeneralService,
    ToastrService,
  ],
})
export class ExportTaxComponent implements OnInit {
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

  public exportTaxList: ExportTaxEntity[] = [];

  public exportTaxCount: number = 0;

  public exportTaxSearchEntity: ExportTaxSearchEntity = new ExportTaxSearchEntity();

  public exportTaxForm: FormGroup;

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public uomFilterList: UomEntity[] = [];

  public selectedUomFilterList: UomEntity[] = [];

  public uomFilterSearchEntity: UomSearchEntity = new UomSearchEntity();

  public setOfBookId: string = null;

  public parentTaxList: ExportTaxEntity[] = [];

  public selectedParentTaxList: ExportTaxEntity[] = [];

  public parentTaxSearchEntity: ExportTaxSearchEntity = new ExportTaxSearchEntity();

  constructor(
    private exportTaxService: ExportTaxService,
    private generalService: GeneralService,
  ) {
    const parentTaxSub: Subscription = this.exportTaxService.parentTaxList.subscribe((parentTaxList) => {
      this.parentTaxList = parentTaxList.exceptIds;
      this.selectedParentTaxList = parentTaxList.ids;
    });

    const sobListSub = this.exportTaxService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const exportTaxSub = this.exportTaxService.exportTaxList.subscribe((list) => {
      this.exportTaxList = list;
    });

    const exportTaxCountSub = this.exportTaxService.exportTaxCount.subscribe((count) => {
      this.exportTaxCount = count;
      this.pagination.totalItems = count;
    });

    const uomListSub = this.exportTaxService.uomList.subscribe((entities: Entities) => {
      this.uomList = entities.exceptIds;
      this.selectedUomList = entities.ids;
    });

    const exportTaxFormSub = this.exportTaxService.exportTaxForm.subscribe((form: FormGroup) => {
      this.exportTaxForm = form;
      if (this.setOfBookId) {
        this.exportTaxForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    const uomFilterListSub = this.exportTaxService.uomFilterList.subscribe((entities: Entities) => {
      this.uomFilterList = entities.exceptIds;
      this.selectedUomFilterList = entities.ids;
    });

    this.subs.add(sobListSub)
      .add(exportTaxSub)
      .add(exportTaxFormSub)
      .add(uomListSub)
      .add(uomFilterListSub)
      .add(parentTaxSub)
      .add(exportTaxCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  get code() {
    return this.exportTaxForm.get('code') as FormControl;
  }

  get name() {
    return this.exportTaxForm.get('name') as FormControl;
  }

  get errors() {
    return this.exportTaxForm.get('errors') as FormGroup;
  }

  get unitOfMeasureId() {
    return this.exportTaxForm.get('unitOfMeasureId') as FormControl;
  }

  get parentId() {
    return this.exportTaxForm.get('parentId') as FormControl;
  }

  add() {
    this.exportTaxService.add();
    this.showDialog();
  }

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  changeSob(event) {
    const [setOfBookId] = event;
    this.exportTaxSearchEntity.setOfBookId = setOfBookId;
    this.exportTaxForm.controls.setOfBookId.setValue(setOfBookId);
    this.setOfBookId = setOfBookId;
    this.getList();
  }

  getList() {
    this.exportTaxService.getList(this.exportTaxSearchEntity);
  }

  getSobList() {
    this.exportTaxService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.exportTaxService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination) {
    this.exportTaxSearchEntity.skip = pagination.skip;
    this.exportTaxSearchEntity.take = pagination.take;
    this.exportTaxService.getList(this.exportTaxSearchEntity);
  }

  getUomList() {
    this.uomSearchEntity = new UomSearchEntity();
    if (this.unitOfMeasureId.value) {
      this.uomSearchEntity.ids = [
        this.unitOfMeasureId.value,
      ];
    }
    this.exportTaxService.getUnitOfMeasureList(this.uomSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.exportTaxService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.exportTaxForm.invalid) {
      this.generalService.validateAllFormFields(this.exportTaxForm);
    }
    if (this.exportTaxForm.valid) {
      const data = this.exportTaxForm.getRawValue();
      const entity = new ExportTaxEntity(data);
      this.exportTaxService.save(entity, this.exportTaxSearchEntity)
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
      this.exportTaxSearchEntity.orderBy = event.sortField;
      this.exportTaxSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.exportTaxSearchEntity = new ExportTaxSearchEntity();
    this.exportTaxSearchEntity.setOfBookId = this.setOfBookId;
    table.reset();
  }

  onClickDelete() {
    this.exportTaxService.deactivate(this.exportTaxForm.value, this.exportTaxSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }

  onGetParentTaxList() {
    this.parentTaxSearchEntity = new ExportTaxSearchEntity();
    this.parentTaxSearchEntity.setOfBookId = this.setOfBookId;
    if (this.parentId.value) {
      this.parentTaxSearchEntity.ids = [
        this.parentId.value,
      ];
    }
    this.exportTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onSearchParentTaxList(event) {
    this.parentTaxSearchEntity.name.startsWith = event;
    this.exportTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onDisableChange(tax) {
    return (
      tax.disabled
        ? this.exportTaxService.enable(tax)
        : this.exportTaxService.disable(tax)
    )
      .then(() => {
        tax.disabled = !tax.disabled;
      });
  }

  onOpenUomFilter() {
    const ids = this.uomFilterSearchEntity.ids;
    this.uomFilterSearchEntity = new UomSearchEntity();
    this.uomFilterSearchEntity.ids = [...ids];
    this.exportTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }

  onSelectUomFilter(event) {
    this.uomFilterSearchEntity.ids = event;
    if (event.length) {
      this.exportTaxSearchEntity.unitOfMeasureId.equal = event[0];
    } else {
      this.exportTaxSearchEntity.unitOfMeasureId.equal = null;
    }
    this.getList();
  }

  onSearchUomFilter(event) {
    this.uomFilterSearchEntity.name.startsWith = event;
    this.exportTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }
}
