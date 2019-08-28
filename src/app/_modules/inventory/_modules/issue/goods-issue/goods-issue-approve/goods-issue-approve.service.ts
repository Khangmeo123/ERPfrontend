import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Entities } from 'src/app/_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { GoodsIssueApproveRepository } from './goods-issue-approve.repository';
import { SpinnerService } from 'src/app/_services';
import { GoodsIssueForm } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.form';
import { translate } from 'src/app/_helpers/string';
import { GoodsIssue } from '../../../../_backend/goods-issue/goods-issue.entity';

@Injectable()

export class GoodsIssueApproveService {
  public goodsIssueForm: BehaviorSubject<FormGroup>;
  public employeeDetailList: BehaviorSubject<Entities>;
  public inventoryOrganizationList: BehaviorSubject<Entities>;
  public unitOfMeasureList: BehaviorSubject<Entities>;
  constructor(
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private goodsIssueDetailRepository: GoodsIssueApproveRepository,
    private spinnerService: SpinnerService,
  ) {
    this.goodsIssueForm = new BehaviorSubject(this.fb.group(new GoodsIssueForm()));
    this.employeeDetailList = new BehaviorSubject(new Entities());
    this.unitOfMeasureList = new BehaviorSubject(new Entities());
    this.inventoryOrganizationList = new BehaviorSubject(new Entities());
  }

  approve = (goodsIssueId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsIssueDetailRepository.approve(goodsIssueId).subscribe(res => {
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

  reject = (goodsIssueId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsIssueDetailRepository.reject(goodsIssueId).subscribe(res => {
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

  public getDetail = (id: string): Promise<GoodsIssue> => {
    return new Promise<GoodsIssue>((resolve, reject) => {
      return this.goodsIssueDetailRepository.getDetail(id)
        .subscribe(
          (goodsIssueEntity: GoodsIssue) => {
            this.goodsIssueForm.next(
              this.fb.group(
                new GoodsIssueForm(goodsIssueEntity),
              ),
            );
            resolve(goodsIssueEntity);
          },
          (error: Error) => {
            this.toastrService.error(translate('goodsReceiptPODetail.get.error'));
            reject(error);
          },
        );
    });
  };
}
