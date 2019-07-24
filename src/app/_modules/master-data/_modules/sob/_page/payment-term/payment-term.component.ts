import { Component, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { FormGroup } from '@angular/forms';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { PaymentTermEntity } from '../../../../_backend/payment-term/payment-term.entity';
import { PaymentTermSearchEntity } from '../../../../_backend/payment-term/payment-term.searchentity';
import { PaymentTermService } from './payment-term.service';
import { Entities } from '../../../../../../_helpers/entity';

@Component({
  selector: 'app-payment-term',
  templateUrl: './payment-term.component.html',
  styleUrls: ['./payment-term.component.scss'],
  providers: [
    GeneralService,
    PaymentTermService,
  ]
})
export class PaymentTermComponent implements OnInit {
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

  public paymentTermList: PaymentTermEntity[] = [];
  public paymentTermCount: number = 0;
  public paymentTermSearchEntity: PaymentTermSearchEntity = new PaymentTermSearchEntity();

  public paymentTermForm: FormGroup;

  constructor(
    private paymentTermService: PaymentTermService,
    private generalService: GeneralService
  ) {
    const sobListSub = this.paymentTermService.sobList.subscribe((list: Entities) => {
      this.sobList = list.exceptIds;
      this.selectedSobList = list.ids;
    });

    const paymentTermSub = this.paymentTermService.paymentTermList.subscribe((list) => {
      this.paymentTermList = list;
    });

    const paymentTermCountSub = this.paymentTermService.paymentTermCount.subscribe((count) => {
      this.paymentTermCount = count;
    });

    const paymentTermFormSub = this.paymentTermService.paymentTermForm.subscribe((form: FormGroup) => {
      this.paymentTermForm = form;
    });

    this.subs.add(sobListSub)
      .add(paymentTermSub)
      .add(paymentTermFormSub)
      .add(paymentTermCountSub);
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
    this.paymentTermSearchEntity.setOfBookId = setOfBookId;
    this.paymentTermForm.controls.setOfBookId.setValue(setOfBookId);
    this.getList();
  }

  getList() {
    this.paymentTermService.getList(this.paymentTermSearchEntity);
  }

  getSobList() {
    this.paymentTermService.getSobList(this.sobSearchEntity);
  }

  onClickSaveBookMark(event) {
    this.isSaveBookMark = !this.isSaveBookMark;
  }

  edit(id: string) {
    this.paymentTermService.edit(id);
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
    if (this.paymentTermForm.invalid) {
      this.generalService.validateAllFormFields(this.paymentTermForm);
    }
    if (this.paymentTermForm.valid) {
      const data = this.paymentTermForm.getRawValue();
      const entity = new PaymentTermEntity(data);
      this.paymentTermService.save(entity, this.paymentTermSearchEntity)
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
