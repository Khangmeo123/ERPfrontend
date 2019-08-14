import {Component, OnInit} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Subscription} from 'rxjs';
import {SobEntity} from '../../../../_backend/sob/sob.entity';
import {SobSearchEntity} from '../../../../_backend/sob/sob.searchentity';
import {FormControl, FormGroup} from '@angular/forms';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {Entities} from '../../../../../../_helpers/entity';
import {NaturalResourceTaxEntity} from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import {ToastrService} from 'ngx-toastr';
import {UomEntity} from '../../../../_backend/uom/uom.entity';
import {UomSearchEntity} from '../../../../_backend/uom/uom.searchentity';
import {NaturalResourceTaxService} from './natural-resource-tax.service';
import {NaturalResourceTaxSearchEntity} from '../../../../_backend/natural-resource-tax/natural-resource-tax.search-entity';
import {EnvironmentTaxSearchEntity} from '../../../../_backend/environment-tax/environment-tax.search-entity';

@Component({
  selector: 'app-natural-resource-tax',
  templateUrl: './natural-resource-tax.component.html',
  styleUrls: ['./natural-resource-tax.component.scss'],
  providers: [
    NaturalResourceTaxService,
    GeneralService,
    ToastrService,
  ],
})
export class NaturalResourceTaxComponent implements OnInit {
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

  public naturalResourceTaxList: NaturalResourceTaxEntity[] = [];

  public naturalResourceTaxCount: number = 0;

  public naturalResourceTaxSearchEntity: NaturalResourceTaxSearchEntity = new NaturalResourceTaxSearchEntity();

  public naturalResourceTaxForm: FormGroup;

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public uomFilterList: UomEntity[] = [];

  public selectedUomFilterList: UomEntity[] = [];

  public uomFilterSearchEntity: UomSearchEntity = new UomSearchEntity();

  public setOfBookId: string = null;

  public parentTaxList: NaturalResourceTaxEntity[] = [];

  public selectedParentTaxList: NaturalResourceTaxEntity[] = [];

  public parentTaxSearchEntity: NaturalResourceTaxSearchEntity = new NaturalResourceTaxSearchEntity();

  constructor(
    private naturalResourceTaxService: NaturalResourceTaxService,
    private generalService: GeneralService,
  ) {
    const parentTaxSub: Subscription = this.naturalResourceTaxService.parentTaxList.subscribe((parentTaxList) => {
      this.parentTaxList = parentTaxList.exceptIds;
      this.selectedParentTaxList = parentTaxList.ids;
    });

    const sobListSub = this.naturalResourceTaxService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const naturalResourceTaxSub = this.naturalResourceTaxService.naturalResourceTaxList.subscribe((list) => {
      this.naturalResourceTaxList = list;
    });

    const naturalResourceTaxCountSub = this.naturalResourceTaxService.naturalResourceTaxCount.subscribe((count) => {
      this.naturalResourceTaxCount = count;
      this.pagination.totalItems = count;
    });

    const uomListSub = this.naturalResourceTaxService.uomList.subscribe((entities: Entities) => {
      this.uomList = entities.exceptIds;
      this.selectedUomList = entities.ids;
    });

    const naturalResourceTaxFormSub = this.naturalResourceTaxService.naturalResourceTaxForm.subscribe((form: FormGroup) => {
      this.naturalResourceTaxForm = form;
      if (this.setOfBookId) {
        this.naturalResourceTaxForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    const uomFilterListSub = this.naturalResourceTaxService.uomFilterList.subscribe((entities: Entities) => {
      this.uomFilterList = entities.exceptIds;
      this.selectedUomFilterList = entities.ids;
    });

    this.subs.add(sobListSub)
      .add(naturalResourceTaxSub)
      .add(naturalResourceTaxFormSub)
      .add(uomListSub)
      .add(uomFilterListSub)
      .add(parentTaxSub)
      .add(naturalResourceTaxCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  get code() {
    return this.naturalResourceTaxForm.get('code') as FormControl;
  }

  get name() {
    return this.naturalResourceTaxForm.get('name') as FormControl;
  }

  get errors() {
    return this.naturalResourceTaxForm.get('errors') as FormGroup;
  }

  get unitOfMeasureId() {
    return this.naturalResourceTaxForm.get('unitOfMeasureId') as FormControl;
  }

  get parentId() {
    return this.naturalResourceTaxForm.get('parentId') as FormControl;
  }

  add() {
    this.naturalResourceTaxService.add();
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
      this.naturalResourceTaxSearchEntity.setOfBookId = setOfBookId;
      this.naturalResourceTaxForm.controls.setOfBookId.setValue(setOfBookId);
      this.setOfBookId = setOfBookId;
      this.getList();
    }
  }

  getList() {
    this.naturalResourceTaxService.getList(this.naturalResourceTaxSearchEntity);
  }

  getSobList() {
    this.naturalResourceTaxService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.naturalResourceTaxService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(pagination) {
    this.naturalResourceTaxSearchEntity.skip = pagination.skip;
    this.naturalResourceTaxSearchEntity.take = pagination.take;
    this.naturalResourceTaxService.getList(this.naturalResourceTaxSearchEntity);
  }

  getUomList() {
    this.uomSearchEntity = new UomSearchEntity();
    if (this.unitOfMeasureId.value) {
      this.uomSearchEntity.ids = [
        this.unitOfMeasureId.value,
      ];
    }
    this.naturalResourceTaxService.getUnitOfMeasureList(this.uomSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.naturalResourceTaxService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.naturalResourceTaxForm.invalid) {
      this.generalService.validateAllFormFields(this.naturalResourceTaxForm);
    }
    if (this.naturalResourceTaxForm.valid) {
      const data = this.naturalResourceTaxForm.getRawValue();
      const entity = new NaturalResourceTaxEntity(data);
      this.naturalResourceTaxService.save(entity, this.naturalResourceTaxSearchEntity)
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
      this.naturalResourceTaxSearchEntity.orderBy = event.sortField;
      this.naturalResourceTaxSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.naturalResourceTaxSearchEntity = new NaturalResourceTaxSearchEntity();
    this.naturalResourceTaxSearchEntity.setOfBookId = this.setOfBookId;
    this.naturalResourceTaxSearchEntity.unitOfMeasureId = null;
    this.selectedUomFilterList = [];
    table.reset();
  }

  onClickDelete() {
    this.naturalResourceTaxService.deactivate(this.naturalResourceTaxForm.value, this.naturalResourceTaxSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }

  onGetParentTaxList() {
    this.parentTaxSearchEntity = new NaturalResourceTaxSearchEntity();
    this.parentTaxSearchEntity.setOfBookId = this.setOfBookId;
    if (this.parentId.value) {
      this.parentTaxSearchEntity.ids = [
        this.parentId.value,
      ];
    }
    this.naturalResourceTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onSearchParentTaxList(event) {
    this.parentTaxSearchEntity.name.startsWith = event;
    this.naturalResourceTaxService.getParentTaxList(this.parentTaxSearchEntity);
  }

  onDisableChange(tax) {
    return (
      tax.disabled
        ? this.naturalResourceTaxService.enable(tax)
        : this.naturalResourceTaxService.disable(tax)
    )
      .then(() => {
        tax.disabled = !tax.disabled;
      });
  }

  onOpenUomFilter() {
    const ids = this.uomFilterSearchEntity.ids;
    this.uomFilterSearchEntity = new UomSearchEntity();
    this.uomFilterSearchEntity.ids = [...ids];
    this.naturalResourceTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }

  onSelectUomFilter(event) {
    this.uomFilterSearchEntity.ids = event;
    if (event.length) {
      this.naturalResourceTaxSearchEntity.unitOfMeasureId.equal = event[0];
    } else {
      this.naturalResourceTaxSearchEntity.unitOfMeasureId.equal = null;
    }
    this.getList();
  }

  onSearchUomFilter(event) {
    this.uomFilterSearchEntity.name.startsWith = event;
    this.naturalResourceTaxService.getUnitOfMeasureFilterList(this.uomFilterSearchEntity);
  }

  onSearchSetOfBook(event) {
    this.sobSearchEntity.name.startsWith = event;
    this.naturalResourceTaxService.getSobList(this.sobSearchEntity);
  }
}
