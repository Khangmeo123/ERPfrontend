import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { EmployeeDetailOfLegalEntity } from 'src/app/_modules/master-data/_backend/legal-employee-detail/legal-employee-detail.entity';
import { Entities } from 'src/app/_helpers/entity';
import { EmployeeOfLegalEntityDetailRepository } from './employee-detail.repository';
import { ToastrService } from 'ngx-toastr';
import { LegalEmployeeDetailForm } from 'src/app/_modules/master-data/_backend/legal-employee-detail/legal-employee-detail.form';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { InfoContactForm } from 'src/app/_modules/master-data/_backend/info-contact/info-contact.form';
import { environment } from 'src/environments/environment';

@Injectable()
export class EmployeeDetailService {
    public employeeGeneral: BehaviorSubject<EmployeeDetailOfLegalEntity>;
    public employeeDetailForm: BehaviorSubject<FormGroup>;

    public proviceList: BehaviorSubject<Entities>;
    public bankList: BehaviorSubject<Entities>;
    public contactForm: BehaviorSubject<FormGroup>;

    constructor(
        private fb: FormBuilder,
        private employeeDetailRepository: EmployeeOfLegalEntityDetailRepository,
        private toastrService: ToastrService) {
        this.employeeDetailForm = new BehaviorSubject(this.fb.group(
            new LegalEmployeeDetailForm(),
        ));
        this.proviceList = new BehaviorSubject(new Entities());
        this.bankList = new BehaviorSubject(new Entities());

        this.contactForm = new BehaviorSubject(this.fb.group(
            new InfoContactForm(),
        ));
        
    }

    getId(employeeId?) {
        if (employeeId !== null && employeeId !== undefined) {
            this.employeeDetailRepository.getId(employeeId).subscribe(res => {
                if (res) {
                    this.employeeDetailForm.next(this.fb.group(
                        new LegalEmployeeDetailForm(res),
                    ));
                }
            }, err => {
                if (err) {
                    console.log(err);
                }
            });
        }
    }

    getListProvince(provinceSearchEntity: ProvinceSearchEntity) {
        this.employeeDetailRepository.getListProvince(provinceSearchEntity).subscribe(res => {
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
                return this.employeeDetailRepository.getListProvince(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.proviceList.next(res);
                }
            });
    }

    getListBank(bankSearchEntity: BankSearchEntity) {
        this.employeeDetailRepository.getListBank(bankSearchEntity).subscribe(res => {
            if (res) {
                this.bankList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListListBankByTyping(bankAccountSearchEntity: Observable<BankSearchEntity>) {
        bankAccountSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.employeeDetailRepository.getListBank(searchEntity)
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
        const currentForm = this.employeeDetailForm.getValue();
        const arrayContact = currentForm.get('employeeContacts') as FormArray;
        if (indexContact > -1) {
            arrayContact.value[index] = Object.assign({}, contactValue);
        } else {
            arrayContact.push(
                this.fb.group(new InfoContactForm(contactValue))
            );
        }
        this.employeeDetailForm.next(currentForm);
    }
    editContact(contact) {
        this.contactForm.next(this.fb.group(new InfoContactForm(contact)));
    }

    deleteContact(index: number) {
        const currentCustomerDetail = this.employeeDetailForm.getValue();
        const currentContact = currentCustomerDetail.get('employeeContacts') as FormArray;
        currentContact.removeAt(index);
        this.employeeDetailForm.next(currentCustomerDetail);
    }

    save(employeeDetailEntity: any): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.employeeDetailRepository.update(employeeDetailEntity).subscribe(res => {
                if (res) {
                    this.toastrService.success('Cập nhật thành công !');
                    resolve();
                }
            }, err => {
                if (err) {
                    this.employeeDetailForm.next(this.fb.group(
                        new LegalEmployeeDetailForm(err),
                    ));
                }
            });
        });
        return defered;
    }

}