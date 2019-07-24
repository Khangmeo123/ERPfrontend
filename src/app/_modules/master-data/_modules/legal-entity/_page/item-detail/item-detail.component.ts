import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-item-of-legal-entity',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
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

  onClickOpen() {
    this.isOpenTab1 = !this.isOpenTab1;
  }

  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2;
  }

  onClickOpenTab3() {
    this.isOpenTab3 = !this.isOpenTab3;
  }

  onClickOpenTab4() {
    this.isOpenTab4 = !this.isOpenTab4;
  }

  onClickAddDiscount() {
    this.isOpenModalDiscount = !this.isOpenModalDiscount;
  }

  onClickAddTransformationUnit() {
    this.isOpenModalTransformationUnit = !this.isOpenModalTransformationUnit;
  }

  onClickAddBillOfMaterias() {
    this.isOpenModalBillOfMaterias = !this.isOpenModalBillOfMaterias;
  }

  onClickChange() {
    this.isChecked = !this.isChecked;
  }
}
