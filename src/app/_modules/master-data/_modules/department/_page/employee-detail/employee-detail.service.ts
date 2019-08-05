import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Entities } from 'src/app/_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { InfoContactForm } from 'src/app/_modules/master-data/_backend/info-contact/info-contact.form';
import { DepartmentEmployeeDetailForm } from 'src/app/_modules/master-data/_backend/department-employee-detail/department-employee-detail.form';
import { DepartmentEmployeeDetailRepository } from './employee-detail.repository';

@Injectable()
export class DepartmentEmployeeDetailService {
    public departmentEmployeeDetailForm: BehaviorSubject<FormGroup>;
    public proviceList: BehaviorSubject<Entities>;
    public bankList: BehaviorSubject<Entities>;
    public contactForm: BehaviorSubject<FormGroup>;

    constructor(
        private fb: FormBuilder,
        private departmentEmployeeDetailRepository: DepartmentEmployeeDetailRepository,
        private toastrService: ToastrService) {
        this.departmentEmployeeDetailForm = new BehaviorSubject(this.fb.group(
            new DepartmentEmployeeDetailForm(),
        ));
        this.proviceList = new BehaviorSubject(new Entities());
        this.bankList = new BehaviorSubject(new Entities());
        this.contactForm = new BehaviorSubject(this.fb.group(
            new InfoContactForm(),
        ));

    }

    getId(employeeId?) {
        if (employeeId !== null && employeeId !== undefined) {
            this.departmentEmployeeDetailRepository.getId(employeeId).subscribe(res => {
                if (res) {
                    this.departmentEmployeeDetailForm.next(this.fb.group(
                        new DepartmentEmployeeDetailForm(res),
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
        this.departmentEmployeeDetailRepository.getListProvince(provinceSearchEntity).subscribe(res => {
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
                return this.departmentEmployeeDetailRepository.getListProvince(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.proviceList.next(res);
                }
            });
    }

    getListBank(bankSearchEntity: BankSearchEntity) {
        this.departmentEmployeeDetailRepository.getListBank(bankSearchEntity).subscribe(res => {
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
                return this.departmentEmployeeDetailRepository.getListBank(searchEntity)
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
        const currentDeparmentItemDetail = this.departmentEmployeeDetailForm.getValue();
        const currentDeparment = currentDeparmentItemDetail.get('employeeContacts') as FormArray;
        if (index >= 0) {
            currentDeparment.controls[index].patchValue(contactValue);
        } else {
            currentDeparment.push(this.fb.group(new InfoContactForm(contactValue)));
        }
        this.departmentEmployeeDetailForm.next(currentDeparmentItemDetail);
    }

    editContact(contact) {
        this.contactForm.next(this.fb.group(new InfoContactForm(contact)));
    }

    deleteContact(index: number) {
        const currentDeparmentItemDetail = this.departmentEmployeeDetailForm.getValue();
        const currentDeparment = currentDeparmentItemDetail.get('employeeContacts') as FormArray;
        currentDeparment.removeAt(index);
        this.departmentEmployeeDetailForm.next(currentDeparmentItemDetail);
    }

    save(departmentEmployeeDetailEntity: any): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.departmentEmployeeDetailRepository.update(departmentEmployeeDetailEntity).subscribe(res => {
                if (res) {
                    this.toastrService.success('Cập nhật thành công !');
                    resolve();
                }
            }, err => {
                if (err) {
                    this.departmentEmployeeDetailForm.next(this.fb.group(
                        new DepartmentEmployeeDetailForm(err),
                    ));
                }
            });
        });
        return defered;
    }

}
