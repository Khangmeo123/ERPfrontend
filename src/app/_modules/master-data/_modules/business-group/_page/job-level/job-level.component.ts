import { translate } from 'src/app/_helpers/string';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { JobLevelSearchEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.searchentity';
import { JobLevelEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.entity';
import { FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { JobLevelService } from './job-level.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-level',
  templateUrl: './job-level.component.html',
  styleUrls: ['./job-level.component.scss'],
  providers: [JobLevelService]
})
export class JobLevelComponent implements OnInit, OnDestroy {
  pageTitle = translate('jobLevel.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  jobLevelSearchEntity: JobLevelSearchEntity = new JobLevelSearchEntity();
  jobLevelList: JobLevelEntity[];
  jobLevelForm: FormGroup;
  jobLevelSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  constructor(private jobLevelService: JobLevelService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
    private router: Router) {
    const jobLevelListSub = this.jobLevelService.jobLevelList.subscribe(res => {
      if (res) {
        this.jobLevelList = res;
      }
    });
    const jobLevelFormSub = this.jobLevelService.jobLevelForm.subscribe(res => {
      if (res) {
        this.jobLevelForm = res;
      }
    });
    const jobLevelCountSub = this.jobLevelService.jobLevelCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.jobLevelSubs.add(jobLevelListSub).add(jobLevelFormSub).add(jobLevelCountSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.jobLevelSearchEntity.skip = this.pagination.skip;
    this.jobLevelSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.jobLevelSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.jobLevelSearchEntity.skip = 0;
    this.jobLevelSearchEntity.take = this.pagination.take;
    this.jobLevelService.getList(this.jobLevelSearchEntity);
  }

  add() {
    this.jobLevelService.add();
    this.isShowDialog = true;
  }

  edit(jobLevelId: string) {
    this.jobLevelService.edit(jobLevelId);
    this.isShowDialog = true;
  }

  deactivate() {
    this.jobLevelService.deactivate(this.jobLevelForm.value, this.jobLevelSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.jobLevelForm.valid) {
      this.genaralService.validateAllFormFields(this.jobLevelForm);
    } else {
      this.jobLevelService.save(this.jobLevelForm.value, this.jobLevelSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.jobLevelSearchEntity.orderBy = event.sortField;
      this.jobLevelSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  paginationOut(pagination: PaginationModel) {
    this.jobLevelSearchEntity.skip = pagination.skip;
    this.jobLevelSearchEntity.take = pagination.take;
    this.jobLevelService.getList(this.jobLevelSearchEntity);
  }

  clearSearch(table: any) {
    this.jobLevelSearchEntity = new JobLevelSearchEntity();
    table.reset();
  }

  bookMark() {
    this.isBookMark = !this.isBookMark;
    if (this.isBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }
}
