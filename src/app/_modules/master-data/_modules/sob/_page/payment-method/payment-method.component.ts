import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { PaymentMethodService } from './payment-method.service';
import { Subscription } from 'rxjs';
import { Entities } from '../../../../../../_helpers/entity';
import { PaymentMethodEntity } from '../../../../_backend/payment-method/payment-method.entity';
import { PaymentMethodSearchEntity } from '../../../../_backend/payment-method/payment-method.searchentity';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
  providers: [
    GeneralService,
    PaymentMethodService,
  ],
})
export class PaymentMethodComponent implements OnInit {

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

  public paymentMethodList: PaymentMethodEntity[] = [];
  public paymentMethodCount: number = 0;
  public paymentMethodSearchEntity: PaymentMethodSearchEntity = new PaymentMethodSearchEntity();

  public paymentMethodForm: FormGroup;

  constructor(
    private paymentMethodService: PaymentMethodService,
    private generalService: GeneralService
  ) {
    const sobListSub = this.paymentMethodService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const paymentMethodSub = this.paymentMethodService.paymentMethodList.subscribe((list) => {
      this.paymentMethodList = list;
    });

    const paymentMethodCountSub = this.paymentMethodService.paymentMethodCount.subscribe((count) => {
      this.paymentMethodCount = count;
    });

    const paymentMethodFormSub = this.paymentMethodService.paymentMethodForm.subscribe((form: FormGroup) => {
      this.paymentMethodForm = form;
    });

    this.subs.add(sobListSub)
      .add(paymentMethodSub)
      .add(paymentMethodFormSub)
      .add(paymentMethodCountSub);
  }

  get currentSob() {
    if (this.selectedSobList.length) {
      return this.selectedSobList[0];
    }
    return null;
  }

  ngOnInit() {
    if (this.currentSob) {
      this.getList();
    }
  }

  changeSob([setOfBookId]) {
    this.paymentMethodSearchEntity.setOfBookId = setOfBookId;
    this.paymentMethodForm.controls.setOfBookId.setValue(setOfBookId);
    this.getList();
  }

  getList() {
    this.paymentMethodService.getList(this.paymentMethodSearchEntity);
  }

  getSobList() {
    this.paymentMethodService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.paymentMethodService.edit(id);
    this.isShowDialog = true;
  }

  paginationOut(event) {
  }

  showDialog() {
    this.isShowDialog = true;
  }

  onClickCancel() {
    this.isShowDialog = false;
  }

  onClickSave() {
    if (this.paymentMethodForm.invalid) {
      this.generalService.validateAllFormFields(this.paymentMethodForm);
    }
    if (this.paymentMethodForm.valid) {
      const data = this.paymentMethodForm.getRawValue();
      const entity = new PaymentMethodEntity(data);
      this.paymentMethodService.save(entity, this.paymentMethodSearchEntity)
        .then((res) => {
          this.isShowDialog = res;
        })
        .catch((err) => {
          this.isShowDialog = err;
        });
    }
  }

  onClickDelete() {
  }
}
