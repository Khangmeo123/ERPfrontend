import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-order-detail',
  templateUrl: './goods-return-request-detail.component.html',
  styleUrls: ['./goods-return-request-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReturnRequestDetailComponent implements OnInit {
  pageTitle = translate('goodsReturnRequest.header.title');
  fileNameList: Array<any> = [];
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

  displayGoodsReturnRequest: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  readURL(event: any) {
    for(const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }

  showGoodsReturnRequest() {
    this.displayGoodsReturnRequest = true;
  }

  backToList() {
    this.router.navigate(['/inventory/issue/goods-return-request/goods-return-request-list']);
  }
}
