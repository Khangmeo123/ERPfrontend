import { EnumEntity } from '../../../../../../../_helpers/entity';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { translate } from 'src/app/_helpers/string';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { Subscription } from 'rxjs';
import { BookmarkService } from 'src/app/_services';
import { EmployeeListService } from './employee-list.service';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralService } from '../../../../../../../_services/general-service.service';
import { PasswordEntity } from '../../../../../_backend/password/password.entity';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  providers: [EmployeeListService, GeneralService],
})
export class EmployeeListComponent implements OnInit, OnDestroy {
  pageTitle: string = translate('employee.list.header.title');
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
  genderList: any[] = [{label: 'Nam', id: true}, {label: 'Nữ', id: false}];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  downloadLink = environment.apiUrlApps + 'master-data/business-group/employee/employee-list/download-template';
  exportLink = environment.apiUrlApps + 'master-data/business-group/employee/employee-list/export';

  passwordModal: boolean = false;
  passwordForm: FormGroup;

  constructor(
    private employeeListService: EmployeeListService,
    private bookmarkService: BookmarkService,
    private router: Router,
    private generalService: GeneralService,
  ) {
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
    const passwordFormSub: Subscription = this.employeeListService.passwordForm.subscribe((form: FormGroup) => {
      this.passwordForm = form;
    });
    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});
    this.employeeListSubs.add(employeeListSub).add(employeeCountSub).add(statusListSub).add(bookMarkNotify).add(passwordFormSub);
  }

  get password() {
    return this.passwordForm.get('password') as FormControl;
  }

  get errors() {
    return this.passwordForm.get('password') as FormGroup;
  }

  ngOnInit() {
    this.employeeSearchEntity.skip = this.pagination.skip;
    this.employeeSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.employeeListSubs.unsubscribe();
  }

  toDetail(employeeId?: string) {
    this.router.navigate(['/master-data/business-group/employee/employee-detail'], {queryParams: {id: employeeId}});
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
      this.bookmarkService.addBookMarks({name: this.pageTitle, route: this.router.url});
    } else {
      this.bookmarkService.deleteBookMarks({name: this.pageTitle, route: this.router.url});
    }
  }

  openStatusList() {
    if (this.statusList.length === 0) {
      this.employeeListService.getStatusList();
    }
  }

  changePassword(id: string) {
    this.employeeListService.changePassword(id);
    this.passwordModal = true;
  }

  savePassword() {
    if (this.passwordForm.invalid) {
      this.generalService.validateAllFormFields(this.passwordForm);
    }

    if (this.passwordForm.valid) {
      const passwordEntity: PasswordEntity = new PasswordEntity(this.passwordForm.value);
      this.employeeListService.savePassword(passwordEntity)
        .then(() => {
          this.passwordModal = false;
        });
    }
  }

  importTemplate(file: File) {
    this.employeeListService.importFile(file)
      .then(() => {
        this.getList();
      });
  }
}
