import { Component, OnInit } from '@angular/core';
import { translate } from 'src/app/_helpers/string';

@Component({
  selector: 'app-detail-item-of-legal-entity',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  pageTitle = translate('itemOfLegalEntity.header.title');
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  isChecked: boolean = false;
  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;
  isOpenTab4: boolean = false;
  isOpenModalDiscount: boolean = false;
  isOpenModalTransformationUnit: boolean = false;
  isOpenModalBillOfMaterias: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  onClickChange() {
    this.isChecked = !this.isChecked;
  }
}
