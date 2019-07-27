import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailService } from './customer-detail.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { Subscription, Subject } from 'rxjs';
import { CustomerDetailOfLegalEntity } from 'src/app/_modules/master-data/_backend/legal-customer-detail/legal-customer-detail.entity';
import { PaymentTermEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.entity';
import { PaymentTermSearchEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { BankAccountOfLegalEntity } from 'src/app/_modules/master-data/_backend/bank-account-of-legal-entity/bank-account-of-legal-entity.entity';
import { BankAccountOfLegalSearchEntity } from 'src/app/_modules/master-data/_backend/bank-account-of-legal-entity/bank-account-of-legal-entity.searchentity';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';

@Component({
  selector: 'app-detail-customer-group',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [CustomerDetailService]
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    name: new FormControl(),
  });

  bankAccountsModal = false;
  contactsModal = false;

  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;

  isSavedBookMark = false;
  // Form general customer detail
  customerDetailSubs: Subscription = new Subscription();
  customerDetailForm: FormGroup;
  customerDetailEntity: CustomerDetailOfLegalEntity = new CustomerDetailOfLegalEntity();

  // list drop payment term
  paymentTermIds: PaymentTermEntity[];
  paymentTermExceptIds: PaymentTermEntity[];
  paymentTermTyping: Subject<PaymentTermSearchEntity> = new Subject();
  paymentTermSearchEntity: PaymentTermSearchEntity = new PaymentTermSearchEntity();

  //list drop staff in changre
  staffInChargeIds: EmployeeEntity[];
  staffInChargeExceptIds: EmployeeEntity[];
  staffInChargeTyping: Subject<EmployeeSearchEntity> = new Subject();
  staffInChargeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();

  //list drop staff in changre
  bankIds: BankAccountOfLegalEntity[];
  bankExceptIds: BankAccountOfLegalEntity[];
  bankTyping: Subject<BankAccountOfLegalSearchEntity> = new Subject();
  bankSearchEntity: BankAccountOfLegalSearchEntity = new BankAccountOfLegalSearchEntity();

  //list drop province
  provinceIds: ProvinceEntity[];
  provinceExceptIds: ProvinceEntity[];
  provinceTyping: Subject<ProvinceSearchEntity> = new Subject();
  provinceSearchEntity: ProvinceSearchEntity = new ProvinceSearchEntity();

  contactForm: FormGroup;
  bankAccountForm: FormGroup;
  legalEntiyId: string = '';
  index: number = -1;

  valueSelector = node => node;

  constructor(
    private route: ActivatedRoute,
    private customerDetailService: CustomerDetailService,
    private router: Router,
    private generalService: GeneralService) {

    this.route.queryParams.subscribe(params => {
      this.legalEntiyId = params.legalEntityId;
      this.customerDetailService.getId(params.id);
    });
    const customerFormSub = this.customerDetailService.customerDetailForm.subscribe(res => {
      if (res) {
        this.customerDetailForm = res;
      }
    });

    const listPaymentTerm = this.customerDetailService.paymenttermList.subscribe(res => {
      if (res) {
        this.paymentTermIds = res.ids;
        this.paymentTermExceptIds = res.exceptIds;
      }
    });

    const listStaffInChangre = this.customerDetailService.staffInChargeList.subscribe(res => {
      if (res) {
        this.staffInChargeIds = res.ids;
        this.staffInChargeExceptIds = res.exceptIds;
      }
    });

    const listProvince = this.customerDetailService.proviceList.subscribe(res => {
      if (res) {
        this.provinceIds = res.ids;
        this.provinceExceptIds = res.exceptIds;
      }
    });

    const listBank = this.customerDetailService.bankList.subscribe(res => {
      if (res) {
        this.bankIds = res.ids;
        this.bankExceptIds = res.exceptIds;
      }
    });


    const contactForm = this.customerDetailService.contactForm.subscribe(res => {
      if (res) {
        this.contactForm = res;
      }
    });

    const bankAccountForm = this.customerDetailService.bankAccountForm.subscribe(res => {
      if (res) {
        this.bankAccountForm = res;
      }
    });

    this.customerDetailSubs.add(customerFormSub).add(listPaymentTerm).add(listStaffInChangre)
      .add(contactForm).add(bankAccountForm).add(listProvince).add(listBank);
  }



  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.customerDetailSubs.unsubscribe();
  }


  onClickOpen(event) {
    this.isOpenTab1 = !this.isOpenTab1;
  }

  // list drop payment term
  openPaymentTermList(paymenttermId: string) {
    this.paymentTermSearchEntity = new PaymentTermSearchEntity();
    this.paymentTermSearchEntity.legalEntityId = this.legalEntiyId;
    if (paymenttermId !== null && paymenttermId !== undefined) {
      this.paymentTermSearchEntity.ids.push(paymenttermId);
    }
    this.customerDetailService.getListPaymentTerm(this.paymentTermSearchEntity);
  }

  paymentTermSearch(event) {
    this.customerDetailEntity.code.startsWith = event;
    this.customerDetailEntity.name.startsWith
      = event;
    this.paymentTermTyping.next(this.paymentTermSearchEntity);
  }

  // list drop staff in changre

  openStaffInChargeList(staffInChangeId: string) {
    this.staffInChargeSearchEntity = new EmployeeSearchEntity();
    if (staffInChangeId !== null && staffInChangeId !== undefined) {
      this.staffInChargeSearchEntity.ids.push(staffInChangeId);
    }
    this.customerDetailService.getListStaffInCharge(this.staffInChargeSearchEntity);
  }


  staffInChargeSearch(event) {
    this.staffInChargeSearchEntity.code = event;
    this.staffInChargeSearchEntity.name = event;
    this.staffInChargeTyping.next(this.staffInChargeSearchEntity);
  }


  // list drop bank list

  openBankList(bankId: string) {
    this.bankSearchEntity = new BankAccountOfLegalSearchEntity();
    if (bankId !== null && bankId !== undefined) {
      this.bankSearchEntity.ids.push(bankId);
    }
    this.customerDetailService.getListBank(this.bankSearchEntity);
  }


  bankSearch(event) {
    this.bankSearchEntity.bankName = event;
    this.bankSearchEntity.bankName = event;
    this.bankTyping.next(this.bankSearchEntity);
  }


  // list drop province

  openProvinceList(provinceId: string) {
    this.provinceSearchEntity = new ProvinceSearchEntity();
    if (provinceId !== null && provinceId !== undefined) {
      this.provinceSearchEntity.ids.push(provinceId);
    }
    this.customerDetailService.getListProvice(this.provinceSearchEntity);
  }


  provinceSearch(event) {
    this.provinceSearchEntity.name = event;
    this.provinceTyping.next(this.provinceSearchEntity);
  }
  selectedProvince(event) {
    const data = event.map(e => ({
      provinceId: e.id,
      provinceName: e.name,
    }));
    this.contactForm.setValue({
      ...this.contactForm.value,
      ...data[0],
    });
  }


  // Contact info:
  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2; // open tab contact
  }

  addContact() {
    this.contactsModal = !this.contactsModal;
    this.customerDetailService.addContact();
  }

  saveContact(contactValue: any) {
    if (!this.contactForm.valid) {
      this.generalService.validateAllFormFields(this.contactForm);
    } else {
      this.customerDetailService.saveContact(contactValue, this.index);
      this.contactsModal = !this.contactsModal;
    }
  }

  editContact(contact: any, index: any) {
    this.index = index;
    this.contactsModal = true;
    this.customerDetailService.editContact(contact);
  }


  // Bank account

  onClickOpenTab3() {
    this.isOpenTab3 = !this.isOpenTab3;
  }

  addBankAccount() {
    this.bankAccountsModal = !this.bankAccountsModal;
    this.customerDetailService.addBankAccount();
  }

  saveBankAccount(bankAccount: any) {
    if (!this.contactForm.valid) {
      this.generalService.validateAllFormFields(this.bankAccountForm);
    } else {
      this.customerDetailService.saveBankAccount(bankAccount, this.index);
      this.bankAccountsModal = !this.bankAccountsModal;
    }
  }
  save() {
    this.customerDetailForm.value.code = this.customerDetailForm.controls.code.value;
    this.customerDetailForm.value.name = this.customerDetailForm.controls.name.value;
    this.customerDetailForm.value.taxCode = this.customerDetailForm.controls.taxCode.value;
    this.customerDetailForm.value.status = this.customerDetailForm.controls.status.value;
    this.customerDetailForm.value.note = this.customerDetailForm.controls.note.value;
    if (!this.customerDetailForm.valid) {
      this.generalService.validateAllFormFields(this.customerDetailForm);
    } else {
      this.customerDetailService.save(this.customerDetailForm).then(res => {
        this.router.navigate(['/master-data/legal-entity/customer-of-legal-entity']);
      });
    }
  }

  selectedBank(event) {
    const data = event.map(e => ({
      bankId: e.id,
      bankName: e.name,
    }));
    this.bankAccountForm.setValue({
      ...this.bankAccountForm.value,
      ...data[0],
    });
  }

  selectedProvinceBankAccount(event) {
    const data = event.map(e => ({
      provinceId: e.id,
      provinceName: e.name,
    }));
    this.bankAccountForm.setValue({
      ...this.bankAccountForm.value,
      ...data[0],
    });
  }

  editBankAccount(bankAccount, index) {
    this.index = index;
    this.bankAccountsModal = true;
    this.customerDetailService.editbankAccount(bankAccount);
  }

  cancel() {
    this.router.navigate(['/master-data/legal-entity/customer-of-legal-entity']);
  }
}
