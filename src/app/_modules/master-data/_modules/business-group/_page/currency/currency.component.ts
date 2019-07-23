import { CurrencyEntity } from './../../../../_backend/currency/currency.entity';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { CurrencySearchEntity } from 'src/app/_modules/master-data/_backend/currency/currency.searchentity';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CurrencyService } from './currency.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { Router } from '@angular/router';
import { translate } from 'src/app/_helpers/string';


@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss'],
  providers: [CurrencyService],
})
export class CurrencyComponent implements OnInit, OnDestroy {
  pageTitle = translate('currency.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  currencySearchEntity: CurrencySearchEntity = new CurrencySearchEntity();
  currencyList: CurrencyEntity[];
  currencyForm: FormGroup;
  currencySubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  brands: any[];

  constructor(private currencyService: CurrencyService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
    private router: Router) {
    const currencyListSub = this.currencyService.currencyList.subscribe(res => {
      if (res) {
        this.currencyList = res;
      }
    });
    const currencyFormSub = this.currencyService.currencyForm.subscribe(res => {
      if (res) {
        this.currencyForm = res;
      }
    });
    const currencyCountSub = this.currencyService.currencyCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.currencySubs.add(currencyListSub).add(currencyFormSub).add(currencyCountSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.currencySearchEntity.skip = this.pagination.skip;
    this.currencySearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.currencySubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.currencySearchEntity.skip = 0;
    this.currencySearchEntity.take = this.pagination.take;
    this.currencyService.getList(this.currencySearchEntity);
  }

  add() {
    this.currencyService.add();
    this.isShowDialog = true;
  }

  edit(currencyId: string) {
    this.currencyService.edit(currencyId);
    this.isShowDialog = true;
  }

  delete() {
    this.currencyService.delete(this.currencyForm.value, this.currencySearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.currencyForm.valid) {
      this.genaralService.validateAllFormFields(this.currencyForm);
    } else {
      this.currencyService.save(this.currencyForm.value, this.currencySearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.currencySearchEntity.orderBy = event.sortField;
      this.currencySearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getList();
  }

  paginationOut(pagination: PaginationModel) {
    this.currencySearchEntity.skip = pagination.skip;
    this.currencySearchEntity.take = pagination.take;
    this.currencyService.getList(this.currencySearchEntity);
  }

  clearSearch(table: any) {
    this.currencySearchEntity = new CurrencySearchEntity();
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
