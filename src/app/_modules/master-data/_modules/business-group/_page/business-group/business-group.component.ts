import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { BusinessGroupSearchEntity } from 'src/app/_modules/master-data/_backend/business-group/business-group.searchentity';
import { BusinessGroupService } from './business-group.service';
import { Subscription } from 'rxjs';
import { BusinessGroupEntity } from 'src/app/_modules/master-data/_backend/business-group/business-group.entity';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import {_} from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  selector: 'app-business-group',
  templateUrl: './business-group.component.html',
  styleUrls: ['./business-group.component.scss'],
  providers: [BusinessGroupService]
})
export class BusinessGroupComponent implements OnInit, OnDestroy {
  pageTitle = _('business_group.header.title');
  isSaveBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  businessGroupSearchEntity: BusinessGroupSearchEntity = new BusinessGroupSearchEntity();
  businessGroupList: BusinessGroupEntity[];
  businessGroupForm: FormGroup;
  businessGroupSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  constructor(private businessGroupService: BusinessGroupService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
    private router: Router) {
    const businessGroupListSub = this.businessGroupService.businessGroupList.subscribe(res => {
      if (res) {
        this.businessGroupList = res;
      }
    });
    const businessGroupFormSub = this.businessGroupService.businessGroupForm.subscribe(res => {
      if (res) {
        this.businessGroupForm = res;
      }
    });
    const businessGroupCountSub = this.businessGroupService.businessGroupCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.businessGroupSubs.add(businessGroupListSub).add(businessGroupFormSub).add(businessGroupCountSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.businessGroupSearchEntity.skip = this.pagination.skip;
    this.businessGroupSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.businessGroupSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.businessGroupSearchEntity.skip = 0;
    this.businessGroupSearchEntity.take = this.pagination.take;
    this.businessGroupService.getList(this.businessGroupSearchEntity);
  }

  add() {
    this.isShowDialog = true;
    this.businessGroupService.add();
  }

  edit(businessGroupId: string) {
    this.businessGroupService.edit(businessGroupId);
    this.isShowDialog = true;
  }

  delete() {
    this.businessGroupService.delete(this.businessGroupForm.value, this.businessGroupSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.businessGroupForm.valid) {
      this.genaralService.validateAllFormFields(this.businessGroupForm);
    } else {
      this.businessGroupService.save(this.businessGroupForm.value, this.businessGroupSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.businessGroupSearchEntity.orderBy = event.sortField;
      this.businessGroupSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getList();
  }

  paginationOut(pagination: PaginationModel) {
    this.businessGroupSearchEntity.skip = pagination.skip;
    this.businessGroupSearchEntity.take = pagination.take;
    this.businessGroupService.getList(this.businessGroupSearchEntity);
  }

  clearSearch(table: any) {
    this.businessGroupSearchEntity = new BusinessGroupSearchEntity();
    table.reset();
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
