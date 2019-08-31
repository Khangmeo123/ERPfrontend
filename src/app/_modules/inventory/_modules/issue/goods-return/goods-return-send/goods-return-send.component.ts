import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GoodsReturnSendService } from './goods-return-send.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { GoodsReturnSendRepository } from './goods-return-send.repository';
import { ItemDetailOfGoodsReturnSearch, UnitOfMeasureOfGoodsReturnSearch, InventoryOrganizationOfGoodsReturnSearch, RequesterOfGoodsReturnSearch } from 'src/app/_modules/inventory/_backend/goods-return/goods-return.searchentity';


@Component({
  selector: 'app-goods-return-detail',
  templateUrl: './goods-return-send.component.html',
  styleUrls: ['./goods-return-send.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [GoodsReturnSendService]
})
export class GoodsReturnSendComponent implements OnInit, OnDestroy {
  pageTitle = translate('GoodsReturn.detail.header.title');
  fileNameList: Array<any> = [];

  goodsReturnForm: FormGroup;
  goodsReturnId: string = null;
  goodsReturnSubs: Subscription = new Subscription();

  // goodsReturnContentSearch: GoodsReturnContentsSearch = new GoodsReturnContentsSearch();
  itemDetailSearch: ItemDetailOfGoodsReturnSearch = new ItemDetailOfGoodsReturnSearch();
  unitOfMeasureSearch: UnitOfMeasureOfGoodsReturnSearch = new UnitOfMeasureOfGoodsReturnSearch();

  // inventoryOrganization:
  inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsReturnSearch = new InventoryOrganizationOfGoodsReturnSearch();
  requesterSearchEntity: RequesterOfGoodsReturnSearch = new RequesterOfGoodsReturnSearch();
  ownerSearchEntity: RequesterOfGoodsReturnSearch = new RequesterOfGoodsReturnSearch();

  displayBatches: boolean = false;
  displaySerial: boolean = false;
  displayAmount: boolean = false;
  displaydeliveryOrder: boolean = false;

  constructor(
    private generalService: GeneralService,
    private GoodsReturnDetailService: GoodsReturnSendService,
    private activatedRoute: ActivatedRoute,
    private GoodsReturnDetailRepository: GoodsReturnSendRepository,
    private router: Router) {
      const activatedRouteSubscription: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
        if (params.id) {
          this.goodsReturnId = params.id;
          // this.GoodsReturnDetailService.getDetail(params.id)
          //   .then(() => {
          //     this.supplierContactSearchEntity.supplierDetailId = this.supplierDetailId.value;
          //   });
        }
      });

      const goodsReturnFormSub = this.GoodsReturnDetailService.goodsReturnForm.subscribe(res => {
        if (res) {
          this.goodsReturnForm = res;
        }
      });

      this.goodsReturnSubs.add(activatedRouteSubscription).add(goodsReturnFormSub);
    }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }


  readURL(event: any) {
    for(const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  showBatches() {
    this.displayBatches = true;
  }

  showSerial() {
    this.displaySerial = true;
  }

  showAmount() {
    this.displayAmount = true;
  }

  showdeliveryOrder() {
    this.displaydeliveryOrder = true;
  }

  backToList() {
    this.router.navigate(['/inventory/issue/goods-return/goods-return-list']);
  }

  save() {
    // if (!this.GoodsReturnForm.valid) {
    //   this.generalService.validateAllFormFields(this.GoodsReturnForm);
    // } else {
    //   this.GoodsReturnDetailService.save(this.GoodsReturnForm.value).then(res => {
    //     this.backToList();
    //   });
    // }
  }

  send() {
    // if (!this.GoodsReturnForm.valid) {
    //   this.generalService.validateAllFormFields(this.GoodsReturnForm);
    // } else {
    //   this.GoodsReturnDetailService.send(this.GoodsReturnForm.value).then(res => {
    //     this.backToList();
    //   });
    // }
  }

  onSelectInventoryOrganization(event) {
    this.goodsReturnForm.patchValue({
      inventoryOrganizationId: event.id,
      inventoryOrganizationCode: event.code,
      inventoryOrganizationStreet: event.address,
    });
  }

  onSelectOwner(event) {
    this.goodsReturnForm.patchValue({
      ownerId: event.id,
      ownerName: event.name,
    });
  }

  deleteItem() {
  }
}
