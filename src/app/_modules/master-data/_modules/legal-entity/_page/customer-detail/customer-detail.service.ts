import { Injectable } from '@angular/core';
import { CustomerDetailOfLegalEntity } from 'src/app/_modules/master-data/_backend/legal-customer-detail/legal-customer-detail.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Entities } from 'src/app/_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { CustomerDetailOfLegalForm } from 'src/app/_modules/master-data/_backend/legal-customer-detail/legal-customer-detail.form';
import { InfoContactForm } from 'src/app/_modules/master-data/_backend/info-contact/info-contact.form';
import { BankAccountOfLegalForm } from 'src/app/_modules/master-data/_backend/bank-account-of-legal-entity/bank-account-of-legal-entity.form';
import { PaymentTermSearchEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { BankAccountOfLegalSearchEntity } from 'src/app/_modules/master-data/_backend/bank-account-of-legal-entity/bank-account-of-legal-entity.searchentity';
import { CustomerOfLegalEntityDetailRepository } from './customer-detail.repository';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';

@Injectable()
export class CustomerDetailService {
    public customerGeneral: BehaviorSubject<CustomerDetailOfLegalEntity>;
    public customerDetailForm: BehaviorSubject<FormGroup>;

    public paymenttermList: BehaviorSubject<Entities>;
    public staffInChargeList: BehaviorSubject<Entities>;
    public customerGroupList: BehaviorSubject<Entities>;
    public proviceList: BehaviorSubject<Entities>;
    public bankList: BehaviorSubject<Entities>;
    public contactForm: BehaviorSubject<FormGroup>;
    public bankAccountForm: BehaviorSubject<FormGroup>;
    constructor(
        private fb: FormBuilder,
        private customerDetailRepository: CustomerOfLegalEntityDetailRepository,
        private toastrService: ToastrService) {
        this.customerDetailForm = new BehaviorSubject(this.fb.group(
            new CustomerDetailOfLegalForm(),
        ));
        this.paymenttermList = new BehaviorSubject(new Entities());
        this.staffInChargeList = new BehaviorSubject(new Entities());
        this.customerGroupList = new BehaviorSubject(new Entities());
        this.proviceList = new BehaviorSubject(new Entities());
        this.bankList = new BehaviorSubject(new Entities());
        this.contactForm = new BehaviorSubject(this.fb.group(
            new InfoContactForm(),
        ));
        this.bankAccountForm = new BehaviorSubject(this.fb.group(
            new BankAccountOfLegalForm(),
        ));
    }

    getId(customerId?) {
        if (customerId !== null && customerId !== undefined) {
            this.customerDetailRepository.getId(customerId).subscribe(res => {
                if (res) {
                    this.customerDetailForm.next(this.fb.group(
                        new CustomerDetailOfLegalForm(res),
                    ));
                }
            }, err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    getListPaymentTerm(paymentTermSearchEntity: PaymentTermSearchEntity) {
        this.customerDetailRepository.getListPaymentTerm(paymentTermSearchEntity).subscribe(res => {
            if (res) {
                this.paymenttermList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListPaymentTermByTyping(paymentTermSearchEntity: Observable<PaymentTermSearchEntity>) {
        paymentTermSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.customerDetailRepository.getListPaymentTerm(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.paymenttermList.next(res);
                }
            });
    }


    getListProvince(provinceSearchEntity: ProvinceSearchEntity) {
        this.customerDetailRepository.getListProvince(provinceSearchEntity).subscribe(res => {
            if (res) {
                this.proviceList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListProvinceByTyping(provinceSearchEntity: Observable<ProvinceSearchEntity>) {
        provinceSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.customerDetailRepository.getListProvince(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.proviceList.next(res);
                }
            });
    }

    getListStaffInCharge(employeeSearchEntity: EmployeeSearchEntity) {
        this.customerDetailRepository.getListStaffInCharge(employeeSearchEntity).subscribe(res => {
            if (res) {
                this.staffInChargeList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListStaffInChargeByTyping(employeeSearchEntity: Observable<EmployeeSearchEntity>) {
        employeeSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.customerDetailRepository.getListStaffInCharge(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.staffInChargeList.next(res);
                }
            });
    }


    getListBank(bankSearchEntity: BankSearchEntity) {
        this.customerDetailRepository.getListBankAccount(bankSearchEntity).subscribe(res => {
            if (res) {
                this.bankList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListListBankByTyping(bankSearchEntity: Observable<BankSearchEntity>) {
        bankSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.customerDetailRepository.getListBankAccount(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.bankList.next(res);
                }
            });
    }

    addContact() {
        this.contactForm.next(this.fb.group(new InfoContactForm()));
    }

    saveContact(contactValue: any, index: any) {
        const indexContact = Number(index);
        const currentForm = this.customerDetailForm.getValue();
        const arrayContact = currentForm.get('customerContacts') as FormArray;
        if (indexContact > -1) {
            arrayContact.value[index] = Object.assign({}, contactValue);
        } else {
            arrayContact.push(
                this.fb.group(new InfoContactForm(contactValue))
            );
        }
        this.customerDetailForm.next(currentForm);
    }
    editContact(contact) {
        this.contactForm.next(this.fb.group(new InfoContactForm(contact)));
    }
    addBankAccount() {
        this.bankAccountForm.next(this.fb.group(new BankAccountOfLegalForm()));
    }

    saveBankAccount(bankAccountValue: any, index: any) {
        const indexbankAccount = Number(index);
        const currentForm = this.customerDetailForm.getValue();
        const arrayBankAccount = currentForm.get('customerBankAccounts') as FormArray;
        if (indexbankAccount > -1) {
            arrayBankAccount.value[index] = Object.assign({}, bankAccountValue);
        } else {
            arrayBankAccount.push(
                this.fb.group(new BankAccountOfLegalForm(bankAccountValue))
            );
        }
        this.customerDetailForm.next(currentForm);
    }
    editbankAccount(bankAccountForm) {
        this.bankAccountForm.next(this.fb.group(new BankAccountOfLegalForm(bankAccountForm)));
    }

    save(customerDetailEntity: any): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.customerDetailRepository.update(customerDetailEntity).subscribe(res => {
                if (res) {
                    this.toastrService.success('Cập nhật thành công !');
                    resolve();
                }
            }, err => {
                if (err) {
                    this.customerDetailForm.next(this.fb.group(
                        new CustomerDetailOfLegalForm(err),
                    ));
                }
            });
        });
        return defered;
    }
}