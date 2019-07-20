import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-item',
  templateUrl: './detail-item.component.html',
  styleUrls: ['./detail-item.component.scss']
})
export class DetailItemComponent implements OnInit {
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;
  constructor() { }


  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  ngOnInit() {
  }

  onClickOpen() {
    this.isOpenTab1 = !this.isOpenTab1;
  }

  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2;
  }


}
