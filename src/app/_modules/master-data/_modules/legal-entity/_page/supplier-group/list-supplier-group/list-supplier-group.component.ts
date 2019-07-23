import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Router } from '@angular/router';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { SupplierGroupSearchEntity } from 'src/app/_modules/master-data/_backend/supplier-group/supplier-group.searchentity';
import { SupplierGroupEntity } from 'src/app/_modules/master-data/_backend/supplier-group/supplier-group.entity';
import { FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { BookmarkService } from 'src/app/_services';
import { ListSupplierGroupService } from './list-supplier-group.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { SupplierSearchEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.searchentity';
import { SupplierEntity } from 'src/app/_modules/master-data/_backend/supplier/supplier.entity';
@Component({
  selector: 'app-list-supplier-group',
  templateUrl: './list-supplier-group.component.html',
  styleUrls: ['./list-supplier-group.component.scss'],
  providers: [ListSupplierGroupService]
})
export class ListSupplierGroupComponent implements OnInit, OnDestroy {
  pageTitle = _('supplierGroup.header.title');
  isSaveBookMark: boolean = false;
  bookMarkId: string;
  display: boolean = false;
  pagination = new PaginationModel();
  paginationdetail = new PaginationModel();


  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  supplierGroupSearchEntity: SupplierGroupSearchEntity = new SupplierGroupSearchEntity();
  supplierGroupList: SupplierGroupEntity[];
  supplierGroupForm: FormGroup;
  supplierGroupSubs: Subscription = new Subscription();


  legalEntityIds: SupplierGroupEntity[];
  legalEntityExceptIds: SupplierGroupEntity[];
  leGalEntityTyping: Subject<SupplierGroupSearchEntity> = new Subject();
  legalEntityId: string = '';

  supplierIds: SupplierEntity[];
  supplierExceptIds: SupplierEntity[];
  supplierTyping: Subject<SupplierSearchEntity> = new Subject();
  supplierSearchEntity: SupplierSearchEntity = new SupplierSearchEntity();
  supplierDetailList: SupplierEntity[];
  supplierDetailSubs: Subscription = new Subscription();

  tmpSupplier = [
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
    {
      code: 1,
      name: 'Nguyễn Thị Hương',
    },
  ]



  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private supplierGroupService: ListSupplierGroupService,
    private genaralService: GeneralService) {
    const supplierGroupListSub = this.supplierGroupService.supplierGroupList.subscribe(res => {
      if (res) {
        this.supplierGroupList = res;
      }
    });
    const supplierDetailListSub = this.supplierGroupService.supplierDetailList.subscribe(res => {
      if(res){
        this.supplierDetailList = res;
      }
    })

    const supplierGroupFormSub = this.supplierGroupService.supplierGroupForm.subscribe(res => {
      if (res) {
        this.supplierGroupForm = res;
      }
    });

    const legalEntityListSub = this.supplierGroupService.sobList.subscribe(res => {
      if (res) {
        this.legalEntityIds = res.ids;
        this.legalEntityExceptIds = res.exceptIds;
      }
    });

    const supplierListSub = this.supplierGroupService.supplierList.subscribe(res => {
      if (res) {
        this.supplierIds = res.ids;
        this.supplierExceptIds = res.exceptIds;
      }
    });


    const supplierGroupListCountSub = this.supplierGroupService.supplierGroupCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });

    this.supplierGroupService.getLisLegalEntityByTyping(this.leGalEntityTyping);
    this.supplierGroupService.getListSupplierOfSupplierGroupByTyping(this.supplierTyping);

    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.supplierGroupSubs.add(supplierGroupListSub).add(supplierGroupFormSub)
      .add(supplierGroupListCountSub).add(bookMarkNotify).add(legalEntityListSub).add(supplierListSub);
    this.supplierDetailSubs.add(supplierDetailListSub);

  }

  ngOnInit() {
    this.supplierGroupSearchEntity.skip = this.pagination.skip;
    this.supplierGroupSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.supplierGroupSubs.unsubscribe();
    this.supplierDetailSubs.unsubscribe();
  }

  sobSearch(event) {
    this.supplierGroupSearchEntity.code = event;
    this.supplierGroupSearchEntity.name = event;
    this.leGalEntityTyping.next(this.supplierGroupSearchEntity);
  }
  selectSob(event) {
    this.supplierGroupSearchEntity.legalEntityId = event[0];
    this.legalEntityId = event[0];
    this.getList();
  }

  openSupplierList(id: []) {
    console.log('openSupplierList', id)
    this.supplierSearchEntity = new SupplierSearchEntity();
    this.supplierSearchEntity.ids = id;
    this.supplierGroupService.getListSupplierOfSupplierGroup(this.supplierSearchEntity);
 }

  suppplierSearchApp(event) {

  }

  selectSupplierApp(event) {

  }

  getList() {
    this.pagination.pageNumber = 1;
    this.supplierGroupSearchEntity.skip = 0;
    this.supplierGroupSearchEntity.take = this.pagination.take;
    this.supplierGroupService.getList(this.supplierGroupSearchEntity);
  }

  getListDetail() {
    this.paginationdetail.pageNumber = 1;
    this.supplierSearchEntity.skip = 0;
    this.supplierSearchEntity.take = this.paginationdetail.take;
    this.supplierGroupService.getListSupplierDetail(this.supplierSearchEntity);
  }

  onClickAddGroup() {
    this.display = true;
    this.supplierGroupService.add(this.supplierGroupSearchEntity.legalEntityId);
  }

  clearSearchGroup(tableSupplierGroup: any) {
    this.supplierGroupSearchEntity = new SupplierGroupSearchEntity();
    this.supplierGroupSearchEntity.legalEntityId = this.legalEntityId;
    tableSupplierGroup.reset();
  }

  paginationGroupOut(pagination: PaginationModel) {
    this.supplierGroupSearchEntity.skip = pagination.skip;
    this.supplierGroupSearchEntity.take = pagination.take;
    this.supplierGroupService.getList(this.supplierGroupSearchEntity);
  }

  paginationDetailOut(pagination: PaginationModel) {
    this.supplierSearchEntity.skip = pagination.skip;
    this.supplierSearchEntity.take = pagination.take;
    this.supplierGroupService.getListSupplierDetail(this.supplierSearchEntity);
  }
  

  sortSupplierGroup(event) {
    if (event.sortField && event.sortOrder) {
      this.supplierGroupSearchEntity.orderBy = event.sortField;
      this.supplierGroupSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getList();
  }

  sortSupplier(event) {
    if (event.sortField && event.sortOrder) {
      this.supplierSearchEntity.orderBy = event.sortField;
      this.supplierSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
  }

  save() {
    if (!this.supplierGroupForm.valid) {
      this.genaralService.validateAllFormFields(this.supplierGroupForm);
    } else {
      this.supplierGroupService.save(this.supplierGroupForm.value, this.supplierGroupSearchEntity).then(res => {
        this.display = res;
      }).catch(err => {
        this.display = err;
      });
    }
  }

  edit(supplierGroupId: string) {
    this.supplierGroupService.edit(supplierGroupId);
    this.display = true;
  }

  delete() {
    this.supplierGroupService.delete(this.supplierGroupForm.value, this.supplierGroupSearchEntity).then(res => {
      this.display = res;
    }).catch(err => {
      this.display = err;
    });
  }

  onClickDetail(id: string) {
    this.supplierSearchEntity.supplierGroupingId = id;
    this.supplierSearchEntity.legalEntityId = this.legalEntityId;
    this.getListDetail();
    console.log('onClickDetail id: ', id);
  }


  onClickShowDetail(id: any) {
    // ,{ queryParams: { id: id } }
      this.router.navigate(['/master-data/legal-entity/supplier-group/detail-supplier-group']);
  }

  onClickAddSupplier() {
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
