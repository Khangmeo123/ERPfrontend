import { EnumEntity } from './../../../../../../../_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { CustomerListRepository } from './customer-list.repository';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';

@Injectable()
export class CustomerListService {
  public customerList: BehaviorSubject<CustomerEntity[]>;
  public customerCount: BehaviorSubject<number>;
  public statusList: BehaviorSubject<EnumEntity[]>;
  constructor(private customerRepository: CustomerListRepository, private toastrService: ToastrService) {
    this.customerList = new BehaviorSubject([]);
    this.customerCount = new BehaviorSubject(0);
    this.statusList = new BehaviorSubject([]);
  }

  getList(customerSearchEntity: CustomerSearchEntity) {
    forkJoin(this.customerRepository.getList(customerSearchEntity),
      this.customerRepository.count(customerSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.customerList.next(list);
        }
        if (count) {
          this.customerCount.next(count);
        }
      });
  }

  getStatusList() {
    this.customerRepository.getStatusList().subscribe(res => {
      if (res) {
        this.statusList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

}
