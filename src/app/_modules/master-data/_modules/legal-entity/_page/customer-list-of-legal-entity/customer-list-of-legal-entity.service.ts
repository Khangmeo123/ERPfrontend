import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';
import { CustomerOfLegalEntityRepository } from './customer-list-of-legal-entity.repository';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import { Entities } from 'src/app/_helpers/entity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

export class CustomerOfLegalEntityService {
    public legalEntityList: BehaviorSubject<LegalEntity[]>;
    public legalEntityCount: BehaviorSubject<number>;

    public customerList: BehaviorSubject<CustomerEntity[]>;
    public customerCount: BehaviorSubject<number>;
    public customerListOflegalEntity: BehaviorSubject<Entities>;

    constructor(
        private fb: FormBuilder,
        private customerOflegalEntityRepository: CustomerOfLegalEntityRepository,
        private toastrService: ToastrService) {
        this.legalEntityCount = new BehaviorSubject(0);
        this.legalEntityList = new BehaviorSubject([]);

        this.customerList = new BehaviorSubject([]);
        this.customerCount = new BehaviorSubject(0);
        this.customerListOflegalEntity = new BehaviorSubject(new Entities());

    }


    getListLegal(legalSearchEntity: LegalSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.customerOflegalEntityRepository.getListLegal(legalSearchEntity),
                this.customerOflegalEntityRepository.countlegal(legalSearchEntity)).subscribe(([list, count]) => {
                    if (list) {
                        this.legalEntityList.next(list);
                    }
                    if (count) {
                        this.legalEntityCount.next(count);
                    }
                    resolve(true);
                }, err => {
                    reject(false);
                });
        });
        return defered;
    }


    getListCustomer(customerSearchEntity: CustomerSearchEntity) {
        forkJoin(this.customerOflegalEntityRepository.getListCustomer(customerSearchEntity),
            this.customerOflegalEntityRepository.countCustomer(customerSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.customerList.next(list);
                }
                if (count) {
                    this.customerCount.next(count);
                }
            });
    }

    getListCustomerOflegalEntity(customerSearchEntity: CustomerSearchEntity) {
        this.customerOflegalEntityRepository.getListCustomerDrop(customerSearchEntity).subscribe(res => {
            if (res) {
                this.customerListOflegalEntity.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    getListCustomerOfLegalEntityByTyping(customerSearchEntity: Observable<CustomerSearchEntity>) {
        customerSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.customerOflegalEntityRepository.getListCustomerDrop(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.customerListOflegalEntity.next(res);
                }
            });
    }

    saveCustomer(customerSearchEntity: CustomerSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.customerOflegalEntityRepository.addCustomer(customerSearchEntity).subscribe(res => {
                if (res) {
                    this.getListCustomer(customerSearchEntity);
                    this.toastrService.success('Cập nhật thành công !');
                    resolve(false);
                }
            }, err => {
                if (err) {
                    reject(true);
                }
            });
        });
        return defered;
    }

    delete(customerSearchEntity: CustomerSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
          this.customerOflegalEntityRepository.deleteCustomer(customerSearchEntity).subscribe(res => {
            if (res) {
              this.toastrService.success('Cập nhật thành công !');
              resolve(true);
            }
          }, err => {
            if (err) {
              reject(false);
            }
          });
        });
        return defered;
      }


}
