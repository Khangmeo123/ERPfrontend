import { PaginationModel } from './../../../../../../../_shared/modules/pagination/pagination.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { translate } from 'src/app/_helpers/string';
import { SupplierSearchEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.searchentity';
import { SupplierEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.entity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { Subscription } from 'rxjs';
import { SupplierListService } from './supplier-list.service';
import { BookmarkService } from 'src/app/_services';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.scss'],
  providers: [SupplierListService]
})
export class SupplierListComponent implements OnInit, OnDestroy {
  pageTitle: string = translate('supplier.list.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  // supplier
  supplierSearchEntity: SupplierSearchEntity = new SupplierSearchEntity();
  supplierList: SupplierEntity[];
  // status
  statusList: EnumEntity[];
  supplierListSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  downloadLink = environment.apiUrlApps + 'master-data/business-group/supplier/supplier-list/download-template';
  exportLink = environment.apiUrlApps + 'master-data/business-group/supplier/supplier-list/export';

  constructor(private supplierListService: SupplierListService, private bookmarkService: BookmarkService,
    private router: Router) {
    const supplierListSub = this.supplierListService.supplierList.subscribe(res => {
      if (res) {
        this.supplierList = res;
      }
    });
    const supplierListCountSub = this.supplierListService.supplierCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    const statusListSub = this.supplierListService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.supplierListSubs.add(supplierListSub).add(supplierListCountSub).add(statusListSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.supplierSearchEntity.skip = this.pagination.skip;
    this.supplierSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.supplierListSubs.unsubscribe();
  }

  toDetail(supplierId?: string) {
    this.router.navigate(['/master-data/business-group/supplier/supplier-detail'], { queryParams: { id: supplierId } });
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.supplierSearchEntity.skip = 0;
    this.supplierSearchEntity.take = this.pagination.take;
    this.supplierListService.getList(this.supplierSearchEntity);
  }

  paginationOut(pagination: PaginationModel) {
    this.supplierSearchEntity.skip = pagination.skip;
    this.supplierSearchEntity.take = pagination.take;
    this.supplierListService.getList(this.supplierSearchEntity);
  }

  clearSearch(table: any) {
    this.supplierSearchEntity = new SupplierSearchEntity();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.supplierSearchEntity.orderBy = event.sortField;
      this.supplierSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
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
      this.supplierListService.getStatusList();
    }
  }

  importTemplate(file: File) {
    this.supplierListService.importFile(file)
      .then(() => {
        this.getList();
      });
  }
}
