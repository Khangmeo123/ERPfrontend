import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

@Component({
  selector: 'app-detail-supplier',
  templateUrl: './detail-supplier.component.html',
  styleUrls: ['./detail-supplier.component.scss']
})
export class DetailSupplierComponent implements OnInit {

  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;


  isOpenTab1: boolean = true;

  display: boolean = false;
  displayAccount: boolean = false;
  filters = {
    id: new TextFilter(),
    name_contact: new TextFilter(),
    relationship: new TextFilter(),
    phone: new TextFilter(),
    email: new TextFilter(),
    address: new TextFilter(),
  }

  
  constructor() { }

  ngOnInit() {
  }


  
  onClickOpen() {
    this.isOpenTab1 = !this.isOpenTab1;
  }

  onClickAddBank() {
    this.display = true;
  }

  onClickAddAccount() {
    this.displayAccount = true;
  }

}
