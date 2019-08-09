import { Subscription, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute } from '@angular/router';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { GoodsReceiptPOApproveService } from './goods-receipt-po-approve.service';
@Component({
  selector: 'app-goods-receipt-po-detail',
  templateUrl: './goods-receipt-po-detail.component.html',
  styleUrls: ['./goods-receipt-po-detail.component.scss'],
  providers: [GoodsReceiptPOApproveService],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptPOApproveComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsReceiptPODetail.header.title');
  fileNameList: Array<any> = [];
  displayBatches: boolean = false;
  displayCDA: boolean = false;
  displayAmount: boolean = false;
  displayPurchseOrders: boolean = false;
  goodsReceiptPOSubs: Subscription = new Subscription();
  goodsReceiptPOForm: FormGroup;
  deletedList: number[] = [];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  supplierDetailId: string;
  goodsReceiptPOId: string;

  constructor(
    private goodsReceiptPOService: GoodsReceiptPOApproveService,
    private generalService: GeneralService,
    private route: ActivatedRoute,
    private router: Router) {

    this.route.queryParams
      .subscribe(params => {
        if (params.id) {
          this.goodsReceiptPOId = params.id;
        }
        this.goodsReceiptPOService.getDetail(params.id).then(res => {
          this.supplierDetailId = this.goodsReceiptPOForm.controls.supplierDetailId.value;
        });
      });

    const goodsReceiptFormSub = this.goodsReceiptPOService.goodsReceiptPOForm.subscribe(res => {
      if (res) {
        this.goodsReceiptPOForm = res;
      }
    });

    // add subcription:
    this.goodsReceiptPOSubs.add(goodsReceiptFormSub);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.goodsReceiptPOSubs.unsubscribe();
  }

  // general:
  trackByFn(index, row) {
    return index;
  }

  readURL(event: any) {
    for (const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);
  }

}
