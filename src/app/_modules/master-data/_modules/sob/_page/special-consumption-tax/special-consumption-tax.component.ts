import { Component, OnInit } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SpecialConsumptionTaxSearchEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.searchentity';
import { FormGroup } from '@angular/forms';
import { SpecialConsumptionTaxService } from './special-consumption-tax.service';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { Entities } from '../../../../../../_helpers/entity';
import { SpecialConsumptionTaxEntity } from '../../../../_backend/special-consumption-tax/special-consumption-tax.entity';
import { ToastrService } from 'ngx-toastr';
import { UomEntity } from '../../../../_backend/uom/uom.entity';
import { UomSearchEntity } from '../../../../_backend/uom/uom.searchentity';

@Component({
  selector: 'app-special-consumption-tax',
  templateUrl: './special-consumption-tax.component.html',
  styleUrls: ['./special-consumption-tax.component.scss'],
  providers: [
    SpecialConsumptionTaxService,
    GeneralService,
    ToastrService,
  ]
})
export class SpecialConsumptionTaxComponent implements OnInit {
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

  public specialConsumptionTaxList: SpecialConsumptionTaxEntity[] = [];

  public specialConsumptionTaxCount: number = 0;

  public specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchEntity = new SpecialConsumptionTaxSearchEntity();

  public specialConsumptionTaxForm: FormGroup;

  public uomList: UomEntity[] = [];

  public selectedUomList: UomEntity[] = [];

  public uomSearchEntity: UomSearchEntity = new UomSearchEntity();

  public setOfBookId: string = null;

  constructor(
    private specialConsumptionTaxService: SpecialConsumptionTaxService,
    private generalService: GeneralService,
    private toastrService: ToastrService,
  ) {
    const sobListSub = this.specialConsumptionTaxService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const specialConsumptionTaxSub = this.specialConsumptionTaxService.specialConsumptionTaxList.subscribe((list) => {
      this.specialConsumptionTaxList = list;
    });

    const specialConsumptionTaxCountSub = this.specialConsumptionTaxService.specialConsumptionTaxCount.subscribe((count) => {
      this.specialConsumptionTaxCount = count;
      this.pagination.totalItems = count;
    });

    const uomListSub = this.specialConsumptionTaxService.uomList.subscribe((entities: Entities) => {
      this.uomList = entities.exceptIds;
      this.selectedUomList = entities.ids;
    });

    const specialConsumptionTaxFormSub = this.specialConsumptionTaxService.specialConsumptionTaxForm.subscribe((form: FormGroup) => {
      this.specialConsumptionTaxForm = form;
      if (this.setOfBookId) {
        this.specialConsumptionTaxForm.controls.setOfBookId.setValue(this.setOfBookId);
      }
    });

    this.subs.add(sobListSub)
      .add(specialConsumptionTaxSub)
      .add(specialConsumptionTaxFormSub)
      .add(uomListSub)
      .add(specialConsumptionTaxCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  add() {
    if (this.setOfBookId) {
      this.specialConsumptionTaxService.add();
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

  changeSob(event) {
    const [setOfBookId] = event;
    this.specialConsumptionTaxSearchEntity.setOfBookId = setOfBookId;
    this.specialConsumptionTaxForm.controls.setOfBookId.setValue(setOfBookId);
    this.setOfBookId = setOfBookId;
    this.getList();
  }

  getList() {
    this.specialConsumptionTaxService.getList(this.specialConsumptionTaxSearchEntity);
  }

  getSobList() {
    this.specialConsumptionTaxService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.specialConsumptionTaxService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(event) {
  }

  getUomList() {
    this.specialConsumptionTaxService.getUnitOfMeasureList(this.uomSearchEntity);
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.specialConsumptionTaxService.cancel();
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.specialConsumptionTaxForm.invalid) {
      this.generalService.validateAllFormFields(this.specialConsumptionTaxForm);
    }
    if (this.specialConsumptionTaxForm.valid) {
      const data = this.specialConsumptionTaxForm.getRawValue();
      const entity = new SpecialConsumptionTaxEntity(data);
      this.specialConsumptionTaxService.save(entity, this.specialConsumptionTaxSearchEntity)
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
      this.specialConsumptionTaxSearchEntity.orderBy = event.sortField;
      this.specialConsumptionTaxSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  clearSearch(table: any) {
    this.specialConsumptionTaxSearchEntity = new SpecialConsumptionTaxSearchEntity();
    table.reset();
  }

  onClickDelete() {
    this.specialConsumptionTaxService.deactivate(this.specialConsumptionTaxForm.value, this.specialConsumptionTaxSearchEntity)
      .then(res => {
        this.isShowDialog = res;
      })
      .catch(err => {
        this.isShowDialog = err;
      });
  }
}
