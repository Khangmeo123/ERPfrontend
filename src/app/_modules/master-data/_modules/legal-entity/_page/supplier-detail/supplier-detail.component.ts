import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { LegalSupplierDetailEntity } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.entity';
import { PaymentTermEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.entity';
import { PaymentTermSearchEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { LegalSupplierDetailService } from './supplier-detail.service';

@Component({
  selector: 'app-detail-supplier-group',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss'],
  providers: [LegalSupplierDetailService]
})
export class LegalSupplierDetailComponent implements OnInit, OnDestroy {

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

  // list drop staff in changre
  staffInChargeIds: EmployeeEntity[];
  staffInChargeExceptIds: EmployeeEntity[];
  staffInChargeTyping: Subject<EmployeeSearchEntity> = new Subject();
  staffInChargeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();

  // list drop staff in changre
  bankIds: BankEntity[];
  bankExceptIds: BankEntity[];
  bankTyping: Subject<BankSearchEntity> = new Subject();
  bankSearchEntity: BankSearchEntity = new BankSearchEntity();

  // list drop province
  provinceIds: ProvinceEntity[];
  provinceExceptIds: ProvinceEntity[];
  province2Ids: ProvinceEntity[];
  province2ExceptIds: ProvinceEntity[];
  provinceTyping: Subject<ProvinceSearchEntity> = new Subject();
  provinceSearchEntity: ProvinceSearchEntity = new ProvinceSearchEntity();

  contactForm: FormGroup;
  bankAccountForm: FormGroup;
  legalEntiyId: string = null;
  index: number = -1;
  popoverTitle: string = 'Popover title';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  routeLink: any;

  valueSelector = node => node;

  constructor(
    private route: ActivatedRoute,
    private legalSupplierDetailService: LegalSupplierDetailService,
    private router: Router,
    private generalService: GeneralService) {

    this.route.queryParams.subscribe(params => {
      this.legalEntiyId = params.legalEntityId;
      this.legalSupplierDetailService.getId(params.id);
    });
    const supplierFormSub = this.legalSupplierDetailService.supplierDetailForm.subscribe(res => {
      if (res) {
        this.supplierDetailForm = res;
      }
    });

    const listPaymentTerm = this.legalSupplierDetailService.paymenttermList.subscribe(res => {
      if (res) {
        this.paymentTermIds = res.ids;
        this.paymentTermExceptIds = res.exceptIds;
      }
    });

    const listStaffInChangre = this.legalSupplierDetailService.staffInChargeList.subscribe(res => {
      if (res) {
        this.staffInChargeIds = res.ids;
        this.staffInChargeExceptIds = res.exceptIds;
      }
    });

    const listProvince = this.legalSupplierDetailService.proviceList.subscribe(res => {
      if (res) {
        this.provinceIds = res.ids;
        this.provinceExceptIds = res.exceptIds;
      }
    });

    const listProvinceContact = this.legalSupplierDetailService.proviceList.subscribe(res => {
      if (res) {
        this.province2Ids = res.ids;
        this.province2ExceptIds = res.exceptIds;
      }
    });

    const listBank = this.legalSupplierDetailService.bankList.subscribe(res => {
      if (res) {
        this.bankIds = res.ids;
        this.bankExceptIds = res.exceptIds;
      }
    });


    const contactForm = this.legalSupplierDetailService.contactForm.subscribe(res => {
      if (res) {
        this.contactForm = res;
      }
    });

    const bankAccountForm = this.legalSupplierDetailService.bankAccountForm.subscribe(res => {
      if (res) {
        this.bankAccountForm = res;
      }
    });
    this.legalSupplierDetailService.getListListBankByTyping(this.bankTyping);
    this.legalSupplierDetailService.getListPaymentTermByTyping(this.paymentTermTyping);
    this.legalSupplierDetailService.getListProvinceByTyping(this.provinceTyping);
    this.legalSupplierDetailService.getListStaffInChargeByTyping(this.staffInChargeTyping);
    this.supplierDetailSubs.add(supplierFormSub).add(listPaymentTerm).add(listStaffInChangre)
      .add(contactForm).add(bankAccountForm).add(listProvince).add(listBank);
  }

  ngOnInit(): void {
    const arr = this.router.url.split('/')[3];
    switch (arr) {
      case 'supplier-of-legal-entity':
        this.routeLink = '/master-data/legal-entity/supplier-of-legal-entity';
        break;
      case 'supplier-group':
        this.routeLink = '/master-data/legal-entity/supplier-group';
        break;
    }
  }

  ngOnDestroy() {
    this.supplierDetailSubs.unsubscribe();
  }

  onClickOpen(event) {
    this.isOpenTab1 = !this.isOpenTab1; // open tab general
  }

  deactiveSupplierDetail() {

  }
  // list drop payment term
  openPaymentTermList(paymenttermId: string) {
    this.paymentTermSearchEntity = new PaymentTermSearchEntity();
    this.paymentTermSearchEntity.legalEntityId = this.legalEntiyId;
    if (paymenttermId !== null && paymenttermId !== undefined && paymenttermId !== '') {
      this.paymentTermSearchEntity.ids.push(paymenttermId);
    }
    this.legalSupplierDetailService.getListPaymentTerm(this.paymentTermSearchEntity);
  }

  paymentTermSearch(event) {
    this.paymentTermSearchEntity = new PaymentTermSearchEntity();
    this.supplierDetailEntity.code.startsWith = event;
    this.supplierDetailEntity.name.startsWith = event;
    this.paymentTermTyping.next(this.paymentTermSearchEntity);
  }

  // list drop staff in changre

  openStaffInChargeList(staffInChangeId: string) {
    this.staffInChargeSearchEntity = new EmployeeSearchEntity();
    if (staffInChangeId !== null && staffInChangeId !== undefined && staffInChangeId !== '') {
      this.staffInChargeSearchEntity.ids.push(staffInChangeId);
    }
    this.legalSupplierDetailService.getListStaffInCharge(this.staffInChargeSearchEntity);
  }


  staffInChargeSearch(event) {
    this.staffInChargeSearchEntity = new EmployeeSearchEntity();
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
    this.legalSupplierDetailService.getListBank(this.bankSearchEntity);
  }


  bankSearch(event) {
    this.bankSearchEntity.code = event;
    this.bankSearchEntity.name = event;
    this.bankTyping.next(this.bankSearchEntity);
  }


  // list drop province

  openProvinceList(provinceId: string) {
    this.provinceSearchEntity = new ProvinceSearchEntity();
    if (provinceId !== null && provinceId !== undefined && provinceId !== '') {
      this.provinceSearchEntity.ids.push(provinceId);
    }
    this.legalSupplierDetailService.getListProvince(this.provinceSearchEntity);
  }


  provinceSearch(event) {
    this.provinceSearchEntity.name = event;
    this.provinceTyping.next(this.provinceSearchEntity);
  }


  // Contact info:
  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2; // open tab contact
  }

  addContact() {
    this.contactsModal = true;
    this.legalSupplierDetailService.addContact();
  }

  saveContact(contactValue: any) {
    if (!this.contactForm.valid) {
      this.generalService.validateAllFormFields(this.contactForm);
    } else {
      this.legalSupplierDetailService.saveContact(contactValue, this.index);
      this.contactsModal = !this.contactsModal;
    }
  }

  editContact(contact: any, index: any) {
    this.index = index;
    this.contactsModal = true;
    this.legalSupplierDetailService.editContact(contact);
  }

  deleteContact(index: number) {
    this.legalSupplierDetailService.deleteContact(index);
  }


  // Bank account

  onClickOpenTab3() {
    this.isOpenTab3 = !this.isOpenTab3;
  }

  addBankAccount() {
    this.bankAccountsModal = !this.bankAccountsModal;
    this.legalSupplierDetailService.addBankAccount();
  }

  saveBankAccount(bankAccount: any) {
    if (!this.bankAccountForm.valid) {
      this.generalService.validateAllFormFields(this.bankAccountForm);
    } else {
      this.legalSupplierDetailService.saveBankAccount(bankAccount, this.index);
      this.bankAccountsModal = !this.bankAccountsModal;
    }
  }
  save() {
    if (!this.supplierDetailForm.valid) {
      this.generalService.validateAllFormFields(this.supplierDetailForm);
    } else {
      this.legalSupplierDetailService.save(this.supplierDetailForm.getRawValue()).then(res => {
        this.router.navigate([this.routeLink]);
      });
    }
  }

  editBankAccount(bankAccount, index) {
    this.index = index;
    this.bankAccountsModal = true;
    this.legalSupplierDetailService.editbankAccount(bankAccount);
  }

  deletebankAccount(index: number) {
    this.legalSupplierDetailService.deleteBankAccount(index);
  }

  cancel() {
    this.router.navigate([this.routeLink]);
  }

}
