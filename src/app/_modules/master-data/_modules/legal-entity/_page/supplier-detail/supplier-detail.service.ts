import { LegalSupplierDetailEntity } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.entity';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Entities, EnumEntity } from 'src/app/_helpers/entity';
import { SupplierDetailRepository } from './supplier-detail.repository';
import { ToastrService } from 'ngx-toastr';
import { SupplierDetailForm } from 'src/app/_modules/master-data/_backend/legal-supplier-detail/legal-supplier-detail.form';
import { Injectable } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class SupplierDetailService {
    public supplierGeneral: BehaviorSubject<LegalSupplierDetailEntity>;
    public supplierDetailForm: BehaviorSubject<FormGroup>;

    public paymenttermList: BehaviorSubject<Entities>;
    public staffInChangreList: BehaviorSubject<Entities>;
    public supplierGroupList: BehaviorSubject<Entities>;
    public proviceList: BehaviorSubject<Entities>;
    public bankList: BehaviorSubject<Entities>;

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
      }

      getId(supplierId?) {
        if (supplierId === null || supplierId === undefined) {
          this.supplierDetailForm.next(this.fb.group(
            new SupplierDetailForm(),
          ));
        } else {
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

      getListPaymentTermEntity(legalSupplierDetailEntity: LegalSupplierDetailEntity) {
        this.supplierDetailRepository.getListPaymentTerm(legalSupplierDetailEntity).subscribe(res => {
            if (res) {
                this.paymenttermList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListPaymentTermByTyping(supplierGroupSearchEntity: Observable<LegalSupplierDetailEntity>) {
        supplierGroupSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierDetailRepository.getListPaymentTerm(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.paymenttermList.next(res);
                }
            });
    }


    getListProviceEntity(legalSupplierDetailEntity: LegalSupplierDetailEntity) {
        this.supplierDetailRepository.getListPaymentTerm(legalSupplierDetailEntity).subscribe(res => {
            if (res) {
                this.proviceList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListProviceByTyping(supplierGroupSearchEntity: Observable<LegalSupplierDetailEntity>) {
        supplierGroupSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierDetailRepository.getListPaymentTerm(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.proviceList.next(res);
                }
            });
    }

    getListStaffInChargeEntity(legalSupplierDetailEntity: LegalSupplierDetailEntity) {
        this.supplierDetailRepository.getListPaymentTerm(legalSupplierDetailEntity).subscribe(res => {
            if (res) {
                this.staffInChangreList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListStaffInChargeByTyping(supplierGroupSearchEntity: Observable<LegalSupplierDetailEntity>) {
        supplierGroupSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierDetailRepository.getListPaymentTerm(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.staffInChangreList.next(res);
                }
            });
    }


    getListBankEntity(legalSupplierDetailEntity: LegalSupplierDetailEntity) {
        this.supplierDetailRepository.getListPaymentTerm(legalSupplierDetailEntity).subscribe(res => {
            if (res) {
                this.bankList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListListBankByTyping(supplierGroupSearchEntity: Observable<LegalSupplierDetailEntity>) {
        supplierGroupSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.supplierDetailRepository.getListPaymentTerm(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.bankList.next(res);
                }
            });
    }
}
