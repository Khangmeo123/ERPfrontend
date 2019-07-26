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
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { BankAccountSearchEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.searchentity';
import { BankAccountEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.entity';

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
  supplierForm: FormGroup;
  supplierDetailEntity: LegalSupplierDetailEntity = new LegalSupplierDetailEntity();

  // list drop payment term
  paymentTermIds: PaymentTermEntity[];
  paymentTermExceptIds: PaymentTermEntity[];
  paymentTermTyping: Subject<PaymentTermSearchEntity> = new Subject();
  paymentTermSearchEntity: PaymentTermSearchEntity = new PaymentTermSearchEntity();

  //list drop staff in changre
  staffInChangeIds: EmployeeEntity[];
  staffInChangeExceptIds: EmployeeEntity[];
  staffInChangeTyping: Subject<EmployeeSearchEntity> = new Subject();
  staffInChangeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();

  //list drop staff in changre
  bankIds: BankAccountEntity[];
  bankExceptIds: BankAccountEntity[];
  bankTyping: Subject<BankAccountSearchEntity> = new Subject();
  bankSearchEntity: BankAccountSearchEntity = new BankAccountSearchEntity();

  //list drop province
  provinceIds: ProvinceEntity[];
  provinceExceptIds: ProvinceEntity[];
  provinceTyping: Subject<ProvinceSearchEntity> = new Subject();
  provinceSearchEntity: ProvinceSearchEntity = new ProvinceSearchEntity();

  contactForm: FormGroup;
  bankAccountForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private supplierDetailService: SupplierDetailService,
    private router: Router,
    private generalService: GeneralService) {

    this.route.queryParams.subscribe(params => {
      this.supplierDetailService.getId(params.id);
    });
    const supplierFormSub = this.supplierDetailService.supplierDetailForm.subscribe(res => {
      if (res) {
        this.supplierForm = res;
      }
    });

    const listPaymentTerm = this.supplierDetailService.paymenttermList.subscribe(res => {
      if (res) {
        this.paymentTermIds = res.ids;
        this.paymentTermExceptIds = res.exceptIds;
      }
    });

    const listStaffInChangre = this.supplierDetailService.supplierGroupList.subscribe(res => {
      if (res) {
        this.staffInChangeIds = res.ids;
        this.staffInChangeExceptIds = res.exceptIds;
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

    this.supplierDetailSubs.add(supplierFormSub).add(listPaymentTerm).add(listStaffInChangre)
    .add(contactForm).add(bankAccountForm).add(listProvince).add(listBank);
  }

  ngOnInit(): void {
    console.log(this.supplierForm.get('supplierBankAccounts').value)
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
    if (paymenttermId !== null && paymenttermId !== undefined) {
      this.paymentTermSearchEntity.ids.push(paymenttermId);
    }
    this.supplierDetailService.getListPaymentTerm(this.paymentTermSearchEntity);
  }

  paymentTermSearch(event) {
    this.supplierDetailEntity.code.startsWith = event;
    this.supplierDetailEntity.name.startsWith
     = event;
    this.paymentTermTyping.next(this.paymentTermSearchEntity);
  }

  // list drop staff in changre

  openStaffInChangeList(staffInChangeId: string) {
    this.staffInChangeSearchEntity = new EmployeeSearchEntity();
    if (staffInChangeId !== null && staffInChangeId !== undefined) {
      this.staffInChangeSearchEntity.ids.push(staffInChangeId);
    }
    this.supplierDetailService.getListStaffInCharge(this.staffInChangeSearchEntity);
  }


  staffInChangeSearch(event) {
    console.log('event: ', event)
    this.staffInChangeSearchEntity.code = event;
    this.staffInChangeSearchEntity.name = event;
    this.staffInChangeTyping.next(this.staffInChangeSearchEntity);
  }


  // list drop bank list

  openBankList(bankId: string) {
    console.log('bankId', bankId)
    this.bankSearchEntity = new BankAccountSearchEntity();
    if (bankId !== null && bankId !== undefined) {
      this.bankSearchEntity.ids.push(bankId);
    }
    this.supplierDetailService.getListBank(this.bankSearchEntity);
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
    this.supplierDetailService.getListProvice(this.provinceSearchEntity);
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
    this.contactsModal = !this.contactsModal;
    this.supplierDetailService.addContact();
  }

  saveContact(contactValue: any) {
    this.supplierDetailService.saveContact(contactValue);
    this.contactsModal = !this.contactsModal;
  }

  editContact(contact: any) {
    console.log('editContact', contact)
    this.supplierDetailService.editContact(contact);
  }


  // Bank account

  onClickOpenTab3() {
    this.isOpenTab3 = !this.isOpenTab3;
  }

  addBankAccount() {
    this.bankAccountsModal = !this.bankAccountsModal;
    this.supplierDetailService.addCBankAccount();
  }

  saveBankAccount(contactValue: any) {
    this.supplierDetailService.saveBankAccount(contactValue);
    this.contactsModal = !this.contactsModal;
  }
  save() {
    if (!this.supplierForm.valid) {
      console.log('vao invalid');
      this.generalService.validateAllFormFields(this.supplierForm);
    } else {
      console.log('thanh cong');
      this.supplierDetailService.save(this.supplierForm).then(res => {
        this.router.navigate(['/master-data/legal-entity/supplier-of-legal-entity']);
      });
    }
  }

  editBankAccount(id: string) {

  }

  onClickDelete() {

  }

}
