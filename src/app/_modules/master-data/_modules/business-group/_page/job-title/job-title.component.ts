import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { JobTitleService } from './job-title.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { Router } from '@angular/router';
import { JobTitleSearchEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.searchentity';
import { JobTitleEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.entity';
import { translate } from 'src/app/_helpers/string';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-job-title',
  templateUrl: './job-title.component.html',
  styleUrls: ['./job-title.component.scss'],
  providers: [JobTitleService],
})
export class JobTitleComponent implements OnInit, OnDestroy {
  pageTitle = translate('jobTitle.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  jobTitleSearchEntity: JobTitleSearchEntity = new JobTitleSearchEntity();
  jobTitleList: JobTitleEntity[];
  jobTitleForm: FormGroup;
  jobTitleSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  constructor(private jobTitleService: JobTitleService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
    private router: Router) {
    const jobTitleListSub = this.jobTitleService.jobTitleList.subscribe(res => {
      if (res) {
        this.jobTitleList = res;
      }
    });
    const jobTitleFormSub = this.jobTitleService.jobTitleForm.subscribe(res => {
      if (res) {
        this.jobTitleForm = res;
      }
    });
    const jobTitleCountSub = this.jobTitleService.jobTitleCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.jobTitleSubs.add(jobTitleListSub).add(jobTitleFormSub).add(jobTitleCountSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.jobTitleSearchEntity.skip = this.pagination.skip;
    this.jobTitleSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.jobTitleSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.jobTitleSearchEntity.skip = 0;
    this.jobTitleSearchEntity.take = this.pagination.take;
    this.jobTitleService.getList(this.jobTitleSearchEntity);
  }

  add() {
    this.jobTitleService.add();
    this.isShowDialog = true;
  }

  edit(jobTitleId: string) {
    this.jobTitleService.edit(jobTitleId);
    this.isShowDialog = true;
  }

  deactivate() {
    this.jobTitleService.deactivate(this.jobTitleForm.value, this.jobTitleSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.jobTitleForm.valid) {
      this.genaralService.validateAllFormFields(this.jobTitleForm);
    } else {
      this.jobTitleService.save(this.jobTitleForm.value, this.jobTitleSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.jobTitleSearchEntity.orderBy = event.sortField;
      this.jobTitleSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  paginationOut(pagination: PaginationModel) {
    this.jobTitleSearchEntity.skip = pagination.skip;
    this.jobTitleSearchEntity.take = pagination.take;
    this.jobTitleService.getList(this.jobTitleSearchEntity);
  }

  clearSearch(table: any) {
    this.jobTitleSearchEntity = new JobTitleSearchEntity();
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
