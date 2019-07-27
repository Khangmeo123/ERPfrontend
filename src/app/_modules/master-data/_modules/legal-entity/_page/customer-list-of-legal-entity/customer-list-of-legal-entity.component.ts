import { Component, OnInit } from '@angular/core';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { BookmarkService } from '../../../../../../_services';
import { Router } from '@angular/router';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { CustomerOfLegalEntityService } from './customer-list-of-legal-entity.service';
import { Subscription } from 'rxjs';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';

@Component({
  selector: 'app-customer-list-of-legal-entity',
  templateUrl: './customer-list-of-legal-entity.component.html',
  styleUrls: ['./customer-list-of-legal-entity.component.scss']
})
export class CustomerListOfLegalEntityComponent implements OnInit {

  pageTitle = _('customerOfLegalEntity.header.title');
  pagination = new PaginationModel();
  paginationdetail = new PaginationModel();
  display: boolean = false;
  isAddGroup = false;

  isAddCustomer = false;
  isSaveBookMark: boolean = false;
  bookMarkId: string;

  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  legalList: LegalEntity[];
  customerSearchEntity: CustomerSearchEntity = new CustomerSearchEntity();
  customerList: CustomerEntity[];

  legalSubs: Subscription = new Subscription();
  legalId: string;

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
    private customerOfLegalEntityService: CustomerOfLegalEntityService,
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router) {
    const legalListSub = this.customerOfLegalEntityService.legalEntityList.subscribe(res => {
      if (res) {
        this.legalList = res;
      }
    });
    const legalListCountSub = this.customerOfLegalEntityService.legalEntityCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });

    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.legalSubs.add(legalListSub).add(legalListCountSub).add(bookMarkNotify);

  }


  ngOnInit() {
    this.legalSearchEntity.skip = this.pagination.skip;
    this.legalSearchEntity.take = this.pagination.take;
  }


 

  // table legal
  toDetail(legalId) {
    this.legalId = legalId;
    this.customerSearchEntity.legalEntityId = legalId;
    this.getListCustomer(this.customerSearchEntity);
  }

  sortLegalEntiy(event) {
    if (event.sortField && event.sortOrder) {
      this.legalSearchEntity.orderBy = event.sortField;
      this.legalSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.customerOfLegalEntityService.getListLegal(this.legalSearchEntity).then(res =>{
      this.customerSearchEntity.legalEntityId.equal = this.legalList[0].id;
      this.legalId = this.customerSearchEntity.legalEntityId.equal;
      this.customerOfLegalEntityService.getListCustomer(this.customerSearchEntity);
    });
  }

  clearSearch() {

  }

  // table customer

  getListCustomer(customer) {
    this.paginationdetail.pageNumber = 1;
    this.customerSearchEntity.skip = 0;
    this.customerSearchEntity.take = this.paginationdetail.take;
    this.customerOfLegalEntityService.getListCustomer(this.customerSearchEntity);
  }

  onClickShowDetail(customerId) {
    this.router.navigate(['/master-data/legal-entity/customer-detail'], {queryParams: {id: customerId}});
  }

  showDialog() {
    this.display = true;
  }

  sort(event) {

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
