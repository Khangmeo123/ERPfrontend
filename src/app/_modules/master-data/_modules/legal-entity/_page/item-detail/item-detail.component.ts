import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { LegalItemDetailService } from './item-detail.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-item-of-legal-entity',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss'],
  providers: [LegalItemDetailService]
})
export class ItemDetailComponent implements OnInit {

  pageTitle = translate('legalItemDetail.header.title');
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  isChecked: boolean = false;
  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;
  isOpenTab4: boolean = false;
  isOpenTab5: boolean = false;
  isOpenTab6: boolean = false;
  isOpenModalDiscount: boolean = false;
  isOpenModalTransformationUnit: boolean = false;
  isOpenModalBillOfMaterias: boolean = false;
  itemDetailForm: FormGroup;
  redirectUrl: string;
  constructor(private route: ActivatedRoute, private legalItemDetailService: LegalItemDetailService,
    private genaralService: GeneralService, private router: Router) {
    this.route.queryParams
      .subscribe(params => {
        this.legalItemDetailService.getLegalItemDetail(params.id);
      });
    const itemDetailFormSub = this.legalItemDetailService.legalItemDetailForm.subscribe(res => {
      if (res) {
        this.itemDetailForm = res;
      }
    });
  }

  ngOnInit() {
    const currentUrl = this.router.url.split('/')[3];
    switch (currentUrl) {
      case 'item-of-legal-entity':
        this.redirectUrl = '/master-data/legal-entity/item-of-legal-entity';
        break;
      case 'item-group':
        this.redirectUrl = '/master-data/legal-entity/item-group';
        break;
    }
  }

  saveLegalItemDetail() {

  }

  cancelLegalItemDetail() {
    this.router.navigate([this.redirectUrl]);
  }

  onClickChange() {
    this.isChecked = !this.isChecked;
  }
}
