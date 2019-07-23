import { EnumEntity } from './../../../../../../../_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { SupplierListRepository } from './supplier-list.repository';
import { SupplierEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.entity';
import { SupplierSearchEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.searchentity';

@Injectable()
export class SupplierListService {
  public supplierList: BehaviorSubject<SupplierEntity[]>;
  public supplierCount: BehaviorSubject<number>;
  public statusList: BehaviorSubject<EnumEntity[]>;
  constructor(private supplierRepository: SupplierListRepository, private toastrService: ToastrService) {
    this.supplierList = new BehaviorSubject([]);
    this.supplierCount = new BehaviorSubject(0);
    this.statusList = new BehaviorSubject([]);
  }

  getList(supplierSearchEntity: SupplierSearchEntity) {
    forkJoin(this.supplierRepository.getList(supplierSearchEntity),
      this.supplierRepository.count(supplierSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.supplierList.next(list);
        }
        if (count) {
          this.supplierCount.next(count);
        }
      });
  }

  getStatusList() {
    this.supplierRepository.getStatusList().subscribe(res => {
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
