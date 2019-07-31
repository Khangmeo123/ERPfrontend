import { EnumEntity } from './../../../../../../../_helpers/entity';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { translate } from 'src/app/_helpers/string';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { Subscription } from 'rxjs';
import { BookmarkService } from 'src/app/_services';
import { EmployeeListService } from './employee-list.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [EmployeeListService],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  pageTitle: string = translate('employeeList.list.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  // employee:
  employeeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
  employeeList: EmployeeEntity[];
  employeeListSubs: Subscription = new Subscription();
  // status:
  statusList: EnumEntity[];
  // gender:
  genderList: any[] = [{ label: 'Nam', id: true }, { label: 'Nữ', id: false }];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  testValue = 'test';
  downloadLink = environment.apiUrlApps + 'master-data/business-group/employee/employee-list/download-template';
  exportLink = environment.apiUrlApps + 'master-data/business-group/employee/employee-list/export';

  constructor(private employeeListService: EmployeeListService, private bookmarkService: BookmarkService, private router: Router) {
    const employeeListSub = this.employeeListService.employeeList.subscribe(res => {
      if (res) {
        this.employeeList = res;
      }
    });
    const employeeCountSub = this.employeeListService.employeeCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const statusListSub = this.employeeListService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.employeeListSubs.add(employeeListSub).add(employeeCountSub).add(statusListSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.employeeSearchEntity.skip = this.pagination.skip;
    this.employeeSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.employeeListSubs.unsubscribe();
  }

  toDetail(employeeId?: string) {
    this.router.navigate(['/master-data/business-group/employee/employee-detail'], { queryParams: { id: employeeId } });
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.employeeSearchEntity.skip = 0;
    this.employeeSearchEntity.take = this.pagination.take;
    this.employeeListService.getList(this.employeeSearchEntity);
  }

  paginationOut(pagination: PaginationModel) {
    this.employeeSearchEntity.skip = pagination.skip;
    this.employeeSearchEntity.take = pagination.take;
    this.employeeListService.getList(this.employeeSearchEntity);
  }

  clearSearch(table: any) {
    this.employeeSearchEntity = new EmployeeSearchEntity();
    table.reset();
    this.testValue = '';
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.employeeSearchEntity.orderBy = event.sortField;
      this.employeeSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  bookMark() {
    this.isBookMark = !this.isBookMark;
    if (this.isBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }

  openStatusList() {
    if (this.statusList.length === 0) {
      this.employeeListService.getStatusList();
    }
  }

}
