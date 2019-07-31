import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierDetailService } from './supplier-detail.service';
import { Subscription, Subject } from 'rxjs';
import { LegalSupplierDetailEntity } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.entity';
import { PaymentTermEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.entity';
import { PaymentTermSearchEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { InfoContactEntity } from 'src/app/_modules/master-data/_backend/info-contact/info-contact.entity';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';

@Component({
  selector: 'app-detail-supplier-group',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss'],
  providers: [SupplierDetailService]
})
export class SupplierDetailComponent implements OnInit, OnDestroy {

  form = new FormGroup({
    name: new FormControl(),
  });

  bankAccountsModal = false;
  contactsModal = false;

  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;

  // Form general supplier detail
  supplierDetailSubs: Subscription = new Subscription();
  supplierDetailForm: FormGroup;
  supplierDetailEntity: LegalSupplierDetailEntity = new LegalSupplierDetailEntity();

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
  bankIds: BankEntity[];
  bankExceptIds: BankEntity[];
  bankTyping: Subject<BankSearchEntity> = new Subject();
  bankSearchEntity: BankSearchEntity = new BankSearchEntity();

  //list drop province
  provinceIds: ProvinceEntity[];
  provinceExceptIds: ProvinceEntity[];
  provinceTyping: Subject<ProvinceSearchEntity> = new Subject();
  provinceSearchEntity: ProvinceSearchEntity = new ProvinceSearchEntity();

  contactForm: FormGroup;
  bankAccountForm: FormGroup;
  legalEntiyId: string = '';
  index: number = -1;

  routeLink: any;

  valueSelector = node => node;

  constructor(
    private route: ActivatedRoute,
    private supplierDetailService: SupplierDetailService,
    private router: Router,
    private generalService: GeneralService) {

    this.route.queryParams.subscribe(params => {
      this.legalEntiyId = params.legalEntityId;
      this.supplierDetailService.getId(params.id);
    });
    const supplierFormSub = this.supplierDetailService.supplierDetailForm.subscribe(res => {
      console.log(res)
      if (res) {
        this.supplierDetailForm = res;
      }
    });

    const listPaymentTerm = this.supplierDetailService.paymenttermList.subscribe(res => {
      if (res) {
        this.paymentTermIds = res.ids;
        this.paymentTermExceptIds = res.exceptIds;
      }
    });

    const listStaffInChangre = this.supplierDetailService.staffInChargeList.subscribe(res => {
      if (res) {
        this.staffInChargeIds = res.ids;
        this.staffInChargeExceptIds = res.exceptIds;
      }
    });

    const listProvince = this.supplierDetailService.proviceList.subscribe(res => {
      if (res) {
        this.provinceIds = res.ids;
        this.provinceExceptIds = res.exceptIds;
      }
    });

    const listBank = this.supplierDetailService.bankList.subscribe(res => {
      if (res) {
        this.bankIds = res.ids;
        this.bankExceptIds = res.exceptIds;
      }
    });


    const contactForm = this.supplierDetailService.contactForm.subscribe(res => {
      if (res) {
        this.contactForm = res;
      }
    });

    const bankAccountForm = this.supplierDetailService.bankAccountForm.subscribe(res => {
      if (res) {
        this.bankAccountForm = res;
      }
    });
    this.supplierDetailService.getListListBankByTyping(this.bankTyping);
    this.supplierDetailService.getListPaymentTermByTyping(this.paymentTermTyping);
    this.supplierDetailService.getListProvinceByTyping(this.provinceTyping);
    this.supplierDetailService.getListStaffInChargeByTyping(this.staffInChargeTyping);
    this.supplierDetailSubs.add(supplierFormSub).add(listPaymentTerm).add(listStaffInChangre)
    .add(contactForm).add(bankAccountForm).add(listProvince).add(listBank);
  }

  ngOnInit(): void {
    let arr = [];
    arr = this.router.url.split('/');
    if (arr[3] === 'supplier-group') {
      this.routeLink = '/master-data/legal-entity/supplier-group/';
    } else {
      this.routeLink = '/master-data/legal-entity/supplier-of-legal-entity/'
    }
  }

  ngOnDestroy() {
    this.supplierDetailSubs.unsubscribe();
  }

  onClickOpen(event) {
    this.isOpenTab1 = !this.isOpenTab1; // open tab general
  }

  // list drop payment term
  openPaymentTermList(paymenttermId: string) {
    this.paymentTermSearchEntity = new PaymentTermSearchEntity();
    this.paymentTermSearchEntity.legalEntityId = this.legalEntiyId;
    if (paymenttermId !== null && paymenttermId !== undefined) {
      this.paymentTermSearchEntity.ids.push(paymenttermId);
    }
    this.supplierDetailService.getListPaymentTerm(this.paymentTermSearchEntity);
  }

  paymentTermSearch(event) {
    this.supplierDetailEntity.code.startsWith = event;
    this.supplierDetailEntity.name.startsWith = event;
    this.paymentTermTyping.next(this.paymentTermSearchEntity);
  }

  // list drop staff in changre

  openStaffInChargeList(staffInChangeId: string) {
    this.staffInChargeSearchEntity = new EmployeeSearchEntity();
    if (staffInChangeId !== null && staffInChangeId !== undefined) {
      this.staffInChargeSearchEntity.ids.push(staffInChangeId);
    }
    this.supplierDetailService.getListStaffInCharge(this.staffInChargeSearchEntity);
  }


  staffInChargeSearch(event) {
    this.staffInChargeSearchEntity.code = event;
    this.staffInChargeSearchEntity.name = event;
    this.staffInChargeTyping.next(this.staffInChargeSearchEntity);
  }


  // list drop bank list

  openBankList(bankId: string) {
    this.bankSearchEntity = new BankSearchEntity();
    if (bankId !== null && bankId !== undefined) {
      this.bankSearchEntity.ids.push(bankId);
    }
    this.supplierDetailService.getListBank(this.bankSearchEntity);
  }


  bankSearch(event) {
    this.bankSearchEntity.code = event;
    this.bankSearchEntity.name = event;
    this.bankTyping.next(this.bankSearchEntity);
  }


  // list drop province

  openProvinceList(provinceId: string) {
    this.provinceSearchEntity = new ProvinceSearchEntity();
    if (provinceId !== null && provinceId !== undefined) {
      this.provinceSearchEntity.ids.push(provinceId);
    }
    this.supplierDetailService.getListProvince(this.provinceSearchEntity);
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
    this.supplierDetailService.addContact();
  }

  saveContact(contactValue: any) {
    if (!this.contactForm.valid) {
      this.generalService.validateAllFormFields(this.contactForm);
    }else {
      this.supplierDetailService.saveContact(contactValue, this.index);
      this.contactsModal = !this.contactsModal;
    }
  }

  editContact(contact: any, index: any) {
    console.log(index);
    this.index = index;
    this.contactsModal = true;
    this.supplierDetailService.editContact(contact);
  }


  // Bank account

  onClickOpenTab3() {
    this.isOpenTab3 = !this.isOpenTab3;
  }

  addBankAccount() {
    this.bankAccountsModal = !this.bankAccountsModal;
    this.supplierDetailService.addBankAccount();
  }

  saveBankAccount(bankAccount: any) {
    console.log('this.contactForm.valid', this.contactForm.valid)
    if (!this.bankAccountForm.valid) {
      this.generalService.validateAllFormFields(this.bankAccountForm);
    }else {
      this.supplierDetailService.saveBankAccount(bankAccount, this.index);
      this.bankAccountsModal = !this.bankAccountsModal;
    }
  }
  save() {  
    this.supplierDetailForm.value.code = this.supplierDetailForm.controls.code.value;
    this.supplierDetailForm.value.name = this.supplierDetailForm.controls.name.value;
    this.supplierDetailForm.value.taxCode = this.supplierDetailForm.controls.taxCode.value;
    this.supplierDetailForm.value.status = this.supplierDetailForm.controls.status.value;
    this.supplierDetailForm.value.note = this.supplierDetailForm.controls.note.value;
    if (!this.supplierDetailForm.valid) {
      this.generalService.validateAllFormFields(this.supplierDetailForm);
    } else {
      this.supplierDetailService.save(this.supplierDetailForm).then(res => {
        this.router.navigate([this.routeLink]);
      });
    }
  }

  selectedBank(event){
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
    this.supplierDetailService.editbankAccount(bankAccount);
  }

  onClickDelete() {

  }

  cancel() {
    this.router.navigate([this.routeLink]);
  }

}
