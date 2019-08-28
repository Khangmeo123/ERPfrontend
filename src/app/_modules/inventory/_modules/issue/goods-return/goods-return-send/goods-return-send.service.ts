import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Entities } from 'src/app/_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { GoodsReturnSendRepository } from './goods-return-send.repository';
import { SpinnerService } from 'src/app/_services';
import { translate } from 'src/app/_helpers/string';
import {GoodsReturn} from '../../../../_backend/goods-return/goods-return.entity';
import {GoodsReturnForm} from '../../../../_backend/goods-return/goods-return.form';

@Injectable()

export class GoodsReturnSendService {
    public goodsReturnForm: BehaviorSubject<FormGroup>;
    public employeeDetailList: BehaviorSubject<Entities>;
    public inventoryOrganizationList: BehaviorSubject<Entities>;
    public unitOfMeasureList: BehaviorSubject<Entities>;
    constructor(
        private fb: FormBuilder,
        private toastrService: ToastrService,
        private goodsReturnSendRepository: GoodsReturnSendRepository,
        private spinnerService: SpinnerService,
    ) {
        this.goodsReturnForm = new BehaviorSubject(this.fb.group(new GoodsReturnForm()));
        this.employeeDetailList = new BehaviorSubject(new Entities());
        this.unitOfMeasureList = new BehaviorSubject(new Entities());
        this.inventoryOrganizationList = new BehaviorSubject(new Entities());
    }

    public getDetail = (id: string): Promise<GoodsReturn> => {
        return new Promise<GoodsReturn>((resolve, reject) => {
            return this.goodsReturnSendRepository.getDetail(id)
                .subscribe(
                    (goodsReturn: GoodsReturn) => {
                        this.goodsReturnForm.next(
                            this.fb.group(
                                new GoodsReturnForm(goodsReturn),
                            ),
                        );
                        resolve(goodsReturn);
                    },
                    (error: Error) => {
                        this.toastrService.error(translate('goodsReceiptPODetail.get.error'));
                        reject(error);
                    },
                );
        });
    };
}
