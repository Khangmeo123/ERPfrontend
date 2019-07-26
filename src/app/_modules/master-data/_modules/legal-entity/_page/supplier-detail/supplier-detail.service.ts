import { LegalSupplierDetailEntity } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Entities, EnumEntity } from 'src/app/_helpers/entity';
import { SupplierDetailRepository } from './supplier-detail.repository';
import { ToastrService } from 'ngx-toastr';
import { SupplierDetailForm } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.form';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { PaymentTermSearchEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.searchentity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { InfoContactForm } from 'src/app/_modules/master-data/_backend/info-contact/info-contact.form';
import { BankAccountForm } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.form';
import { environment } from 'src/environments/environment';
import { LegalCustomerDetailForm } from 'src/app/_modules/master-data/_backend/legal-customer-detail/legal-customer-detail.form';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { BankAccountSearchEntity } from 'src/app/_modules/master-data/_backend/bank-account/bank-account.searchentity';

@Injectable()
export class SupplierDetailService {
    public supplierGeneral: BehaviorSubject<LegalSupplierDetailEntity>;
    public supplierDetailForm: BehaviorSubject<FormGroup>;

    public paymenttermList: BehaviorSubject<Entities>;
    public staffInChangreList: BehaviorSubject<Entities>;
    public supplierGroupList: BehaviorSubject<Entities>;
    public proviceList: BehaviorSubject<Entities>;
    public bankList: BehaviorSubject<Entities>;
    public contactForm: BehaviorSubject<FormGroup>;
    public bankAccountForm: BehaviorSubject<FormGroup>;
    constructor(
        private fb: FormBuilder, 
        private supplierDetailRepository: SupplierDetailRepository,
        private toastrService: ToastrService) {
        this.supplierDetailForm = new BehaviorSubject(this.fb.group(
          new SupplierDetailForm(),
        ));
        this.paymenttermList = new BehaviorSubject(new Entities());
        this.staffInChangreList = new BehaviorSubject(new Entities());
        this.supplierGroupList = new BehaviorSubject(new Entities());
        this.proviceList = new BehaviorSubject(new Entities());
        this.bankList = new BehaviorSubject(new Entities());
        this.contactForm = new BehaviorSubject(this.fb.group(
            new InfoContactForm(),
          ));
        this.bankAccountForm = new BehaviorSubject(this.fb.group(
            new BankAccountForm(),
        ));
      }

      getId(supplierId?) {
        if (supplierId !== null && supplierId !== undefined) {
          this.supplierDetailRepository.getId(supplierId).subscribe(res => {
            if (res) {
              this.supplierDetailForm.next(this.fb.group(
                new SupplierDetailForm(res),
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
        this.supplierDetailRepository.getListPaymentTerm(paymentTermSearchEntity).subscribe(res => {
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
                return this.supplierDetailRepository.getListPaymentTerm(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.paymenttermList.next(res);
                }
            });
    }


    getListProvice(provinceSearchEntity: ProvinceSearchEntity) {
        this.supplierDetailRepository.getListProvince(provinceSearchEntity).subscribe(res => {
            if (res) {
                this.proviceList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListProviceByTyping(provinceSearchEntity: Observable<ProvinceSearchEntity>) {
        provinceSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierDetailRepository.getListProvince(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.proviceList.next(res);
                }
            });
    }

    getListStaffInCharge(employeeSearchEntity: EmployeeSearchEntity) {
        this.supplierDetailRepository.getListStaffInCharge(employeeSearchEntity).subscribe(res => {
            if (res) {
                this.staffInChangreList.next(res);
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
                return this.supplierDetailRepository.getListStaffInCharge(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.staffInChangreList.next(res);
                }
            });
    }


    getListBank(bankAccountSearchEntity: BankAccountSearchEntity) {
        this.supplierDetailRepository.getListBankAccount(bankAccountSearchEntity).subscribe(res => {
            if (res) {
                this.bankList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListListBankByTyping(bankAccountSearchEntity: Observable<BankAccountSearchEntity>) {
        bankAccountSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierDetailRepository.getListBankAccount(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.bankList.next(res);
                }
            });
    }

    addContact() {
        this.contactForm.next(this.fb.group(new InfoContactForm()));
    }

    saveContact(contactValue: any) {
        const currentForm = this.supplierDetailForm.getValue();
        const arrayContact = currentForm.get('supplierContacts') as FormArray;
        arrayContact.push(
            this.fb.group(new InfoContactForm(contactValue))
        );
        this.supplierDetailForm.next(currentForm);
    }


    editContact(contact) {
        this.contactForm.next(this.fb.group(new InfoContactForm(contact)));
    }

    addCBankAccount() {
        this.bankAccountForm.next(this.fb.group(new BankAccountForm()));
    }

    saveBankAccount(bankAccountValue: any) {
        const currentForm = this.supplierDetailForm.getValue();
        const arrayBankAccount = currentForm.get('supplierBankAccounts') as FormArray;
        arrayBankAccount.push(
            this.fb.group(new BankAccountForm(bankAccountValue))
        );
        this.supplierDetailForm.next(currentForm);
    }


    save(supplierDetailEntity: any): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
          if (supplierDetailEntity.id === null || supplierDetailEntity.id === undefined 
            || supplierDetailEntity.id === environment.emtyGuid) {
          } else {
            this.supplierDetailRepository.update(supplierDetailEntity).subscribe(res => {
              if (res) {
                this.toastrService.success('Cập nhật thành công !');
                resolve();
              }
            }, err => {
              if (err) {
                this.supplierDetailForm.next(this.fb.group(
                  new LegalCustomerDetailForm(err),
                ));
              }
            });
          }
        });
        return defered;
      }
}
