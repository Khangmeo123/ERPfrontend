import {
  EmployeeDetailSearchEntity,
  InventoryOrganizationSearchEntity,
} from '../../../../_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { translate } from '../../../../../../_helpers/string';
import { Router } from '@angular/router';
import { GoodsReceiptPOListService } from './goods-receipt-po-list.service';
import { GeneralService } from 'src/app/_services/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { GoodsReceiptPOEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { GoodsReceiptPOSearchEntity } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { EnumEntity } from 'src/app/_helpers/entity';
import { GoodsReceiptPOListRepository } from './goods-receipt-po-list.repository';
import { IColumn } from 'jaja-libraries/src/table-column-toggler/table-column-toggler/table-column-toggler.component';
import { TranslateService } from '@ngx-translate/core';

const columns: string[] = [
  'supplierDetail',
  'supplierContact',
  'documentNumber',
  'documentReference',
  'status',
  'postingDate',
  'dueDate',
  'documentDate',
  'buyer',
  'owner',
  'requester',
  'remarks',
  'inventoryOrganization',
  'quantity',
  'total',
  'freight',
  'packageDimension',
  'packageWeight',
];

@Component({
  selector: 'app-goods-receipt-po-list',
  templateUrl: './goods-receipt-po-list.component.html',
  styleUrls: ['./goods-receipt-po-list.component.scss'],
  providers: [
    GoodsReceiptPOListService,
    TranslateService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class GoodsReceiptPOListComponent implements OnInit, OnDestroy {

  columns: IColumn[] = [
    {
      header: translate('goodsReceiptPO.columns.supplierDetail'),
      field: 'supplierDetail',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.supplierContact'),
      field: 'supplierContact',
    },
    {
      header: translate('goodsReceiptPO.columns.documentNumber'),
      field: 'documentNumber',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.documentReference'),
      field: 'documentReference',
    },
    {
      header: translate('goodsReceiptPO.columns.status'),
      field: 'status',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.postingDate'),
      field: 'postingDate',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.dueDate'),
      field: 'dueDate',
    },
    {
      header: translate('goodsReceiptPO.columns.documentDate'),
      field: 'documentDate',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.buyer'),
      field: 'buyer',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.owner'),
      field: 'owner',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.requester'),
      field: 'requester',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.remarks'),
      field: 'remarks',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.inventoryOrganization'),
      field: 'inventoryOrganization',
      isSelected: true,
    },
    {
      header: translate('goodsReceiptPO.columns.quantity'),
      field: 'quantity',
    },
    {
      header: translate('goodsReceiptPO.columns.total'),
      field: 'total',
    },
    {
      header: translate('goodsReceiptPO.columns.freight'),
      field: 'freight',
    },
    {
      header: translate('goodsReceiptPO.columns.packageDimension'),
      field: 'packageDimension',
    },
    {
      header: translate('goodsReceiptPO.columns.packageWeight'),
      field: 'packageWeight',
    },
  ];

  selectedColumns: IColumn[] = [];

  pageTitle = translate('goodsReceiptPO.header.title');

  isBookMark: boolean = false;

  pagination: PaginationModel = new PaginationModel();

  goodsReceiptPOSubs: Subscription = new Subscription();

  // goodReceiptPO
  goodsReceiptPOList: GoodsReceiptPOEntity[];
  goodsReceiptPOSearchEntity: GoodsReceiptPOSearchEntity = new GoodsReceiptPOSearchEntity();

  // requester:
  requesterSearchEntity: EmployeeDetailSearchEntity = new EmployeeDetailSearchEntity();

  // inventoryOrganization:
  inventoryOrganizationSearchEntity: InventoryOrganizationSearchEntity = new InventoryOrganizationSearchEntity();

  // status:
  statusList: EnumEntity[];

  constructor(
    private goodsReceiptPOService: GoodsReceiptPOListService,
    private generalService: GeneralService,
    private bookmarkService: BookmarkService,
    private router: Router,
    private goodsReceiptPOListRepository: GoodsReceiptPOListRepository,
    private translateService: TranslateService,
  ) {
    // goodReceiptPO
    const goodReceiptPOListSub = this.goodsReceiptPOService.goodsReceiptPOList.subscribe((res) => {
      if (res) {
        this.goodsReceiptPOList = res;
      }
    });
    const goodReceiptPOCountSub = this.goodsReceiptPOService.goodsReceiptPOCount.subscribe((res) => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    // status:
    const statusListSub = this.goodsReceiptPOService.statusList.subscribe((res) => {
      if (res) {
        this.statusList = res;
      }
    });
    // bookmark:
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe((res) => {
      this.isBookMark = res;
    });
    this.bookmarkService.checkBookMarks({name: this.pageTitle, route: this.router.url});

    this.columns.forEach((column: IColumn) => {
      const translateSubscription: Subscription = this.translateService.get(column.header)
        .subscribe((translatedString: string) => {
          column.header = translatedString;
        });
      this.goodsReceiptPOSubs.add(translateSubscription);
    });

    // add subscription:
    this.goodsReceiptPOSubs
      .add(goodReceiptPOListSub)
      .add(goodReceiptPOCountSub)
      .add(statusListSub)
      .add(bookMarkNotify);
  }

  get selectedKeys(): {[key: string]: boolean} {
    const selectedKeys = {};
    this.columns.forEach((column: IColumn) => {
      if (column.isSelected) {
        selectedKeys[column.field] = true;
      }
    });
    return selectedKeys;
  }

  ngOnInit() {
  }

  // goodsReceiptPO:

  ngOnDestroy() {
    this.goodsReceiptPOSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.goodsReceiptPOSearchEntity.skip = 0;
    this.goodsReceiptPOSearchEntity.take = this.pagination.take;
    this.goodsReceiptPOService.getList(this.goodsReceiptPOSearchEntity);
  }

  paginationOut(pagination) {
    this.goodsReceiptPOSearchEntity.skip = pagination.skip;
    this.goodsReceiptPOSearchEntity.take = pagination.take;
    this.goodsReceiptPOService.getList(this.goodsReceiptPOSearchEntity);
  }

  clearSearch(table: any) {
    this.goodsReceiptPOSearchEntity = new GoodsReceiptPOSearchEntity();
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.goodsReceiptPOSearchEntity.orderBy = event.sortField;
      this.goodsReceiptPOSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
  }

  bookMark() {
    this.isBookMark = !this.isBookMark;
    if (this.isBookMark) {
      this.bookmarkService.addBookMarks({name: this.pageTitle, route: this.router.url});
    } else {
      this.bookmarkService.deleteBookMarks({name: this.pageTitle, route: this.router.url});
    }
  }

  addGoodsReceipt() {
    return this.router.navigate(['inventory/receipt/goods-receipt-po/goods-receipt-po-detail']);
  }

  onFilterInventoryOrganization(inventoryOrganization) {
    this.goodsReceiptPOSearchEntity.inventoryOrganizationId = inventoryOrganization.id;
    this.goodsReceiptPOSearchEntity.inventoryOrganizationCode = inventoryOrganization.code;
    this.getList();
  }

  onFilterStatus(status) {
    this.goodsReceiptPOSearchEntity.statusId = status.id;
    this.goodsReceiptPOSearchEntity.statusDisplay = status.display;
    this.getList();
  }

  onFilterRequester(requester) {
    this.goodsReceiptPOSearchEntity.requesterId = requester.id;
    this.goodsReceiptPOSearchEntity.requesterName = requester.name;
    this.getList();
  }

  onGetContent = (rowData) => {
    if (!rowData.goodsReceiptPOContent) {
      this.goodsReceiptPOListRepository.getDetail(rowData.id)
        .subscribe(
          (goodsReceiptPOEntity: GoodsReceiptPOEntity) => {
            rowData.goodsReceiptPOContents = goodsReceiptPOEntity.goodsReceiptPOContents;
          },
        );
    }
  };
}
