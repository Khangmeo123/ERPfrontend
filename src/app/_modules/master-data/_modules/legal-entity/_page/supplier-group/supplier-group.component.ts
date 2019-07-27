import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {SupplierGroupSearchEntity} from '../../../../_backend/supplier-group/supplier-group.searchentity';
import {SupplierGroupEntity} from '../../../../_backend/supplier-group/supplier-group.entity';
import {FormGroup} from '@angular/forms';
import {Subject, Subscription} from 'rxjs';
import {SupplierEntity} from '../../../../_backend/supplier/supplier.entity';
import {SupplierSearchEntity} from '../../../../_backend/supplier/supplier.searchentity';
import {BookmarkService} from '../../../../../../_services';
import {Router} from '@angular/router';
import {SupplierGroupService} from './supplier-group.service';
import {GeneralService} from '../../../../../../_helpers/general-service.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';

@Component({
  selector: 'app-supplier-group',
  templateUrl: './supplier-group.component.html',
  styleUrls: ['./supplier-group.component.scss'],
  providers: [SupplierGroupService]
})
export class SupplierGroupComponent implements OnInit, OnDestroy {

  pageTitle = _('supplierGroup.header.title');
  isSaveBookMark: boolean = false;
  bookMarkId: string;
  display: boolean = false;
  pagination = new PaginationModel();
  paginationdetail = new PaginationModel();
  selectedSupplier: any;

  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  supplierGroupSearchEntity: SupplierGroupSearchEntity = new SupplierGroupSearchEntity();
  supplierGroupList: SupplierGroupEntity[];
  supplierGroupForm: FormGroup;
  supplierGroupSubs: Subscription = new Subscription();


  legalEntityIds: LegalEntity[];
  legalEntityExceptIds: LegalEntity[];
  leGalEntityTyping: Subject<LegalSearchEntity> = new Subject();
  legalEntityId: string = '';
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  supplierIds: SupplierEntity[];
  supplierExceptIds: SupplierEntity[];
  supplierTyping: Subject<SupplierSearchEntity> = new Subject();
  supplierSearchEntity: SupplierSearchEntity = new SupplierSearchEntity();
  supplierDetailList: SupplierEntity[];
  supplierDetailSubs: Subscription = new Subscription();

  listSupplierId = [];
  legalId: string;


  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private supplierGroupService: SupplierGroupService,
    private genaralService: GeneralService) {
    const supplierGroupListSub = this.supplierGroupService.supplierGroupList.subscribe(res => {
      if (res) {
        this.supplierGroupList = res;
        this.selectedSupplier = res[0];
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

    const legalEntityListSub = this.supplierGroupService.legalList.subscribe(res => {
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

  // drop legal entity
  legalSearch(event) {
    this.legalSearchEntity.code = event;
    this.legalSearchEntity.name = event;
    this.leGalEntityTyping.next(this.legalSearchEntity);
  }
  selectLegal(event) {
    this.supplierGroupSearchEntity.legalEntityId = event[0];
    this.legalEntityId = event[0];
    this.getList();
  }
  // drop supplier
  openSupplierList(id: []) {
    this.supplierSearchEntity = new SupplierSearchEntity();
    this.supplierSearchEntity.ids = id;
    this.supplierGroupService.getListSupplierOfSupplierGroup(this.supplierSearchEntity);
  }

  suppplierSearchApp(event) {
    this.supplierSearchEntity.code = event;
    this.supplierSearchEntity.name = event;
    this.supplierTyping.next(this.supplierSearchEntity);
  }

  selectSupplierApp(event) {
    console.log('selectSupplierApp', event)
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
    console.log('sortSupplierGroup')
    if (event.sortField && event.sortOrder) {
      this.supplierGroupSearchEntity.orderBy = event.sortField;
      this.supplierGroupSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }

    this.supplierGroupService.getList(this.supplierGroupSearchEntity).then(res =>{
      this.supplierSearchEntity.legalEntityId.equal = this.supplierGroupList[0].id;
      this.legalId = this.supplierSearchEntity.legalEntityId.equal;
      this.supplierGroupService.getListSupplierDetail(this.supplierSearchEntity);
    });
  }

  sortSupplier(event) {
    if (event.sortField && event.sortOrder) {
      this.supplierSearchEntity.orderBy = event.sortField;
      this.supplierSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    if(this.supplierSearchEntity.legalEntityId.equal !== '') {
      this.getListDetail();
    }
  }

  save() {
    if (!this.supplierGroupForm.valid) {
      this.genaralService.validateAllFormFields(this.supplierGroupForm);
    } else {
      this.supplierGroupService.save(this.supplierGroupForm.value,this.supplierGroupSearchEntity).then(res => {
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
    // this.supplierSearchEntity.supplierGroupingId = id;
    // this.supplierSearchEntity.legalEntityId = this.legalEntityId;
    this.getListDetail();
    console.log('onClickDetail id: ', id);
  }


  onClickShowDetail(id) {
    //  }
    this.router.navigate(['/master-data/legal-entity/supplier-group/supplier-detail'],{ queryParams: { id: id }});
  }

  onClickAddSupplier() {
    this.supplierSearchEntity.supplierIds = this.listSupplierId;
    this.supplierSearchEntity.legalEntityId.equal = this.legalId;
    this.supplierGroupService.saveSupplier(this.supplierSearchEntity).then(res => {
      this.supplierGroupService.getListSupplierDetail(this.supplierSearchEntity);
    }).catch(err => {
    });
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
