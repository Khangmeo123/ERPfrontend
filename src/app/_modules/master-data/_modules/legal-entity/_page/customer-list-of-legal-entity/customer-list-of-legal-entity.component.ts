import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import {BookmarkService} from '../../../../../../_services';
import {Router} from '@angular/router';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import {LegalSearchEntity} from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import {LegalEntity} from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import {CustomerOfLegalEntityService} from './customer-list-of-legal-entity.service';
import {Subscription, Subject} from 'rxjs';
import {CustomerSearchEntity} from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import {CustomerEntity} from 'src/app/_modules/master-data/_backend/customer/customer.entity';
import {translate} from 'src/app/_helpers/string';
import {environment} from 'src/environments/environment';

@Component({
  selector: 'app-customer-list-of-legal-entity',
  templateUrl: './customer-list-of-legal-entity.component.html',
  styleUrls: ['./customer-list-of-legal-entity.component.scss'],
  providers: [CustomerOfLegalEntityService],
})
export class CustomerListOfLegalEntityComponent implements OnInit {

  pageTitle = translate('customerOfLegalEntity.header.title');
  pagination = new PaginationModel();
  paginationdetail = new PaginationModel();
  display: boolean = false;
  selectedList: any;
  isAddGroup = false;

  isAddCustomer = false;
  isSaveBookMark: boolean = false;
  bookMarkId: string;

  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  legalList: LegalEntity[];
  customerSearchEntity: CustomerSearchEntity = new CustomerSearchEntity();
  customerList: CustomerEntity[];

  legalSubs: Subscription = new Subscription();
  legalId: string = null;
  customerIds: CustomerEntity[];
  customerExceptIds: CustomerEntity[];
  customerTyping: Subject<CustomerSearchEntity> = new Subject();
  listCustomerId: Array<any> = [];

  exportLink = environment.apiUrlApps + 'master-data/legal-entity/customer-of-legal-entity/export?legalEntityId=';
  @ViewChild('tableCustomer', {static: false}) public tableCustomer: TemplateRef<any>;


  constructor(
    private customerOfLegalEntityService: CustomerOfLegalEntityService,
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router) {
    const legalListSub = this.customerOfLegalEntityService.legalEntityList.subscribe(res => {
      if (res) {
        this.legalList = res;
        this.selectedList = res[0];
      }
    });
    const legalListCountSub = this.customerOfLegalEntityService.legalEntityCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    const customerListSub = this.customerOfLegalEntityService.customerList.subscribe(res => {
      if (res) {
        this.customerList = res;
      }
    });
    const customerListCountSub = this.customerOfLegalEntityService.customerCount.subscribe(res => {
      if (res) {
        this.paginationdetail.totalItems = res;
      }
    });

    const customerOfLegalListSub = this.customerOfLegalEntityService.customerListOflegalEntity.subscribe(res => {
      console.log(res);
      if (res) {
        this.customerIds = res.ids;
        this.customerExceptIds = res.exceptIds;
      }
    });


    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });

    this.customerOfLegalEntityService.getListCustomerOfLegalEntityByTyping(this.customerTyping);
    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});
    this.legalSubs.add(legalListSub).add(legalListCountSub).add(bookMarkNotify).add(customerListSub)
      .add(customerListCountSub).add(customerOfLegalListSub);

  }


  ngOnInit() {
    this.legalSearchEntity.skip = this.pagination.skip;
    this.legalSearchEntity.take = this.pagination.take;

    this.customerSearchEntity.skip = this.paginationdetail.skip;
    this.customerSearchEntity.take = this.paginationdetail.take;
  }


  openCustomerList(id: string[]) {
    this.customerSearchEntity = new CustomerSearchEntity();
    this.customerSearchEntity.ids = id;
    if (this.legalId !== '' && this.legalId !== undefined) {
      this.customerSearchEntity.legalEntityId = this.legalId;
    }
    this.customerOfLegalEntityService.getListCustomerOflegalEntity(this.customerSearchEntity);
  }

  customerSearch(event) {
    this.customerSearchEntity.code.startsWith = event;
    this.customerSearchEntity.name.startsWith = event;
    this.customerTyping.next(this.customerSearchEntity);
  }

  selectCustomer(event) {
    this.listCustomerId = event;
  }

  // table legal
  getListLegalEntity() {
    this.pagination.pageNumber = 1;
    this.legalSearchEntity.skip = 0;
    this.legalSearchEntity.take = this.pagination.take;
    this.customerOfLegalEntityService.getListLegal(this.legalSearchEntity).then(res => {
      if (this.legalList && this.legalList.length > 0) {
        this.customerSearchEntity.legalEntityId = this.legalList[0].id;
      } else {
        this.customerSearchEntity.legalEntityId = '';
      }

      this.customerOfLegalEntityService.getListCustomer(this.customerSearchEntity);
    });
  }

  toDetail(legalId) {
    this.legalId = legalId;
    this.customerSearchEntity.legalEntityId = legalId;
    this.getListCustomer(this.customerSearchEntity);
  }

  sortLegalEntiy(event) {
    if (event.sortField && event.sortOrder) {
      this.legalSearchEntity.orderBy = event.sortField;
      this.legalSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.customerOfLegalEntityService.getListLegal(this.legalSearchEntity).then(res => {
      if (this.legalList && this.legalList.length > 0) {
        this.customerSearchEntity.legalEntityId = this.legalList[0].id;
        this.legalId = this.customerSearchEntity.legalEntityId;
        this.customerOfLegalEntityService.getListCustomer(this.customerSearchEntity);
      }
    });
  }

  paginationOut(pagination: PaginationModel) {
    this.legalSearchEntity.skip = pagination.skip;
    this.legalSearchEntity.take = pagination.take;
    this.customerOfLegalEntityService.getListLegal(this.legalSearchEntity);
  }

  clearSearch(table: any) {
    this.legalSearchEntity = new LegalSearchEntity();
    table.reset();
  }

  // table customer

  onClickAddCustomer() {
    this.customerSearchEntity.customerDetailIds = this.listCustomerId;
    this.customerSearchEntity.legalEntityId = this.legalId;
    this.customerOfLegalEntityService.saveCustomer(this.customerSearchEntity)
      .then(res => {
        this.customerIds = [];
        this.customerOfLegalEntityService.getListCustomer(this.customerSearchEntity);
      })
      .catch(err => {
      });
  }

  getListCustomer(customer) {
    this.paginationdetail.pageNumber = 1;
    this.customerSearchEntity.skip = 0;
    this.customerSearchEntity.take = this.paginationdetail.take;
    this.customerOfLegalEntityService.getListCustomer(this.customerSearchEntity);
  }

  onClickShowDetail(customerId: string) {
    this.router.navigate(['/master-data/legal-entity/customer-of-legal-entity/customer-detail'],
      {queryParams: {id: customerId, legalEntityId: this.legalId}});
  }

  deleteCustomerFormLegal(customer: any) {
    this.customerOfLegalEntityService.delete(customer).then(res => {
      if (res) {
        this.clearSearchCustomer(this.tableCustomer);
        this.customerOfLegalEntityService.getListCustomer(this.customerSearchEntity);
      }
    });
  }

  showDialog() {
    this.display = true;
  }

  sort(event) {
    if (event.sortField && event.sortOrder) {
      this.customerSearchEntity.orderBy = event.sortField;
      this.customerSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }

    if (this.customerSearchEntity.legalEntityId !== '') {
      this.getListCustomer(this.customerSearchEntity);
    }
  }

  paginationDetailOut(pagination: PaginationModel) {
    this.customerSearchEntity.skip = pagination.skip;
    this.customerSearchEntity.take = pagination.take;
    this.customerOfLegalEntityService.getListCustomer(this.customerSearchEntity);
  }

  clearSearchCustomer(tableCustomer: any) {
    this.customerSearchEntity = new CustomerSearchEntity();
    this.customerSearchEntity.legalEntityId = this.legalId;
    tableCustomer.reset();
  }

  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({name: this.pageTitle, route: this.router.url});
    } else {
      this.bookmarkService.deleteBookMarks({name: this.pageTitle, route: this.router.url});
    }
  }

}
