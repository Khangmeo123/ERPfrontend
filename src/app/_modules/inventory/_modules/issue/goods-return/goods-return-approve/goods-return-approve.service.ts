import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Entities } from 'src/app/_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { GoodsReturnApproveRepository } from './goods-return-approve.repository';
import { SpinnerService } from 'src/app/_services';
import { translate } from 'src/app/_helpers/string';
import { GoodsReturnForm } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.form';
import { GoodsReturn } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.entity';

@Injectable()

export class GoodsReturnApproveService {
  public goodsReturnForm: BehaviorSubject<FormGroup>;
  public employeeDetailList: BehaviorSubject<Entities>;
  public inventoryOrganizationList: BehaviorSubject<Entities>;
  public unitOfMeasureList: BehaviorSubject<Entities>;
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private goodsReturnDetailRepository: GoodsReturnApproveRepository,
    private spinnerService: SpinnerService,
  ) {
    this.goodsReturnForm = new BehaviorSubject(this.fb.group(new GoodsReturnForm()));
    this.employeeDetailList = new BehaviorSubject(new Entities());
    this.unitOfMeasureList = new BehaviorSubject(new Entities());
    this.inventoryOrganizationList = new BehaviorSubject(new Entities());
  }

  approve = (goodsReturnId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReturnDetailRepository.approve(goodsReturnId).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
          resolve();
        }
      }, err => {
        if (err) {
          reject();
          console.log(err);
        }
      });
    });
  };

  reject = (goodsReturnId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReturnDetailRepository.reject(goodsReturnId).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
          resolve();
        }
      }, err => {
        if (err) {
          reject();
          console.log(err);
        }
      });
    });
  };

  public getDetail = (id: string): Promise<GoodsReturn> => {
    return new Promise<GoodsReturn>((resolve, reject) => {
      return this.goodsReturnDetailRepository.getDetail(id)
        .subscribe(
          (goodsReturnEntity: GoodsReturn) => {
            this.goodsReturnForm.next(
              this.fb.group(
                new GoodsReturnForm(goodsReturnEntity),
              ),
            );
            resolve(goodsReturnEntity);
          },
          (error: Error) => {
            this.toastrService.error(translate('goodsReceiptPODetail.get.error'));
            reject(error);
          },
        );
    });
  };
}
