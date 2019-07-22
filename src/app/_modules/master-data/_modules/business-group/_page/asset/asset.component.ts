import { Component, OnInit, OnDestroy } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { AssetSearchEntity } from 'src/app/_modules/master-data/_backend/asset/asset.searchentity';
import { AssetEntity } from 'src/app/_modules/master-data/_backend/asset/asset.entity';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AssetService } from './asset.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { BookmarkService } from 'src/app/_services';
import { Router } from '@angular/router';
import { EnumEntity } from 'src/app/_helpers/entity';
import { translate } from 'src/app/_helpers/string';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.scss'],
  providers: [AssetService]
})
export class AssetComponent implements OnInit, OnDestroy {
  pageTitle: string = translate('asset.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  assetSearchEntity: AssetSearchEntity = new AssetSearchEntity();
  assetList: AssetEntity[];
  assetTypes: EnumEntity[];
  assetStatuses: EnumEntity[];
  assetForm: FormGroup;
  assetSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  constructor(private assetService: AssetService, private genaralService: GeneralService, private bookmarkService: BookmarkService,
    private router: Router) {
    const assetListSub = this.assetService.assetList.subscribe(res => {
      if (res) {
        this.assetList = res;
      }
    });
    const assetFormSub = this.assetService.assetForm.subscribe(res => {
      if (res) {
        this.assetForm = res;
      }
    });
    const assetCountSub = this.assetService.assetCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isBookMark = res;
    });
    const assetTypesSub = this.assetService.assetTypes.subscribe(res => {
      if (res) {
        this.assetTypes = res;
      }
    });
    const assetStatusesSub = this.assetService.assetStatuses.subscribe(res => {
      if (res) {
        this.assetStatuses = res;
      }
    })
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });

    this.assetSubs.add(assetListSub).add(assetFormSub).add(assetCountSub).add(assetTypesSub).add(assetStatusesSub).add(bookMarkNotify);
  }

  ngOnInit() {
    this.assetSearchEntity.skip = this.pagination.skip;
    this.assetSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.assetSubs.unsubscribe();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.assetSearchEntity.skip = 0;
    this.assetSearchEntity.take = this.pagination.take;
    this.assetService.getList(this.assetSearchEntity);
  }

  add() {
    this.assetService.add();
    this.isShowDialog = true;
  }

  edit(assetId: string) {
    this.assetService.edit(assetId);
    this.isShowDialog = true;
  }

  delete() {
    this.assetService.delete(this.assetForm.value, this.assetSearchEntity).then(res => {
      this.isShowDialog = res;
    }).catch(err => {
      this.isShowDialog = err;
    });
  }

  save() {
    if (!this.assetForm.valid) {
      this.genaralService.validateAllFormFields(this.assetForm);
    } else {
      this.assetService.save(this.assetForm.value, this.assetSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.assetSearchEntity.orderBy = event.sortField;
      this.assetSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    this.getList();
  }

  paginationOut(pagination: PaginationModel) {
    this.assetSearchEntity.skip = pagination.skip;
    this.assetSearchEntity.take = pagination.take;
    this.assetService.getList(this.assetSearchEntity);
  }

  clearSearch(table: any) {
    this.assetSearchEntity = new AssetSearchEntity();
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

  openAssetStatuses() {
    if (this.assetStatuses.length === 0) {
      this.assetService.getStatusList();
    }
  }

  openAssetTypes() {
    if (this.assetStatuses.length === 0) {
      this.assetService.getTypeList();
    }
  }
}
