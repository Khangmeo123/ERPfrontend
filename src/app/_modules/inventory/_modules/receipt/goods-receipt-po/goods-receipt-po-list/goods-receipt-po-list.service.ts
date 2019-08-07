import { EnumEntity } from './../../../../../../_helpers/entity';
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import {
    GoodsReceiptPOEntity,
    GoodsReceiptPORequesterEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { Entities } from 'src/app/_helpers/entity';
import {
    GoodsReceiptPOSearchEntity, GoodsReceiptPORequesterSearchEntity,
    GoodsReceiptPOInventoryOrganizationSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceiptPORepository } from './goods-receipt-po-list.repository';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

export class GoodsReceiptPOService {
    public goodsReceiptPOList: BehaviorSubject<GoodsReceiptPOEntity[]>;
    public goodsReceiptPOCount: BehaviorSubject<number>;
    public requesterList: BehaviorSubject<Entities>;
    public inventoryOrganizationList: BehaviorSubject<Entities>;
    public statusList: BehaviorSubject<EnumEntity[]>;
    constructor(
        private fb: FormBuilder,
        private goodsReceiptPORepository: GoodsReceiptPORepository,
        private toastrService: ToastrService,
    ) {
        this.goodsReceiptPOList = new BehaviorSubject([]);
        this.goodsReceiptPOCount = new BehaviorSubject(0);
        this.requesterList = new BehaviorSubject(new Entities());
        this.inventoryOrganizationList = new BehaviorSubject(new Entities());
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

    dropListRequester(goodsReceiptPOListRequesterSearchEntity: GoodsReceiptPORequesterSearchEntity) {
        this.goodsReceiptPORepository.dropListRequester(goodsReceiptPOListRequesterSearchEntity).subscribe(res => {
            if (res) {
                this.requesterList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchRequester(goodsReceiptPOListRequesterSearchEntity: Observable<GoodsReceiptPORequesterSearchEntity>) {
        goodsReceiptPOListRequesterSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListRequester(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.requesterList.next(res);
                }
            });
    }

    dropListInvetoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity: GoodsReceiptPOInventoryOrganizationSearchEntity) {
        this.goodsReceiptPORepository.dropListRequester(goodsReceiptPOInventoryOrganizationSearchEntity).subscribe(res => {
            if (res) {
                this.requesterList.next(res);
            }
        }, err => {
            if (err) {
                console.log(err);
            }
        });
    }

    typingSearchInvetoryOrganization(goodsReceiptPOInventoryOrganizationSearchEntity:
        Observable<GoodsReceiptPOInventoryOrganizationSearchEntity>) {
        goodsReceiptPOInventoryOrganizationSearchEntity.pipe(debounceTime(400),
            distinctUntilChanged(),
            switchMap(searchEntity => {
                return this.goodsReceiptPORepository.dropListRequester(searchEntity);
            })).subscribe(res => {
                if (res) {
                    this.requesterList.next(res);
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
