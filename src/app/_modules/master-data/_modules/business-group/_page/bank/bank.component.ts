import { environment } from './../../../../../../../environments/environment.prod';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, Routes } from '@angular/router';
import { BookmarkService } from 'src/app/_services';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BankService } from './bank.service';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { translate } from 'src/app/_helpers/string';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss'],
  providers: [BankService],
})
export class BankComponent implements OnInit, OnDestroy {
  pageTitle = translate('bank.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  bankSearchEntity: BankSearchEntity = new BankSearchEntity();
  bankList: BankEntity[];
  bankForm: FormGroup;
  bankSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  brands: any[];
  downloadLink = environment.apiUrlApps + 'master-data/business-group/bank/download-template';
  exportLink = environment.apiUrlApps + 'master-data/business-group/bank/export';

  constructor(private bankService: BankService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
    private router: Router) {
    const bankListSub = this.bankService.bankList.subscribe(res => {
      if (res) {
        this.bankList = res;
      }
    });
    const bankFormSub = this.bankService.bankForm.subscribe(res => {
      if (res) {
        this.bankForm = res;
      }
    });
    const bankCountSub = this.bankService.bankCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.bankSubs.add(bankListSub).add(bankFormSub).add(bankCountSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.bankSearchEntity.skip = this.pagination.skip;
    this.bankSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.bankSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.bankSearchEntity.skip = 0;
    this.bankSearchEntity.take = this.pagination.take;
    this.bankService.getList(this.bankSearchEntity);
  }

  add() {
    this.bankService.add();
    this.isShowDialog = true;
  }

  edit(bankId: string) {
    this.bankService.edit(bankId);
    this.isShowDialog = true;
  }

  delete() {
    this.bankService.delete(this.bankForm.value, this.bankSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.bankForm.valid) {
      this.genaralService.validateAllFormFields(this.bankForm);
    } else {
      this.bankService.save(this.bankForm.value, this.bankSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.bankSearchEntity.orderBy = event.sortField;
      this.bankSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  paginationOut(pagination: PaginationModel) {
    this.bankSearchEntity.skip = pagination.skip;
    this.bankSearchEntity.take = pagination.take;
    this.bankService.getList(this.bankSearchEntity);
  }

  clearSearch(table: any) {
    this.bankSearchEntity = new BankSearchEntity();
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

  importTemplate(file: File) {
    this.bankService.importFile(file);
  }
}
