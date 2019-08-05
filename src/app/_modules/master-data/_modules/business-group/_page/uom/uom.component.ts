import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { UomSearchEntity } from 'src/app/_modules/master-data/_backend/uom/uom.searchentity';
import { UomEntity } from 'src/app/_modules/master-data/_backend/uom/uom.entity';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UomService } from './uom.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { Router } from '@angular/router';
import { translate } from 'src/app/_helpers/string';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss'],
  providers: [UomService]
})
export class UomComponent implements OnInit, OnDestroy {
  pageTitle = translate('uom.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  uomSearchEntity: UomSearchEntity = new UomSearchEntity();
  uomList: UomEntity[];
  uomForm: FormGroup;
  uomSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  constructor(private uomService: UomService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
    private router: Router) {
    const uomListSub = this.uomService.uomList.subscribe(res => {
      if (res) {
        this.uomList = res;
      }
    });
    const uomFormSub = this.uomService.uomForm.subscribe(res => {
      if (res) {
        this.uomForm = res;
      }
    });
    const uomCountSub = this.uomService.uomCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.uomSubs.add(uomListSub).add(uomFormSub).add(uomCountSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.uomSearchEntity.skip = this.pagination.skip;
    this.uomSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.uomSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.uomSearchEntity.skip = 0;
    this.uomSearchEntity.take = this.pagination.take;
    this.uomService.getList(this.uomSearchEntity);
  }

  add() {
    this.uomService.add();
    this.isShowDialog = true;
  }

  edit(uomId: string) {
    this.uomService.edit(uomId);
    this.isShowDialog = true;
  }

  delete() {
    this.uomService.delete(this.uomForm.value, this.uomSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.uomForm.valid) {
      this.genaralService.validateAllFormFields(this.uomForm);
    } else {
      this.uomService.save(this.uomForm.value, this.uomSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.uomSearchEntity.orderBy = event.sortField;
      this.uomSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  paginationOut(pagination: PaginationModel) {
    this.uomSearchEntity.skip = pagination.skip;
    this.uomSearchEntity.take = pagination.take;
    this.uomService.getList(this.uomSearchEntity);
  }

  clearSearch(table: any) {
    this.uomSearchEntity = new UomSearchEntity();
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
