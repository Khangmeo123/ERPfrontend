import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { BookmarkService } from 'src/app/_services';
import { translate } from 'src/app/_helpers/string';
import { CustomerGroupSearchEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.searchentity';
import { CustomerGroupEntity } from 'src/app/_modules/master-data/_backend/customer-group/customer-group.entity';
import { FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { CustomerGroupService } from './customer-group.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { CustomerEntity } from 'src/app/_modules/master-data/_backend/customer/customer.entity';
import { CustomerSearchEntity } from 'src/app/_modules/master-data/_backend/customer/customer.searchentity';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-customer-group',
  templateUrl: './customer-group.component.html',
  styleUrls: ['./customer-group.component.scss'],
  providers: [CustomerGroupService]
})
export class CustomerGroupComponent implements OnInit, OnDestroy {
  pageTitle: string = translate('customerGroup.header.title');
  isSaveBookMark = false;
  bookMarkId: string;
  display: boolean = false;
  pagination = new PaginationModel();
  paginationdetail = new PaginationModel();

  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  isAddGroup: boolean = false;
  selectedCustomer: any;

  customerGroupSearchEntity: CustomerGroupSearchEntity = new CustomerGroupSearchEntity();
  customerGroupList: CustomerGroupEntity[];
  customerGroupForm: FormGroup;
  customerGroupSubs: Subscription = new Subscription();


  legalEntityIds: LegalEntity[];
  legalEntityExceptIds: LegalEntity[];
  leGalEntityTyping: Subject<LegalSearchEntity> = new Subject();
  legalEntityId: string = null;
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  customerIds: CustomerEntity[];
  customerExceptIds: CustomerEntity[];
  customerTyping: Subject<CustomerSearchEntity> = new Subject();
  customerSearchEntity: CustomerSearchEntity = new CustomerSearchEntity();
  customerDetailList: CustomerEntity[];
  customerDetailSubs: Subscription = new Subscription();

  customerGroupId: any;
  listCustomerId: Array<any> = [];
  exportLink = environment.apiUrlApps +'master-data/legal-entity/customer-group/export?customerGroupId=';
  @ViewChild('tableCustomer', { static: false }) public tableCustomer: TemplateRef<any>;

  constructor(
    private router: Router,
    private bookmarkService: BookmarkService,
    private customerGroupService: CustomerGroupService,
    private genaralService: GeneralService) {

    const customerGroupListSub = this.customerGroupService.customerGroupList.subscribe(res => {
      if (res) {
        this.customerGroupList = res;
        this.selectedCustomer = res[0];
      }
    });

    const customerGroupCountSub = this.customerGroupService.customerGroupCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const legalEntityListSub = this.customerGroupService.legalListDrop.subscribe(res => {
      if (res) {
        this.legalEntityIds = res.ids;
        this.legalEntityExceptIds = res.exceptIds;
      }
    });

    const customerrGroupFormSub = this.customerGroupService.customerGroupForm.subscribe(res => {
      if (res) {
        this.customerGroupForm = res;
      }
    });

    const customerDetailListSub = this.customerGroupService.customerDetailList.subscribe(res => {
      if (res) {
        this.customerDetailList = res;
      }
    });

    const customerDetailCountSub = this.customerGroupService.customerDetailCount.subscribe(res => {
      if (res) {
        this.paginationdetail.totalItems = res;
      }
    });

    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });

    const customerDetaiDrop = this.customerGroupService.customerListDrop.subscribe(res => {
      if (res) {
        this.customerIds = res.ids;
        this.customerExceptIds = res.exceptIds;
      }
    });

    this.customerGroupService.getLisLegalEntityByTyping(this.leGalEntityTyping);
    this.customerGroupService.getListcustomerOfCustomerGroupByTyping(this.customerTyping);
    this.customerGroupSubs.add(legalEntityListSub).add(bookMarkNotify).add(customerGroupListSub)
      .add(customerrGroupFormSub).add(customerDetailListSub).add(customerDetailCountSub).add(customerDetaiDrop).add(customerGroupCountSub);
  }



  ngOnInit() {

    this.customerGroupSearchEntity.skip = this.pagination.skip;
    this.customerGroupSearchEntity.take = this.pagination.take;

    this.customerSearchEntity.skip = this.paginationdetail.skip;
    this.customerSearchEntity.take = this.paginationdetail.take;

  }

  ngOnDestroy() {
    this.customerGroupSubs.unsubscribe();
  }

  // drop legal entity

  openLegalEntityList(legalId: string) {
    this.legalSearchEntity = new LegalSearchEntity();
    if (legalId !== null && legalId !== undefined) {
      this.legalSearchEntity.ids.push(legalId);
    }
    this.customerGroupService.getListLegalEntity(this.legalSearchEntity);
  }
  legalSearch(event) {
    this.legalSearchEntity.code.startsWith = event;
    this.legalSearchEntity.name.startsWith = event;
    this.leGalEntityTyping.next(this.legalSearchEntity);
  }
  selectLegal(event) {
    this.customerGroupSearchEntity.legalEntityId = event[0];
    this.legalEntityId = event[0];

    this.customerGroupService.getList(this.customerGroupSearchEntity).then(res => {
      if (this.customerGroupList && this.customerGroupList.length > 0) {
        this.customerSearchEntity.legalEntityId = this.legalEntityId;
        this.customerSearchEntity.customerGroupingId = this.customerGroupList[0].id;
        this.customerGroupId = this.customerGroupList[0].id;
        this.customerGroupService.getListCustomerDetail(this.customerSearchEntity);
      }

    });

  }

  // drop list customer

  openCustomerList(id: []) {
    this.customerSearchEntity = new CustomerSearchEntity();
    this.customerSearchEntity.ids = id;
    if (this.legalEntityId !== '' && this.legalEntityId !== undefined) {
      this.customerSearchEntity.legalEntityId = this.legalEntityId;
      this.customerSearchEntity.customerGroupingId = this.customerGroupId;
      this.customerGroupService.getListCustomer(this.customerSearchEntity);
    }
  }

  customerSearchApp(event) {
    this.customerSearchEntity.code.startsWith = event;
    this.customerSearchEntity.name.startsWith = event;
    this.customerTyping.next(this.customerSearchEntity);
  }

  selectCustomerApp(event) {
    this.listCustomerId = event;
  }


  // list customer group
  sortCustomerGroup(event) {
    if (event.sortField && event.sortOrder) {
      this.customerGroupSearchEntity.orderBy = event.sortField;
      this.customerGroupSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    if (this.legalEntityId !== '' && this.legalEntityId !== undefined) {
      this.customerGroupService.getList(this.customerGroupSearchEntity).then(res => {
        if(this.customerGroupList && this.customerGroupList.length > 0) {
          this.customerSearchEntity.legalEntityId = this.legalEntityId;
          this.customerSearchEntity.customerGroupingId = this.customerGroupList[0].id;
          this.customerGroupId = this.customerGroupList[0].id;
          this.customerGroupService.getListCustomerDetail(this.customerSearchEntity);
        }
      });
    }
  }

  clearSearchGroup(tableCustomerGroup: any) {
    this.customerGroupSearchEntity = new CustomerGroupSearchEntity();
    this.customerGroupSearchEntity.legalEntityId = this.legalEntityId;
    tableCustomerGroup.reset();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.customerGroupSearchEntity.skip = 0;
    this.customerGroupSearchEntity.take = this.pagination.take;
    this.customerGroupService.getList(this.customerGroupSearchEntity).then(res => {
      this.customerGroupService.getList(this.customerGroupSearchEntity).then(res => {
        if (this.customerGroupList && this.customerGroupList.length > 0) {
          this.customerSearchEntity.customerGroupingId = this.customerGroupList[0].id;
        } else {
          this.customerSearchEntity.customerGroupingId = null;
        }
  
        this.customerGroupService.getListCustomerDetail(this.customerSearchEntity);
      });
    });
  }

  edit(customerGroupId: string) {
    this.customerGroupService.edit(customerGroupId);
    this.isAddGroup = true;
  }

  paginationGroupOut(pagination: PaginationModel) {
    this.customerGroupSearchEntity.skip = pagination.skip;
    this.customerGroupSearchEntity.take = pagination.take;
    this.customerGroupService.getList(this.customerGroupSearchEntity);
  }


  addGroup() {
    this.isAddGroup = !this.isAddGroup;
    this.customerGroupService.add(this.customerGroupSearchEntity.legalEntityId);
  }


  save() {
    if (!this.customerGroupForm.valid) {
      this.genaralService.validateAllFormFields(this.customerGroupForm);
    } else {
      this.customerGroupService.save(this.customerGroupForm.value, this.customerGroupSearchEntity).then(res => {
        this.isAddGroup = res;
      }).catch(err => {
        this.isAddGroup = err;
      });
    }
  }

  onClickDetail(customerGroupId) {
    this.customerSearchEntity.legalEntityId = this.legalEntityId;
    this.customerSearchEntity.customerGroupingId = customerGroupId;
    this.customerGroupId = customerGroupId;
    this.customerGroupService.getListCustomerDetail(this.customerSearchEntity)
  }

  // list customer detail 

  onClickShowDetail(customerId) {
    this.router.navigate(['/master-data/legal-entity/customer-group/customer-detail'],
      { queryParams: { id: customerId, legalEntityId: this.legalEntityId } });
  }

  onClickAddCustomer() {
    this.customerSearchEntity.customerDetailIds = this.listCustomerId;
    this.customerSearchEntity.legalEntityId = this.legalEntityId;
    if ((this.customerGroupId === '' || this.customerGroupId === undefined) && this.customerGroupList.length > 0) {
      this.customerGroupId = this.customerGroupList[0].id;
    }
    this.customerSearchEntity.customerGroupingId = this.customerGroupId;
    this.customerGroupService.saveCustomer(this.customerSearchEntity).then(res => {
      this.customerSearchEntity.legalEntityId = this.legalEntityId;
      this.customerSearchEntity.customerGroupingId = this.customerGroupId;
      this.customerGroupService.getListCustomerDetail(this.customerSearchEntity);
    }).catch(err => {
    });
  }

  sortCustomerDetail(event) {
    if (event.sortField && event.sortOrder) {
      this.customerSearchEntity.orderBy = event.sortField;
      this.customerSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    if (this.customerSearchEntity.customerGroupingId !== undefined) {
      this.customerSearchEntity.customerGroupingId = this.customerGroupId;
      this.getListDetail();
    }
  }
  deleteCustomerFromGroup(customerId: string) {
    this.customerGroupService.deleteCustomer(customerId, this.customerGroupId).then(res => {
      if (res) {
        this.clearSearch(this.tableCustomer);
        this.customerSearchEntity.legalEntityId = this.legalEntityId;
        this.customerSearchEntity.customerGroupingId = this.customerGroupId;
        this.customerGroupService.getListCustomerDetail(this.customerSearchEntity)
      }
    });
  }
  getListDetail() {
    this.paginationdetail.pageNumber = 1;
    this.customerSearchEntity.skip = 0;
    this.customerSearchEntity.take = this.paginationdetail.take;
    this.customerGroupService.getListCustomerDetail(this.customerSearchEntity);
  }

  clearSearch(tableCustomer: any) {
    this.customerSearchEntity = new CustomerSearchEntity();
    this.customerSearchEntity.legalEntityId = this.legalEntityId;
    tableCustomer.reset();
  }

  paginationDetailOut(pagination: PaginationModel) {
    this.customerSearchEntity.skip = pagination.skip;
    this.customerSearchEntity.take = pagination.take;
    this.customerGroupService.getListCustomerDetail(this.customerSearchEntity);
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
