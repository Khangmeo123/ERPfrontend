import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-detail.component.html',
  styleUrls: ['./return-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReturnDetailComponent implements OnInit {
  pageTitle = translate('return.detail.header.title');
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
  displayReturn: boolean = false;

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

  showReturn() {
    this.displayReturn = true;
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/goods-receipt-po/goods-receipt-po-list']);
  }
}
