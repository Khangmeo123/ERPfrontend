import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Entities } from 'src/app/_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { GoodsIssueDetailRepository } from './goods-issue-detail.repository';
import { SpinnerService } from 'src/app/_services';
import { GoodsIssueForm } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.form';
import { translate } from 'src/app/_helpers/string';
import { GoodsIssue } from 'src/app/_modules/inventory/_backend/goods-issue/goods-issue.entity';

@Injectable()

export class GoodsIssueDetailService {
    public goodsIssueForm: BehaviorSubject<FormGroup>;
    public employeeDetailList: BehaviorSubject<Entities>;
    public inventoryOrganizationList: BehaviorSubject<Entities>;
    public unitOfMeasureList: BehaviorSubject<Entities>;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private goodsIssueDetailRepository: GoodsIssueDetailRepository,
        private spinnerService: SpinnerService,
    ) {
        this.goodsIssueForm = new BehaviorSubject(this.fb.group(new GoodsIssueForm()));
        this.employeeDetailList = new BehaviorSubject(new Entities());
        this.unitOfMeasureList = new BehaviorSubject(new Entities());
        this.inventoryOrganizationList = new BehaviorSubject(new Entities());
    }


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
