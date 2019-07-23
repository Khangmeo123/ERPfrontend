import { ToastrService } from 'ngx-toastr';
import { SupplierForm } from './../../../../../_backend/supplier/supplier.form';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { SupplierDetailRepository } from './supplier-detail.repository';
import { Entities, EnumEntity } from 'src/app/_helpers/entity';
import { environment } from 'src/environments/environment';

@Injectable()
export class SupplierDetailService {
  public supplierForm: BehaviorSubject<FormGroup>;
  public statusList: BehaviorSubject<EnumEntity[]>;
  constructor(private fb: FormBuilder, private supplierDetailRepository: SupplierDetailRepository,
    private toastrService: ToastrService) {
    this.supplierForm = new BehaviorSubject(this.fb.group(
      new SupplierForm(),
    ));
    this.statusList = new BehaviorSubject([]);
  }

  getId(supplierId?) {
    if (supplierId === null || supplierId === undefined) {
      this.supplierForm.next(this.fb.group(
        new SupplierForm(),
      ));
    } else {
      this.supplierDetailRepository.getId(supplierId).subscribe(res => {
        if (res) {
          this.supplierForm.next(this.fb.group(
            new SupplierForm(res),
          ));
        }
      }, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  save(supplierEntity: any): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (supplierEntity.id === null || supplierEntity.id === undefined || supplierEntity.id === environment.emtyGuid) {
        this.supplierDetailRepository.add(supplierEntity).subscribe(res => {
          if (res) {
            this.toastrService.success('Cập nhật thành công !');
            resolve();
          }
        }, err => {
          if (err) {
            this.supplierForm.next(this.fb.group(
              new SupplierForm(err),
            ));
          }
        });
      } else {
        this.supplierDetailRepository.update(supplierEntity).subscribe(res => {
          if (res) {
            this.toastrService.success('Cập nhật thành công !');
            resolve();
          }
        }, err => {
          if (err) {
            this.supplierForm.next(this.fb.group(
              new SupplierForm(err),
            ));
          }
        });
      }
    });
    return defered;
  }

  delete(supplierEntity: any): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.supplierDetailRepository.delete(supplierEntity).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
          resolve();
        }
      }, err => {
        if (err) {
          this.supplierForm.next(this.fb.group(
            new SupplierForm(err),
          ));
        }
      });
    });
    return defered;
  }

  getStatusList() {
    this.supplierDetailRepository.getStatusList().subscribe(res => {
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
