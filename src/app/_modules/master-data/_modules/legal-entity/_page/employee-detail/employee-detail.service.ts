import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { EmployeeDetailOfLegalEntity } from 'src/app/_modules/master-data/_backend/legal-employee-detail/legal-employee-detail.entity';
import { Entities } from 'src/app/_helpers/entity';
import { EmployeeOfLegalEntityDetailRepository } from './employee-detail.repository';
import { ToastrService } from 'ngx-toastr';
import { LegalEmployeeDetailForm } from 'src/app/_modules/master-data/_backend/legal-employee-detail/legal-employee-detail.form';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class EmployeeDetailService {
    public customerGeneral: BehaviorSubject<EmployeeDetailOfLegalEntity>;
    public customerDetailForm: BehaviorSubject<FormGroup>;

    public proviceList: BehaviorSubject<Entities>;
    public bankList: BehaviorSubject<Entities>;

    constructor(
        private fb: FormBuilder,
        private employeeDetailRepository: EmployeeOfLegalEntityDetailRepository,
        private toastrService: ToastrService) {
        this.customerDetailForm = new BehaviorSubject(this.fb.group(
            new LegalEmployeeDetailForm(),
        ));
        this.proviceList = new BehaviorSubject(new Entities());
        this.bankList = new BehaviorSubject(new Entities());
        
    }

    getId(customerId?) {
        if (customerId !== null && customerId !== undefined) {
            this.employeeDetailRepository.getId(customerId).subscribe(res => {
                if (res) {
                    this.customerDetailForm.next(this.fb.group(
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

    getListProvice(provinceSearchEntity: ProvinceSearchEntity) {
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
    getListProviceByTyping(provinceSearchEntity: Observable<ProvinceSearchEntity>) {
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

    // getListBank(bankSearchEntity: BankSearchEntity) {
    //     this.employeeDetailRepository.getListBankAccount(bankSearchEntity).subscribe(res => {
    //         if (res) {
    //             this.bankList.next(res);
    //         }
    //     }, err => {
    //         if (err) {
    //             console.log(err);
    //         }
    //     });
    // }
    // getListListBankByTyping(bankAccountSearchEntity: Observable<BankSearchEntity>) {
    //     bankAccountSearchEntity.pipe(debounceTime(400),
    //         distinctUntilChanged(),
    //         switchMap(searchEntity => {
    //             return this.employeeDetailRepository.getListBankAccount(searchEntity)
    //         })).subscribe(res => {
    //             if (res) {
    //                 this.bankList.next(res);
    //             }
    //         });
    // }

}