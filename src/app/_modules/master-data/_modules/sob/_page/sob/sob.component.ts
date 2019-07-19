import { Component, OnDestroy, OnInit } from '@angular/core';
import { SobService } from './sob.service';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { BookmarkService } from '../../../../../../_services';
import { Router } from '@angular/router';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { SobEntity } from '../../../../_backend/sob/sob.entity';
import { CurrencyEntity } from '../../../../_backend/currency/currency.entity';
import { CurrencySearchEntity } from '../../../../_backend/currency/currency.searchentity';

@Component({
  selector: 'app-sob',
  templateUrl: './sob.component.html',
  styleUrls: ['./sob.component.scss'],
  providers: [
    SobService,
  ],
})
export class SobComponent implements OnInit, OnDestroy {
  pageTitle: string = 'sob.header.title';
  isSaveBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  sobSearchEntity: SobSearchEntity = new SobSearchEntity();
  sobList: SobEntity[];
  currencySearchEntity: CurrencySearchEntity = new CurrencySearchEntity();
  sobForm: FormGroup;
  sobSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  visible = false;

  currencyList: CurrencyEntity[] = [];

  selectedCurrency: CurrencyEntity = null;

  constructor(private sobService: SobService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
              private router: Router) {
    const sobListSub = this.sobService.sobList.subscribe(res => {
      if (res) {
        this.sobList = res;
      }
    });
    const sobFormSub = this.sobService.sobForm.subscribe(res => {
      if (res) {
        this.sobForm = res;
      }
    });
    const sobCountSub = this.sobService.sobCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });
    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});
    this.sobSubs.add(sobListSub).add(sobFormSub).add(sobCountSub).add(bookMarkNotify);
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  ngOnInit() {
    this.sobSearchEntity.skip = this.pagination.skip;
    this.sobSearchEntity.take = this.pagination.take;
    this.getList();
  }

  currencySearch(event) {
    console.log(event);
    this.sobService.getCurrencyList(this.currencySearchEntity);
  }

  ngOnDestroy() {
    this.sobSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.sobSearchEntity.skip = 0;
    this.sobSearchEntity.take = this.pagination.take;
    this.sobService.getList(this.sobSearchEntity);
  }

  add() {
    this.isShowDialog = true;
    this.sobService.add();
  }

  edit(sobId: string) {
    this.sobService.edit(sobId);
    this.isShowDialog = true;
  }

  delete() {
    this.sobService.delete(this.sobForm.value, this.sobSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.sobForm.valid) {
      this.genaralService.validateAllFormFields(this.sobForm);
    } else {
      this.sobService.save(this.sobForm.value, this.sobSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.sobSearchEntity.orderBy = event.sortField;
      this.sobSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getList();
  }

  paginationOut(pagination: PaginationModel) {
    this.sobSearchEntity.skip = pagination.skip;
    this.sobSearchEntity.take = pagination.take;
    this.sobService.getList(this.sobSearchEntity);
  }

  clearSearch(table: any) {
    this.sobSearchEntity = new SobSearchEntity();
    table.reset();
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
