import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-order-detail',
  templateUrl: './goods-issue-detail.component.html',
  styleUrls: ['./goods-issue-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsIssueDetailComponent implements OnInit {
  pageTitle = translate('goodsIssue.detail.header.title');
  fileNameList: Array<any> = []
  tableTemp = [
    {
      total: 100000,
      type: 1,
    },
    {
      total: 2000000,
      type: 2,
    },
    {
      total: 2000000,
      type: 3,
    }
  ]

  displayBatches: boolean = false;
  displayCDA: boolean = false;
  displayAmount: boolean = false;
  displaydeliveryOrder: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  readURL(event: any) {
    for(const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  showBatches() {
    this.displayBatches = true;
  }

  showCDA() {
    this.displayCDA = true;
  }

  showAmount() {
    this.displayAmount = true;
  }

  showdeliveryOrder() {
    this.displaydeliveryOrder = true;
  }

  backToList() {
    this.router.navigate(['/inventory/issue/delivery-order/delivery-order-list']);
  }
}
