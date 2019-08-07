import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { CustomerGroupEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.entity';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CustomerGroupRepository } from './customer-group.repository';
import { ToastrService } from 'ngx-toastr';
import { CustomerGroupForm } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.form';
import { CustomerGroupSearchEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.searchentity';
import { environment } from 'src/environments/environment';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { Entities } from 'src/app/_helpers/entity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export class CustomerGroupService {
    public customerGroupList: BehaviorSubject<CustomerGroupEntity[]>;
    public customerGroupForm: BehaviorSubject<FormGroup>;
    public customerGroupCount: BehaviorSubject<number>;

    public customerDetailList: BehaviorSubject<CustomerEntity[]>;
    public customerDetailCount: BehaviorSubject<number>;

    public legalListDrop: BehaviorSubject<Entities>;
    public customerListDrop: BehaviorSubject<Entities>;


    constructor(
        private fb: FormBuilder,
        private customerGroupRepository: CustomerGroupRepository,
        private toastrService: ToastrService) {
        this.customerGroupCount = new BehaviorSubject(0);
        this.customerGroupList = new BehaviorSubject([]);
        this.customerGroupForm = new BehaviorSubject(this.fb.group(
            new CustomerGroupForm(),
        ));

        this.customerDetailCount = new BehaviorSubject(0);
        this.customerDetailList = new BehaviorSubject([]);
        this.legalListDrop = new BehaviorSubject(new Entities());
        this.customerListDrop = new BehaviorSubject(new Entities());
    }

    getList(customerGroupSearchEntity: CustomerGroupSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            forkJoin(this.customerGroupRepository.getListCustomerGroup(customerGroupSearchEntity),
            this.customerGroupRepository.countCustomerGroup(customerGroupSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.customerGroupList.next(list);
                }
                if (count) {
                    this.customerGroupCount.next(count);
                }
                resolve(true);
            }, err => {
                    reject(false);
            });
        });
        return defered;
    }
    add(legalEntityId: any) {
        if (legalEntityId) {
            const customerGroup = new CustomerGroupEntity();
            customerGroup.legalEntityId = legalEntityId;
            const form = this.fb.group(
                new CustomerGroupForm(customerGroup),
            )
            this.customerGroupForm.next(this.fb.group(
                new CustomerGroupForm(customerGroup),
            ));
        }
    }

    edit(legalId: string) {
        this.customerGroupRepository.getId(legalId).subscribe(res => {
            if (res) {
                this.customerGroupForm.next(this.fb.group(
                    new CustomerGroupForm(res),
                ));
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }


    save(customerGroupEntity: any, customerGroupSearchEntity: CustomerGroupSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
          if (customerGroupEntity.id === null || customerGroupEntity.id === undefined || customerGroupEntity.id === environment.emptyGuid) {
            this.customerGroupRepository.add(customerGroupEntity).subscribe(res => {
              if (res) {
                this.getList(customerGroupSearchEntity);
                this.toastrService.success('Cập nhật thành công !');
                resolve(false);
              }
            }, err => {
              if (err) {
                this.customerGroupForm.next(this.fb.group(
                  new CustomerGroupForm(err),
                ));
                reject(true);
              }
            });
          } else {
            this.customerGroupRepository.update(customerGroupEntity).subscribe(res => {
              if (res) {
                this.getList(customerGroupSearchEntity);
                this.toastrService.success('Cập nhật thành công !');
                resolve(false);
              }
            }, err => {
              if (err) {
                this.customerGroupForm.next(this.fb.group(
                  new CustomerGroupForm(err),
                ));
                reject(true);
              }
            });
          }
        });
        return defered;
      }


      getListCustomerDetail(customerSearchEntity: CustomerSearchEntity) {
        forkJoin(this.customerGroupRepository.getListCustomerDetail(customerSearchEntity),
            this.customerGroupRepository.countCustomerDetail(customerSearchEntity)).subscribe(([list, count]) => {
                if (list) {
                    this.customerDetailList.next(list);
                }
                if (count) {
                    this.customerDetailCount.next(count);
                }
            });
    }

      saveCustomer(customerSearchEntity: CustomerSearchEntity): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.customerGroupRepository.addCustomer(customerSearchEntity).subscribe(res => {
                if (res) {
                    this.getListCustomerDetail(customerSearchEntity);
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

    deleteCustomer(customerId: string, customerGroupId: string): Promise<boolean> {
        const defered = new Promise<boolean>((resolve, reject) => {
            this.customerGroupRepository.deleteCustomer(customerId, customerGroupId).subscribe(res => {
                if (res) {
                    this.toastrService.success('Hệ thống cập nhật thành công!');
                    resolve(res);
                }
            }, err => {
                if (err) {
                    reject(err);
                }
            });
        });
        return defered;
      }

    getListLegalEntity(legalSearchEntity: LegalSearchEntity) {
        this.customerGroupRepository.getListLegalEntity(legalSearchEntity).subscribe(res => {
            if (res) {
                this.legalListDrop.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getLisLegalEntityByTyping(legalSearchEntity: Observable<LegalSearchEntity>) {
        legalSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.customerGroupRepository.getListLegalEntity(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.legalListDrop.next(res);
                }
            });
    }

    getListCustomer(customerSearchEntity: CustomerSearchEntity) {
        this.customerGroupRepository.getListCustomer(customerSearchEntity).subscribe(res => {
            if (res) {
                this.customerListDrop.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }
    getListcustomerOfCustomerGroupByTyping(customerSearchEntity: Observable<CustomerSearchEntity>) {
        customerSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.customerGroupRepository.getListCustomer(searchEntity)
            })).subscribe(res => {
                if (res) {
                    this.customerListDrop.next(res);
                }
            });
    }

}
