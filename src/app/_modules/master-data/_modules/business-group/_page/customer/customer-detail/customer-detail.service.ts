import { ToastrService } from 'ngx-toastr';
import { CustomerForm } from './../../../../../_backend/customer/customer.form';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { CustomerDetailRepository } from './customer-detail.repository';
import { Entities, EnumEntity } from 'src/app/_helpers/entity';
import { environment } from 'src/environments/environment';

@Injectable()
export class CustomerDetailService {
  public customerForm: BehaviorSubject<FormGroup>;
  public statusList: BehaviorSubject<EnumEntity[]>;
  constructor(private fb: FormBuilder, private customerDetailRepository: CustomerDetailRepository,
    private toastrService: ToastrService) {
    this.customerForm = new BehaviorSubject(this.fb.group(
      new CustomerForm(),
    ));
    this.statusList = new BehaviorSubject([]);
  }

  getId(customerId?) {
    if (customerId !== null && customerId !== undefined) {
      this.customerDetailRepository.getId(customerId).subscribe(res => {
        if (res) {
          this.customerForm.next(this.fb.group(
            new CustomerForm(res),
          ));
        }
      }, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  save(customerEntity: any): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (customerEntity.id === null || customerEntity.id === undefined || customerEntity.id === environment.emptyGuid) {
        this.customerDetailRepository.add(customerEntity).subscribe(res => {
          if (res) {
            this.toastrService.success('Cập nhật thành công !');
            resolve();
          }
        }, err => {
          if (err) {
            this.customerForm.next(this.fb.group(
              new CustomerForm(err),
            ));
          }
        });
      } else {
        this.customerDetailRepository.update(customerEntity).subscribe(res => {
          if (res) {
            this.toastrService.success('Cập nhật thành công !');
            resolve();
          }
        }, err => {
          if (err) {
            this.customerForm.next(this.fb.group(
              new CustomerForm(err),
            ));
          }
        });
      }
    });
    return defered;
  }

  deactivate(customerEntity: any): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.customerDetailRepository.deactivate(customerEntity).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
          resolve();
        }
      }, err => {
        if (err) {
          this.customerForm.next(this.fb.group(
            new CustomerForm(err),
          ));
        }
      });
    });
    return defered;
  }

  getStatusList() {
    this.customerDetailRepository.getStatusList().subscribe(res => {
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
