import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { Router } from '@angular/router';

@Component({
  selector: 'app-return-detail',
  templateUrl: './return-request-detail.component.html',
  styleUrls: ['./return-request-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReturnRequestDetailComponent implements OnInit {
  pageTitle = translate('returnRequest.header.title');
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

  displayReturnRequest: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {
  }


  readURL(event: any) {
    for(const item of event.srcElement.files) {
      this.fileNameList.push(item.name);
    }
  }
  showReturnRequest() {
    this.displayReturnRequest = true;
  }

  backToList() {
    this.router.navigate(['/inventory/receipt/return-request/return-request-detail']);
  }
}
