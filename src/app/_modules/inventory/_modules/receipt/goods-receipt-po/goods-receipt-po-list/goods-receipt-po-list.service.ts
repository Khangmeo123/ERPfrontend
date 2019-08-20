import { EnumEntity } from '../../../../../../_helpers/entity';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {
  EmpoloyeeDetailSearchEntity,
  GoodsReceiptPOSearchEntity,
  InventoryOrganizationSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceiptPOListRepository } from './goods-receipt-po-list.repository';
import { Injectable } from '@angular/core';
import { InventoryOrganizationEntity } from '../../../../_backend/inventory-organization/inventory-organization.entity';
import { EmployeeEntity } from '../../../../../master-data/_backend/employee/employee.entity';

@Injectable()
export class GoodsReceiptPOListService {
  public goodsReceiptPOList: BehaviorSubject<GoodsReceiptPOEntity[]>;

  public goodsReceiptPOCount: BehaviorSubject<number>;

  public requesterList: BehaviorSubject<EmployeeEntity[]> = new BehaviorSubject<EmployeeEntity[]>([]);

  public inventoryOrganizationList: BehaviorSubject<InventoryOrganizationEntity[]> = new BehaviorSubject([]);

  public statusList: BehaviorSubject<EnumEntity[]>;

  constructor(
    private fb: FormBuilder,
    private goodsReceiptPORepository: GoodsReceiptPOListRepository,
    private toastrService: ToastrService,
  ) {
    this.goodsReceiptPOList = new BehaviorSubject([]);
    this.goodsReceiptPOCount = new BehaviorSubject(0);
    this.statusList = new BehaviorSubject([]);
  }

  getList(goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity) {
    forkJoin(this.goodsReceiptPORepository.getList(goodsReceiptPOSearchEntity),
      this.goodsReceiptPORepository.count(goodsReceiptPOSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.goodsReceiptPOList.next(list);
      }
      if (count) {
        this.goodsReceiptPOCount.next(count);
      }
    });
  }

  singleListRequester(goodsReceiptPORequesterSearchEntity: EmpoloyeeDetailSearchEntity) {
    this.goodsReceiptPORepository.singleListRequester(goodsReceiptPORequesterSearchEntity).subscribe(res => {
      if (res) {
        this.requesterList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  singleListInventoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity) {
    this.goodsReceiptPORepository.singleListInventoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity).subscribe(res => {
      if (res) {
        this.inventoryOrganizationList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }


  enumListStatus() {
    this.goodsReceiptPORepository.enumListStatus().subscribe(res => {
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
