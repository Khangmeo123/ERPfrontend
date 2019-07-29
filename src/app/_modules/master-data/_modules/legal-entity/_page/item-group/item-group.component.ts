import { ItemSearchEntity } from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import { FormGroup } from '@angular/forms';
import { ItemGroupSearchEntity } from './../../../../_backend/item-group/item-group.searchentity';
import { ItemGroupEntity } from 'src/app/_modules/master-data/_backend/item-group/item-group.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { LegalEntity } from './../../../../_backend/legal/legal.entity';
import { Component, OnInit, OnDestroy, ViewChild, TemplateRef } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { translate } from 'src/app/_helpers/string';
import { Subject, Subscription } from 'rxjs';
import { ItemGroupService } from './item-group.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { ItemEntity } from 'src/app/_modules/master-data/_backend/item/item.entity';

@Component({
  selector: 'app-item-group',
  templateUrl: './item-group.component.html',
  styleUrls: ['./item-group.component.scss'],
  providers: [ItemGroupService],
})
export class ItemGroupComponent implements OnInit, OnDestroy {

  pageTitle = translate('itemGroup.header.title');
  isSaveBookMark: boolean = false;
  isShowItemGroupDialog: boolean = false;
  paginationItemGroup = new PaginationModel();
  paginationItems = new PaginationModel();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  legalEntityId: string;
  itemGroupId: string;
  itemsFromItemGroupIds: string[] = [];
  itemGroupSubs: Subscription = new Subscription();
  itemGroupSelectedRow: any;
  @ViewChild('tableItemGroup', { static: false }) public tableItemGroup: TemplateRef<any>;
  @ViewChild('tableItems', { static: false }) public tableItems: TemplateRef<any>;
  // legal:
  legalIds: LegalEntity[];
  legalExceptIds: LegalEntity[];
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  legalTyping: Subject<LegalSearchEntity> = new Subject();
  // itemGroup:
  itemGroupList: ItemGroupEntity[];
  itemGroupSearchEntity: ItemGroupSearchEntity = new ItemGroupSearchEntity();
  itemGroupForm: FormGroup;
  // itemsFromItemGroup:
  itemsFromItemGroupList: ItemEntity[];
  itemsFromItemGroupSearchEntity: ItemSearchEntity = new ItemSearchEntity();
  // item:
  itemIds: ItemEntity[];
  itemExceptIds: ItemEntity[];
  itemSearchEntity: ItemSearchEntity = new ItemSearchEntity();
  itemTyping: Subject<ItemSearchEntity> = new Subject();

  constructor(private itemGroupService: ItemGroupService, private genaralService: GeneralService,
    private bookmarkService: BookmarkService, private router: Router) {
    // legalEntity:
    const legalListSub = this.itemGroupService.legalEntityList.subscribe(res => {
      if (res) {
        this.legalIds = res.ids;
        this.legalExceptIds = res.exceptIds;
      }
    });
    this.itemGroupService.searchTypingLegalEntity(this.legalTyping);
    // itemGroup:
    const itemGroupListSub = this.itemGroupService.itemGroupList.subscribe(res => {
      if (res) {
        this.itemGroupList = res;
      }
    });
    const itemGroupCountSub = this.itemGroupService.itemGroupCount.subscribe(res => {
      if (res) {
        this.paginationItemGroup.totalItems = res;
      }
    });
    const itemGroupFormSub = this.itemGroupService.itemGroupForm.subscribe(res => {
      if (res) {
        this.itemGroupForm = res;
      }
    });
    // item:
    const itemListSub = this.itemGroupService.itemList.subscribe(res => {
      if (res) {
        this.itemIds = res.ids;
        this.itemExceptIds = res.exceptIds;
      }
    });
    this.itemGroupService.searchTypingItemList(this.itemTyping);
    // itemsFromItemGroup:
    const itemsFromItemGroupListSub = this.itemGroupService.itemsFromItemGroupList.subscribe(res => {
      if (res) {
        this.itemsFromItemGroupList = res;
      }
    });
    const itemsFromItemGroupCountSub = this.itemGroupService.itemsFromItemGroupCount.subscribe(res => {
      if (res) {
        this.paginationItems.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });

    this.itemGroupSubs.add(legalListSub).add(itemGroupListSub).add(itemGroupCountSub).add(itemGroupFormSub).add(itemListSub)
      .add(itemsFromItemGroupListSub).add(itemsFromItemGroupCountSub).add(bookMarkNotify);
  }

  // general:

  ngOnInit() {
  }

  ngOnDestroy() {
    this.itemGroupSubs.unsubscribe();
  }

  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }

  // legalEntity:
  legalEntityOpen() {
    this.legalSearchEntity = new LegalSearchEntity();
    if (this.legalEntityId !== undefined && this.legalEntityId !== null) {
      this.legalSearchEntity.ids.push(this.legalEntityId);
    }
    this.itemGroupService.dropDownLegalEntity(this.legalSearchEntity);
  }

  legalEntityTypingSearch(event: string) {
    this.legalSearchEntity = new LegalSearchEntity();
    this.legalSearchEntity.name.startsWith = event;
    this.legalTyping.next(this.legalSearchEntity);
  }

  legalEntitySelection(event: any) {
    this.legalEntityId = event[0];
    this.legalSearchEntity.ids = [...event];
    this.clearSearchItemGroup(this.tableItemGroup);
  }

  // itemGroup:
  getItemGroupList() {
    this.paginationItemGroup.pageNumber = 1;
    this.itemGroupSearchEntity.skip = 0;
    this.itemGroupSearchEntity.take = this.paginationItemGroup.take;
    this.itemGroupSearchEntity.legalEntityId = this.legalEntityId;
    this.itemGroupService.getItemGroupListFromLegal(this.itemGroupSearchEntity).then(res => {
      if (res) {
        this.itemGroupSelectedRow = this.itemGroupList[0];
        this.itemGroupId = this.itemGroupList[0].id;
        this.clearSearchItemsFromItemGroup(this.tableItems);
      }
    });
  }

  sortItemGroupList(event: any) {
    if (event.sortField && event.sortOrder) {
      this.itemGroupSearchEntity.orderBy = event.sortField;
      this.itemGroupSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    if (this.legalEntityId !== null && this.legalEntityId !== undefined) {
      this.getItemGroupList();
    }
  }

  paginationOutItemGroup(pagination: PaginationModel) {
    this.itemGroupSearchEntity.skip = pagination.skip;
    this.itemGroupSearchEntity.take = pagination.take;
    this.itemGroupService.getItemGroupListFromLegal(this.itemGroupSearchEntity);
  }

  clearSearchItemGroup(table: any) {
    this.itemGroupSearchEntity = new ItemGroupSearchEntity();
    table.reset();
  }

  addItemGroup() {
    this.itemGroupService.addItemGroupFromLegal(this.legalEntityId);
    this.isShowItemGroupDialog = true;
  }

  editItemGroup(itemGroupId: string) {
    this.itemGroupService.editItemGroupFromLegal(itemGroupId);
    this.isShowItemGroupDialog = true;
  }

  viewItemGroup(itemGroupId: string) {
    console.log(itemGroupId);
  }

  deactiveItemGroup() {

  }

  saveItemGroup() {
    if (!this.itemGroupForm.valid) {
      this.genaralService.validateAllFormFields(this.itemGroupForm);
    } else {
      this.itemGroupService.saveItemGroupToLegal(this.itemGroupForm.value, this.itemGroupSearchEntity).then(res => {
        this.isShowItemGroupDialog = res;
      }).catch(err => {
        this.isShowItemGroupDialog = err;
      });
    }
  }

  itemGroupOnRowSelect(event: any) {
    if (event.data) {
      this.itemGroupId = event.data.id;
      this.clearSearchItemsFromItemGroup(this.tableItems);
    }
  }

  // itemsFromItemGroup:
  getitemsFromItemGroupList() {
    this.paginationItems.pageNumber = 1;
    this.itemsFromItemGroupSearchEntity.skip = 0;
    this.itemsFromItemGroupSearchEntity.take = this.paginationItems.take;
    if (this.itemGroupId !== null && this.itemGroupId !== undefined) {
      this.itemsFromItemGroupSearchEntity.itemGroupingId = this.itemGroupId;
    }
    this.itemGroupService.getItemsFromItemGroup(this.itemsFromItemGroupSearchEntity);
  }

  sortItemsFromItemGroup(event: any) {
    if (event.sortField && event.sortOrder) {
      this.itemsFromItemGroupSearchEntity.orderBy = event.sortField;
      this.itemsFromItemGroupSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getitemsFromItemGroupList();
  }

  paginationOutItemsFromItemGroup(pagination: PaginationModel) {
    this.itemsFromItemGroupSearchEntity.skip = pagination.skip;
    this.itemsFromItemGroupSearchEntity.take = pagination.take;
    this.itemGroupService.getItemsFromItemGroup(this.itemsFromItemGroupSearchEntity);
  }

  clearSearchItemsFromItemGroup(table: any) {
    this.itemsFromItemGroupSearchEntity = new ItemSearchEntity();
    table.reset();
  }

  // item:
  itemOpen(id: string) {
    this.itemSearchEntity = new ItemSearchEntity();
    this.itemSearchEntity.ids = [...this.itemsFromItemGroupIds];
    this.itemGroupService.dropDownItemList(this.itemSearchEntity);
  }

  itemTypingSearch(event: string) {
    this.itemSearchEntity = new ItemSearchEntity();
    this.itemSearchEntity.name.startsWith = event;
    this.itemTyping.next(this.itemSearchEntity);
  }

  addItemsToItemGroup() {
    this.itemGroupService.addItemsToItemGroup(this.itemsFromItemGroupIds, this.itemGroupId);
    this.itemsFromItemGroupIds = [];
    this.clearSearchItemsFromItemGroup(this.tableItems);
  }

  deleteItemFromItemGroup(itemId: string) {
    this.itemGroupService.deleteItemFromItemGroup(itemId, this.itemGroupId);
    this.clearSearchItemsFromItemGroup(this.tableItems);
  }

  editItemFromItemGroup(itemId: string) {
    if (itemId) {
      this.router.navigate(['/master-data/legal-entity/item-group/item-detail'], { queryParams: { id: itemId } });
    }
  }

  viewItemFromItemGroup(itemId: string) {
    if (itemId) {
      this.router.navigate(['/master-data/legal-entity/item-group/item-view'], { queryParams: { id: itemId } });
    }
  }
}
