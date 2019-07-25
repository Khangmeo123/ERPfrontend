import { UomSearchEntity } from './../../../../../_backend/uom/uom.searchentity';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription, Subject } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import { UomEntity } from './../../../../../_backend/uom/uom.entity';
import { FormGroup } from '@angular/forms';
import { ItemDetailService } from './item-detail.service';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { translate } from 'src/app/_helpers/string';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = translate('item.detail.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  itemForm: FormGroup;
  // uom:
  uomTyping: Subject<UomSearchEntity> = new Subject();
  uomSearchEntity: UomSearchEntity = new UomSearchEntity();
  uomExceptIds: UomEntity[];
  uomIds: UomEntity[];
  // characteristic:
  characteristicList: EnumEntity[];
  // status:
  statusList: EnumEntity[];
  itemDetailSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;

  constructor(private route: ActivatedRoute, private itemDetailService: ItemDetailService, private router: Router,
    private generalService: GeneralService) {
    this.route.queryParams
      .subscribe(params => {
        this.itemDetailService.getId(params.id);
      });
    const itemFormSub = this.itemDetailService.itemForm.subscribe(res => {
      if (res) {
        this.itemForm = res;
      }
    });
    const characteristicListSub = this.itemDetailService.characteristicList.subscribe(res => {
      if (res) {
        this.characteristicList = res;
      }
    });
    const statusListSub = this.itemDetailService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    const uomListSub = this.itemDetailService.uomList.subscribe(res => {
      if (res) {
        this.uomExceptIds = res.exceptIds;
        this.uomIds = res.ids;
      }
    });
    this.itemDetailService.getUomListByTyping(this.uomTyping);
    this.itemDetailSubs.add(itemFormSub).add(characteristicListSub).add(statusListSub);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.itemDetailSubs.unsubscribe();
  }

  cancel() {
    this.router.navigate(['/master-data/business-group/item/item-list']);
  }

  delete() {
    this.itemDetailService.delete(this.itemForm.value).then(res => {
      this.router.navigate(['/master-data/business-group/item/item-list']);
    });
  }

  save() {
    if (!this.itemForm.valid) {
      this.generalService.validateAllFormFields(this.itemForm);
    } else {
      this.itemDetailService.save(this.itemForm.value).then(res => {
        this.router.navigate(['/master-data/business-group/item/item-list']);
      });
    }
  }

  openStatusList() {
    if (this.statusList.length === 0) {
      this.itemDetailService.getStatusList();
    }
  }

  openCharacteristicList() {
    if (this.characteristicList.length === 0) {
      this.itemDetailService.getCharacteristicList();
    }
  }

  openUomList(uomId: string) {
    this.uomSearchEntity = new UomSearchEntity();
    this.uomSearchEntity.ids.push(uomId);
    this.itemDetailService.getUomList(this.uomSearchEntity);
  }

  searchUom(event: string) {
    this.uomSearchEntity = new UomSearchEntity();
    this.uomSearchEntity.name.startsWith = event;
    this.uomTyping.next(this.uomSearchEntity);
  }


}
