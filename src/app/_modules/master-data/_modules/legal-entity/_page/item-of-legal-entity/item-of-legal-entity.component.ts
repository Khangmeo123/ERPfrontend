import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { ItemOfLegalEntityService } from './item-of-legal-entity.service';
import { translate } from 'src/app/_helpers/string';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';
import { Subject, Subscription } from 'rxjs';
import { SobEntity } from 'src/app/_modules/master-data/_backend/sob/sob.entity';
import { SobSearchEntity } from 'src/app/_modules/master-data/_backend/sob/sob.searchentity';

@Component({
  selector: 'app-item-of-legal-entity',
  templateUrl: './item-of-legal-entity.component.html',
  styleUrls: ['./item-of-legal-entity.component.scss'],
  providers: [ItemOfLegalEntityService],
})
export class ItemOfLegalEntityComponent implements OnInit, OnDestroy {

  pageTitle = translate('itemOfLegalEntity.header.title');
  isSaveBookMark: boolean = false;
  paginationLegalList = new PaginationModel();
  paginationItemsFromLegal = new PaginationModel();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  legalEntityId: string;
  itemIdList: string[] = [];
  legalEntitySelectedRow: any;
  @ViewChild('tableItem', { static: false }) public tableItem: TemplateRef<any>;
  // legal:
  legalList: LegalEntity[];
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  // itemsFromLegal:
  itemsFromLegalList: ItemEntity[];
  itemsFromLegalSearchEntity: ItemSearchEntity = new ItemSearchEntity();
  // item:
  itemIds: ItemEntity[];
  itemExceptIds: ItemEntity[];
  itemSearchEntity: ItemSearchEntity = new ItemSearchEntity();
  itemTyping: Subject<ItemSearchEntity> = new Subject();
  // sob:
  sobIds: SobEntity[];
  sobExceptIds: SobEntity[];
  sobSearchEntity: SobSearchEntity = new SobSearchEntity();
  sobTyping: Subject<SobSearchEntity> = new Subject();

  ItemOfLegalEntitySubs: Subscription = new Subscription();

  constructor(private itemOfLegalEntityService: ItemOfLegalEntityService, private genaralService: GeneralService,
    private bookmarkService: BookmarkService, private router: Router) {

    const legalListSub = this.itemOfLegalEntityService.legalList.subscribe(res => {
      if (res) {
        this.legalList = res;
      }
    });
    const legalCountSub = this.itemOfLegalEntityService.legalCount.subscribe(res => {
      if (res) {
        this.paginationLegalList.totalItems = res;
      }
    });
    const itemsFromLegalSub = this.itemOfLegalEntityService.itemsFromLegalList.subscribe(res => {
      if (res) {
        this.itemsFromLegalList = res;
      }
    });
    const itemsFromLegalCountSub = this.itemOfLegalEntityService.itemsFromLegalCount.subscribe(res => {
      if (res) {
        this.paginationItemsFromLegal.totalItems = res;
      }
    });
    const itemListSub = this.itemOfLegalEntityService.itemList.subscribe(res => {
      if (res) {
        this.itemIds = res.ids;
        this.itemExceptIds = res.exceptIds;
      }
    });
    this.itemOfLegalEntityService.searchTypingItemList(this.itemTyping);
    const sobListSub = this.itemOfLegalEntityService.sobList.subscribe(res => {
      if (res) {
        this.sobExceptIds = res.exceptIds;
        this.sobIds = res.ids;
      }
    });
    this.itemOfLegalEntityService.searchTypingSobList(this.sobTyping);
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });

    this.ItemOfLegalEntitySubs.add(legalListSub).add(itemsFromLegalSub).add(itemListSub).add(sobListSub)
      .add(legalCountSub).add(itemsFromLegalCountSub).add(bookMarkNotify);
  }

  // general:

  ngOnInit() {

  }

  ngOnDestroy() {
    this.ItemOfLegalEntitySubs.unsubscribe();
  }

  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }

  // legal:
  getLegalList() {
    this.paginationLegalList.pageNumber = 1;
    this.legalSearchEntity.skip = 0;
    this.legalSearchEntity.take = this.paginationLegalList.take;
    this.itemOfLegalEntityService.getLegalList(this.legalSearchEntity).then(res => {
      if (res) {
        if (this.legalList.length > 0) {
          this.legalEntitySelectedRow = this.legalList[0];
          this.legalEntityId = this.legalList[0].id;
          this.clearSearchItemsFromLegalList(this.tableItem);
        }
      }
    });
  }

  sortLegalList(event: any) {
    if (event.sortField && event.sortOrder) {
      this.legalSearchEntity.orderBy = event.sortField;
      this.legalSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getLegalList();
  }

  paginationOutLegalList(pagination: PaginationModel) {
    this.legalSearchEntity.skip = pagination.skip;
    this.legalSearchEntity.take = pagination.take;
    this.itemOfLegalEntityService.getLegalList(this.legalSearchEntity);
  }

  clearSearchLegalList(table: any) {
    this.legalSearchEntity = new LegalSearchEntity();
    table.reset();
  }

  sobOpen(id: string) {
    this.sobSearchEntity = new SobSearchEntity();
    if (id !== null && id.length > 0) {
      this.sobSearchEntity.ids.push(id);
    }
    this.itemOfLegalEntityService.dropDownSobList(this.sobSearchEntity);
  }

  sobTypingSearch(event: string) {
    this.sobSearchEntity = new SobSearchEntity();
    this.sobSearchEntity.code.startsWith = event;
    this.sobTyping.next(this.sobSearchEntity);
  }

  legalEntityOnRowSelect(event) {
    if (event.data) {
      this.legalEntityId = event.data.id;
      this.clearSearchItemsFromLegalList(this.tableItem);
    }
  }

  // itemsFromLegal

  getItemsFromLegalList() {
    this.paginationItemsFromLegal.pageNumber = 1;
    this.itemsFromLegalSearchEntity.skip = 0;
    this.itemsFromLegalSearchEntity.take = this.paginationItemsFromLegal.take;
    this.itemsFromLegalSearchEntity.legalEntityId = this.legalEntityId;
    this.itemOfLegalEntityService.getItemsFromLegal(this.itemsFromLegalSearchEntity);
  }

  sortItemsFromLegalList(event: any) {
    if (event.sortField && event.sortOrder) {
      this.itemsFromLegalSearchEntity.orderBy = event.sortField;
      this.itemsFromLegalSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getItemsFromLegalList();
  }

  paginationOutItemsFromLegalList(pagination: PaginationModel) {
    this.itemsFromLegalSearchEntity.skip = pagination.skip;
    this.itemsFromLegalSearchEntity.take = pagination.take;
    this.itemOfLegalEntityService.getItemsFromLegal(this.itemsFromLegalSearchEntity);
  }

  clearSearchItemsFromLegalList(table: any) {
    this.itemsFromLegalSearchEntity = new ItemSearchEntity();
    table.reset();
  }

  itemTypingSearch(event: string) {
    this.itemSearchEntity = new ItemSearchEntity();
    this.itemSearchEntity.name.startsWith = event;
    this.itemSearchEntity.ids = [...this.itemIdList];
    if (this.legalEntityId !== null && this.legalEntityId !== undefined) {
      this.itemSearchEntity.legalEntityId = this.legalEntityId;
    }
    this.itemTyping.next(this.itemSearchEntity);
  }

  itemOpen() {
    this.itemSearchEntity = new ItemSearchEntity();
    this.itemSearchEntity.ids = [...this.itemIdList];
    if (this.legalEntityId !== null && this.legalEntityId !== undefined) {
      this.itemSearchEntity.legalEntityId = this.legalEntityId;
    }
    this.itemOfLegalEntityService.dropDownItemList(this.itemSearchEntity);
  }

  addItemsToLegal() {
    this.itemOfLegalEntityService.addItemsToLegal(this.itemIdList, this.legalEntityId).then(res => {
      if (res) {
        this.itemIdList = [];
        this.itemIds = [];
        this.clearSearchItemsFromLegalList(this.tableItem);
      }
    });

  }

  deleteItemFromLegal(itemId: string) {
    this.itemOfLegalEntityService.deleteItemFromLegal(itemId, this.legalEntityId).then(res => {
      if (res) {
        this.clearSearchItemsFromLegalList(this.tableItem);
      }
    });
  }

  editItemFromLegal(itemId: string) {
    if (itemId) {
      this.router.navigate(['/master-data/legal-entity/item-of-legal-entity/item-detail'], { queryParams: { id: itemId } });
    }
  }

  viewItemFromLegal(itemId: string) {
    if (itemId) {
      this.router.navigate(['/master-data/legal-entity/item-of-legal-entity/item-detail'], { queryParams: { id: itemId } });
    }
  }
}
