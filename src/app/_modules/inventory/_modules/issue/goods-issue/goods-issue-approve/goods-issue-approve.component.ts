import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GoodsIssueApproveService } from './goods-issue-approve.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { GoodsIssueApproveRepository } from './goods-issue-approve.repository';
import {
  GoodsIssueContentsSearch, InventoryOrganizationOfGoodsIssueSearch,
  ItemDetailOfGoodsIssueSearch, RequesterOfGoodsIssueSearch,
  UnitOfMeasureOfGoodsIssueSearch
} from '../../../../_backend/goods-issue/goods-issue.searchentity';

@Component({
  selector: 'app-delivery-order-detail',
  templateUrl: './goods-issue-approve.component.html',
  styleUrls: ['./goods-issue-approve.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [GoodsIssueApproveService]
})
export class GoodsIssueApproveComponent implements OnInit, OnDestroy {
  pageTitle = translate('goodsIssue.detail.header.title');
  fileNameList: Array<any> = [];

  goodsIssueForm: FormGroup;
  goodsIssueId: string = null;
  goodsIssueSubs: Subscription = new Subscription();

  goodsIssueContentSearch: GoodsIssueContentsSearch = new GoodsIssueContentsSearch();
  itemDetailSearch: ItemDetailOfGoodsIssueSearch = new ItemDetailOfGoodsIssueSearch();
  unitOfMeasureSearch: UnitOfMeasureOfGoodsIssueSearch = new UnitOfMeasureOfGoodsIssueSearch();

  // inventoryOrganization:
  inventoryOrganizationSearchEntity: InventoryOrganizationOfGoodsIssueSearch = new InventoryOrganizationOfGoodsIssueSearch();
  requesterSearchEntity: RequesterOfGoodsIssueSearch = new RequesterOfGoodsIssueSearch();
  ownerSearchEntity: RequesterOfGoodsIssueSearch = new RequesterOfGoodsIssueSearch();

  displayBatches: boolean = false;
  displaySerial: boolean = false;
  displayAmount: boolean = false;
  displaydeliveryOrder: boolean = false;

  constructor(
    private generalService: GeneralService,
    private goodsIssueDetailService: GoodsIssueApproveService,
    private activatedRoute: ActivatedRoute,
    private goodsIssueDetailRepository: GoodsIssueApproveRepository,
    private router: Router) {
      const activatedRouteSubscription: Subscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
        if (params.id) {
          this.goodsIssueId = params.id;
          // this.goodsIssueDetailService.getDetail(params.id)
          //   .then(() => {
          //     this.supplierContactSearchEntity.supplierDetailId = this.supplierDetailId.value;
          //   });
        }
      });

      const goodsIssueFormSub = this.goodsIssueDetailService.goodsIssueForm.subscribe(res => {
        if (res) {
          this.goodsIssueForm = res;
        }
      });

      this.goodsIssueSubs.add(activatedRouteSubscription).add(goodsIssueFormSub);
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
    this.router.navigate(['/inventory/issue/goods-issue/goods-issue-list']);
  }

  save() {
    // if (!this.goodsIssueForm.valid) {
    //   this.generalService.validateAllFormFields(this.goodsIssueForm);
    // } else {
    //   this.goodsIssueDetailService.save(this.goodsIssueForm.value).then(res => {
    //     this.backToList();
    //   });
    // }
  }

  send() {
    // if (!this.goodsIssueForm.valid) {
    //   this.generalService.validateAllFormFields(this.goodsIssueForm);
    // } else {
    //   this.goodsIssueDetailService.send(this.goodsIssueForm.value).then(res => {
    //     this.backToList();
    //   });
    // }
  }

  onSelectInventoryOrganization(event) {
    this.goodsIssueForm.patchValue({
      inventoryOrganizationId: event.id,
      inventoryOrganizationCode: event.code,
      inventoryOrganizationStreet: event.address,
    });
  }

  onSelectOwner(event) {
    this.goodsIssueForm.patchValue({
      ownerId: event.id,
      ownerName: event.name,
    });
  }

  deleteItem() {
  }
}
