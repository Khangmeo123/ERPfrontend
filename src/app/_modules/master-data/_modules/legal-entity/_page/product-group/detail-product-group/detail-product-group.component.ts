import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-product-group',
  templateUrl: './detail-product-group.component.html',
  styleUrls: ['./detail-product-group.component.scss']
})
export class DetailProductGroupComponent implements OnInit {

  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  constructor() { }


  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;
  isOpenTab4: boolean = false;

  isOpenModalDiscount: boolean = false;
  isOpenModalTransformationUnit: boolean = false;
  isOpenModalBillOfMaterias: boolean = false;
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

}
