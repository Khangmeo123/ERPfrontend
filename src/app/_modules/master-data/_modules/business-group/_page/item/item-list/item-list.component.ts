import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { Subscription, Subject } from 'rxjs';
import { ItemListService } from './item-list.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { UomSearchEntity } from 'src/app/_modules/master-data/_backend/uom/uom.searchentity';
import { UomEntity } from './../../../../../_backend/uom/uom.entity';
import { translate } from 'src/app/_helpers/string';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit, OnDestroy {
  pageTitle: string = translate('item.list.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  // item
  itemSearchEntity: ItemSearchEntity = new ItemSearchEntity();
  itemList: ItemEntity[];
  // uom
  uomExceptIds: UomEntity[];
  uomIds: UomEntity[];
  uomSearchEntity: UomSearchEntity = new UomSearchEntity();
  uomTyping: Subject<UomSearchEntity> = new Subject();
  // status
  statusList: EnumEntity[];
  itemListSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  downloadLink = environment.apiUrlApps + 'master-data/business-group/item/download-template';
  exportLink = environment.apiUrlApps + 'master-data/business-group/item/export';

  constructor(private itemListService: ItemListService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
    private router: Router) {
    const itemListSub = this.itemListService.itemList.subscribe(res => {
      if (res) {
        this.itemList = res;
      }
    });
    const itemListCountSub = this.itemListService.itemListCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    const statusListSub = this.itemListService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    const uomListSub = this.itemListService.uomList.subscribe(res => {
      if (res) {
        this.uomExceptIds = res.exceptIds;
        this.uomIds = res.ids;
      }
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.itemListService.getUomListByTyping(this.uomTyping);
    this.itemListSubs.add(itemListSub).add(itemListCountSub).add(uomListSub).add(statusListSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.itemSearchEntity.skip = this.pagination.skip;
    this.itemSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.itemListSubs.unsubscribe();
  }

  toDetail(itemId?: string) {
    this.router.navigate(['/master-data/business-group/item/item-detail'], { queryParams: { id: itemId } });
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.itemSearchEntity.skip = 0;
    this.itemSearchEntity.take = this.pagination.take;
    this.itemListService.getList(this.itemSearchEntity);
  }

  paginationOut(pagination: PaginationModel) {
    this.itemSearchEntity.skip = pagination.skip;
    this.itemSearchEntity.take = pagination.take;
    this.itemListService.getList(this.itemSearchEntity);
  }

  clearSearch(table: any) {
    this.itemSearchEntity = new ItemSearchEntity();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.itemSearchEntity.orderBy = event.sortField;
      this.itemSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
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
      this.itemListService.getStatusList();
    }
  }

  openUomList(id: string) {
    this.uomSearchEntity = new UomSearchEntity();
    if (id !== null && id.length > 0) {
      this.uomSearchEntity.ids.push(id);
    }
    this.itemListService.getUomList(this.uomSearchEntity);
  }

  searchUom(event, id: string) {
    this.uomSearchEntity = new UomSearchEntity();
    if (id !== null && id.length > 0) {
      this.uomSearchEntity.ids.push(id);
    }
    this.uomSearchEntity.name.startsWith = event;
    this.uomTyping.next(this.uomSearchEntity);
  }

}
