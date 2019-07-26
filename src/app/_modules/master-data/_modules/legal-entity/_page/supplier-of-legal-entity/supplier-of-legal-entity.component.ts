import {Component, OnDestroy, OnInit} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {LegalSearchEntity} from '../../../../_backend/legal/legal.searchentity';
import {LegalEntity} from '../../../../_backend/legal/legal.entity';
import {SupplierSearchEntity} from '../../../../_backend/supplier/supplier.searchentity';
import {SupplierEntity} from '../../../../_backend/supplier/supplier.entity';
import {Subject, Subscription} from 'rxjs';
import {TextFilter} from '../../../../../../_shared/models/filters/TextFilter';
import {Router} from '@angular/router';
import {BookmarkService} from '../../../../../../_services';
import {SupplierOfLegalEntityService} from './supplier-of-legal-entity.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';

@Component({
  selector: 'app-supplier-of-legal-entity',
  templateUrl: './supplier-of-legal-entity.component.html',
  styleUrls: ['./supplier-of-legal-entity.component.scss'],
  providers: [SupplierOfLegalEntityService],
})
export class SupplierOfLegalEntityComponent implements OnInit, OnDestroy {

  pageTitle = _('legal_entity.header.title');
  pagination = new PaginationModel();
  paginationdetail = new PaginationModel();

  display: boolean = false;
  isAddGroup = false;

  isAddCustomer = false;
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  legalList: LegalEntity[];
  supplierSearchEntity: SupplierSearchEntity = new SupplierSearchEntity();
  supplierList: SupplierEntity[];


  legalSubs: Subscription = new Subscription();

  isSaveBookMark: boolean = false;
  bookMarkId: string;

  supplierIds: SupplierEntity[];
  supplierExceptIds: SupplierEntity[];
  supplierTyping: Subject<SupplierSearchEntity> = new Subject();
  legalId: string;
  listSupplierId = [];

  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  constructor(
    protected router: Router,
    private bookmarkService: BookmarkService,
    private listLegalOfLegalEntityService: SupplierOfLegalEntityService) {
    const legalListSub = this.listLegalOfLegalEntityService.legalEntityList.subscribe(res => {
      if (res) {
        this.legalList = res;
      }
    });
    const legalListCountSub = this.listLegalOfLegalEntityService.legalEntityCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    const supplierListSub = this.listLegalOfLegalEntityService.supplierList.subscribe(res => {
      if (res) {
        this.supplierList = res;
      }
    });
    const supplierListCountSub = this.listLegalOfLegalEntityService.supplierCount.subscribe(res => {
      if (res) {
        this.paginationdetail.totalItems = res;
      }
    });

    const supplierOfLegalListSub = this.listLegalOfLegalEntityService.supplierListOflegalEntity.subscribe(res => {
      console.log(res);
      if (res) {
        this.supplierIds = res.ids;
        this.supplierExceptIds = res.exceptIds;
      }
    });

    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });

    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.legalSubs.add(legalListSub).add(legalListCountSub).add(bookMarkNotify)
      .add(supplierListSub).add(supplierListCountSub).add(supplierOfLegalListSub);
  }


  ngOnInit() {
    this.legalSearchEntity.skip = this.pagination.skip;
    this.legalSearchEntity.take = this.pagination.take;

    this.supplierSearchEntity.skip = this.paginationdetail.skip;
    this.supplierSearchEntity.take = this.paginationdetail.take;
  }

  ngOnDestroy() {
    this.legalSubs.unsubscribe();
  }

  openSupplierList(id: []) {
    this.supplierSearchEntity = new SupplierSearchEntity();
    this.supplierSearchEntity.ids = id;
    this.listLegalOfLegalEntityService.getListSupplierOflegalEntity(this.supplierSearchEntity);
  }

  supplierSearch(event) {
    this.supplierSearchEntity.code.startsWith = event;
    this.supplierSearchEntity.name.startsWith = event;
    this.supplierTyping.next(this.supplierSearchEntity);
  }
  selectSupplier(event) {
    this.listSupplierId = event;
  }


  onClickShowDetail(supplierId) {
    this.router.navigate(['/master-data/legal-entity/supplier-of-legal-entity/supplier-detail'],
      {queryParams: {id: supplierId}});
  }

  toDetail(legalId) {
    this.legalId = legalId;
    this.supplierSearchEntity.legalEntityId = legalId;
    this.getListSupplier(this.supplierSearchEntity);
  }

  showDialog() {
    this.display = true;
  }

  sortLegalEntiy(event: any) {
    if (event.sortField && event.sortOrder) {
      this.legalSearchEntity.orderBy = event.sortField;
      this.legalSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.listLegalOfLegalEntityService.getListLegal(this.legalSearchEntity).then(res =>{
      this.supplierSearchEntity.legalEntityId = this.legalList[0].id;
      this.legalId = this.supplierSearchEntity.legalEntityId;
      this.listLegalOfLegalEntityService.getListSupplier(this.supplierSearchEntity);
    });
  }

  sortSupplier(event) {
    if (event.sortField && event.sortOrder) {
      this.supplierSearchEntity.orderBy = event.sortField;
      this.supplierSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }

    if(this.supplierSearchEntity.legalEntityId !== '') {
      this.getListSupplier(this.supplierSearchEntity);
    }
  }

  paginationOut(pagination: PaginationModel) {
    this.legalSearchEntity.skip = pagination.skip;
    this.legalSearchEntity.take = pagination.take;
    this.listLegalOfLegalEntityService.getListLegal(this.legalSearchEntity);
  }

  paginationDetailOut(pagination: PaginationModel) {
    this.supplierSearchEntity.skip = pagination.skip;
    this.supplierSearchEntity.take = pagination.take;
    this.listLegalOfLegalEntityService.getListSupplier(this.supplierSearchEntity);
  }


  getListLegalEntity() {
    this.pagination.pageNumber = 1;
    this.legalSearchEntity.skip = 0;
    this.legalSearchEntity.take = this.pagination.take;
    this.listLegalOfLegalEntityService.getListLegal(this.legalSearchEntity);
  }

  getListSupplier(supplier) {
    this.paginationdetail.pageNumber = 1;
    this.supplierSearchEntity.skip = 0;
    this.supplierSearchEntity.take = this.paginationdetail.take;
    this.listLegalOfLegalEntityService.getListSupplier(this.supplierSearchEntity);
  }

  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }

  onClickAddsupplier () {
    this.supplierSearchEntity.supplierIds = this.listSupplierId;
    this.supplierSearchEntity.legalEntityId = this.legalId;
    this.listLegalOfLegalEntityService.save(this.supplierSearchEntity).then(res => {
      this.listLegalOfLegalEntityService.getListSupplier(this.supplierSearchEntity);
    }).catch(err => {
    });
  }

  deleteSupplier(supplier) {
    this.supplierSearchEntity.id = supplier.id;
    this.supplierSearchEntity.name = supplier.name;
    this.supplierSearchEntity.code = supplier.code;
    this.listLegalOfLegalEntityService.delete(this.supplierSearchEntity).then(res => {
      this.getListSupplier(this.supplierSearchEntity);
    }).catch(err => {
    });
  }

  clearSearchSupplier(tableSupplier: any) {
    this.supplierSearchEntity = new SupplierSearchEntity();
    this.supplierSearchEntity.supplierIds = this.supplierIds;
    tableSupplier.reset();
  }

  clearSearch(table: any) {
    this.legalSearchEntity = new LegalSearchEntity();
    table.reset();
  }

}
