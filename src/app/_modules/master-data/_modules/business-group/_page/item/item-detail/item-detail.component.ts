import { GeneralService } from 'src/app/_helpers/general-service.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import { UomEntity } from './../../../../../_backend/uom/uom.entity';
import { FormGroup } from '@angular/forms';
import { ItemDetailService } from './item-detail.service';
@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = 'asset.header.title';
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  itemForm: FormGroup;
  // uom:
  uomList: UomEntity[];
  uomExceptIds: UomEntity[];
  uomIds: UomEntity[];
  // unitPrice:

  itemDetailSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;

  constructor(private route: ActivatedRoute, private itemDetailService: ItemDetailService, private generalService: GeneralService) {
    this.route.queryParams
      .subscribe(params => {
        this.itemDetailService.getId(params.id);
      });
    const itemFormSub = this.itemDetailService.itemForm.subscribe(res => {
      if (res) {
        this.itemForm = res;
      }
    });
    this.itemDetailSubs.add(itemFormSub);
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.itemDetailSubs.unsubscribe();
  }

  delete() {
    this.itemDetailService.delete(this.itemForm.value);
  }

  save() {
    if (!this.itemForm.valid) {
      this.generalService.validateAllFormFields(this.itemForm);
    } else {
      this.itemDetailService.save(this.itemForm);
    }
  }
}
