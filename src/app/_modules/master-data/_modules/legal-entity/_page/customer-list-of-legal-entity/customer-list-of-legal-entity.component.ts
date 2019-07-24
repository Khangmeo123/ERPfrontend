import { Component, OnInit } from '@angular/core';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {BookmarkService} from '../../../../../../_services';
import {Router} from '@angular/router';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  selector: 'app-customer-list-of-legal-entity',
  templateUrl: './customer-list-of-legal-entity.component.html',
  styleUrls: ['./customer-list-of-legal-entity.component.scss']
})
export class CustomerListOfLegalEntityComponent implements OnInit {

  pageTitle = _('customerOfLegalEntity.header.title');
  pagination = new PaginationModel();
  display: boolean = false;
  isAddGroup = false;

  isAddCustomer = false;
  isSaveBookMark: boolean = false;

  tmptable = [
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      customerGroup: 'huongnguyenhd96@gmail.com',
      taxCode: 'hihi',
      address: 1,
      phone: '1000000',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      customerGroup: 'huongnguyenhd96@gmail.com',
      taxCode: 'hihi',
      address: 1,
      phone: '1000000',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      customerGroup: 'huongnguyenhd96@gmail.com',
      taxCode: 'hihi',
      address: 1,
      phone: '1000000',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
      customerGroup: 'huongnguyenhd96@gmail.com',
      taxCode: 'hihi',
      address: 1,
      phone: '1000000',
    },

  ]

  constructor(
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router) { }


  ngOnInit() {
  }


  onClickShowDetail() {
    this.router.navigate(['/master-data/legal-entity/customer-list-of-legal-entity/detail-customer-legal-entity']);
  }

  showDialog() {
    this.display = true;
  }

  sort (event) {

  }

  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }

}
