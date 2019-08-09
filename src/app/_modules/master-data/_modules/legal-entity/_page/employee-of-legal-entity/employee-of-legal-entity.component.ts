import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { translate } from 'src/app/_helpers/string';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { EmployeeOfLegalEntityService } from './employee-of-legal-entity.service';
import { Subscription, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-of-legal-entity',
  templateUrl: './employee-of-legal-entity.component.html',
  styleUrls: ['./employee-of-legal-entity.component.scss'],
  providers: [EmployeeOfLegalEntityService]
})
export class EmployeeOfLegalEntityComponent implements OnInit {
  pageTitle = translate('employeeOfLegalEntity.header.title');
  pagination = new PaginationModel();
  paginationDetail = new PaginationModel();
  isSaveBookMark = false;
  selectedList: any;

  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  legalList: LegalEntity[];
  employeeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
  employeeList: EmployeeEntity[];

  employeeSubs: Subscription = new Subscription();
  exportLink = environment.apiUrlApps + 'master-data/legal-entity/employee-of-legal-entity/export?legalEntityId=';
  @ViewChild('tableEmployee', { static: false }) public tableEmployee: TemplateRef<any>;

  // Drop employee
  employeeIds: EmployeeEntity[];
  employeeExceptIds: EmployeeEntity[];
  employeeTyping: Subject<EmployeeSearchEntity> = new Subject();
  listEmployeeId: Array<any> = [];

  legalId: string;
  constructor(
    private employeeOfLegalEntityService: EmployeeOfLegalEntityService,
    protected router: Router,
    private genaralService: GeneralService,
    private bookmarkService: BookmarkService, ) {
    const legalListSub = this.employeeOfLegalEntityService.legalEntityList.subscribe(res => {
      if (res) {
        this.legalList = res;
        this.selectedList = res[0];
      }
    });

    const legalListCountSub = this.employeeOfLegalEntityService.legalEntityCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    const employeeOfLegalListSub = this.employeeOfLegalEntityService.employeeListOflegalEntity.subscribe(res => {
      if (res) {
        this.employeeIds = res.ids;
        this.employeeExceptIds = res.exceptIds;
      }
    });
    const employeeListSub = this.employeeOfLegalEntityService.employeeList.subscribe(res => {
      if (res) {
        this.employeeList = res;
      }
    });
    const employeeListCountSub = this.employeeOfLegalEntityService.employeeCount.subscribe(res => {
      if (res) {
        this.paginationDetail.totalItems = res;
      }
    });

    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });
    this.employeeOfLegalEntityService.getListDropEmployeeByTyping(this.employeeTyping);
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.employeeSubs.add(legalListSub).add(legalListCountSub).add(bookMarkNotify)
      .add(employeeOfLegalListSub).add(employeeListSub).add(employeeListCountSub);
  }


  ngOnInit() {
    this.legalSearchEntity.skip = this.pagination.skip;
    this.legalSearchEntity.take = this.pagination.take;

    this.employeeSearchEntity.skip = this.paginationDetail.skip;
    this.employeeSearchEntity.take = this.paginationDetail.take;
  }

  // drop employee
  openEmployeeList(id: string[]) {
    this.employeeSearchEntity = new EmployeeSearchEntity();
    this.employeeSearchEntity.ids = this.listEmployeeId;
    if (this.legalId !== '' && this.legalId !== undefined) {
      this.employeeSearchEntity.legalEntityId = this.legalId;
      this.employeeOfLegalEntityService.getListDropEmployee(this.employeeSearchEntity);
    }
  }

  employeeSearch(event) {
    this.employeeSearchEntity = new EmployeeSearchEntity();
    this.employeeSearchEntity.ids = this.listEmployeeId;
    this.employeeSearchEntity.code.startsWith = event;
    this.employeeSearchEntity.name.startsWith = event;
    this.employeeTyping.next(this.employeeSearchEntity);
  }
  selectEmployee(event) {
    this.listEmployeeId = event;
  }

  // list legal entity

  getListLegalEntity() {
    this.pagination.pageNumber = 1;
    this.legalSearchEntity.skip = 0;
    this.legalSearchEntity.take = this.pagination.take;
    this.employeeOfLegalEntityService.getListLegal(this.legalSearchEntity).then(res => {
      if (this.legalList && this.legalList.length > 0) {
        this.employeeSearchEntity.legalEntityId = this.legalList[0].id;
        this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity);
      } else {
        this.employeeSearchEntity.legalEntityId = null;
        this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity);
      }
    })
  }

  toDetail(legalId) {
    this.legalId = legalId;
    this.employeeSearchEntity.legalEntityId = legalId;
    this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity);
  }

  clearSearch(table) {
    this.legalSearchEntity = new LegalSearchEntity();
    table.reset();
  }

  sortLegalEntiy(event) {
    if (event.sortField && event.sortOrder) {
      this.legalSearchEntity.orderBy = event.sortField;
      this.legalSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.employeeOfLegalEntityService.getListLegal(this.legalSearchEntity).then(res => {
      if (this.legalId && this.legalId !== undefined) {
        this.employeeSearchEntity.legalEntityId = this.legalId;
        this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity);
      } else {
        if (this.legalList && this.legalList.length > 0) {
          this.employeeSearchEntity.legalEntityId = this.legalList[0].id;
          this.legalId = this.employeeSearchEntity.legalEntityId;
          this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity);
        }
      }
    });
  }

  paginationOut(pagination: PaginationModel) {
    this.legalSearchEntity.skip = pagination.skip;
    this.legalSearchEntity.take = pagination.take;
    this.employeeOfLegalEntityService.getListLegal(this.legalSearchEntity);
  }

  // table employee detail

  getListEmployee(employee) {
    this.paginationDetail.pageNumber = 1;
    this.employeeSearchEntity.skip = 0;
    this.employeeSearchEntity.take = this.paginationDetail.take;
    this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity);
  }

  sort(event) {
    if (event.sortField && event.sortOrder) {
      this.employeeSearchEntity.orderBy = event.sortField;
      this.employeeSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }

    if (this.employeeSearchEntity.legalEntityId !== '') {
      this.getListEmployee(this.employeeSearchEntity);
    }
  }

  paginationDetailOut(pagination: PaginationModel) {
    this.employeeSearchEntity.skip = pagination.skip;
    this.employeeSearchEntity.take = pagination.take;
    this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity);
  }

  clearSearchEmployee(tableemployee: any) {
    this.employeeSearchEntity = new EmployeeSearchEntity();
    // this.employeeSearchEntity.employeeDetailIds = this.employeeIds;
    tableemployee.reset();
  }

  addEmployee() {
    this.employeeSearchEntity.employeeIds = this.listEmployeeId;
    this.employeeSearchEntity.legalEntityId = this.legalId;
    this.employeeOfLegalEntityService.saveEmployee(this.employeeSearchEntity).then(res => {
      this.employeeIds = [];
      this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity);
    }).catch(err => {
    });
  }

  editSupplierDetail(employeeId) {
    this.router.navigate(['/master-data/legal-entity/employee-of-legal-entity/employee-detail'], { queryParams: { id: employeeId } });
  }

  deleteSupplierFormLegal(employee) {
    this.employeeOfLegalEntityService.deleteCustomerFormLegal(employee).then(res => {
      if (res) {
        this.clearSearchEmployee(this.tableEmployee);
        this.employeeSearchEntity.legalEntityId = this.legalId;
        this.employeeOfLegalEntityService.getListEmployeeDetail(this.employeeSearchEntity)
      }
    });
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
