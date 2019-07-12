import { Component, OnInit } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {

  isOpenTab1: boolean = true;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;
  display: boolean = false;
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

  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2;
  }

  onClickOpenTab3() {
    this.isOpenTab3 = !this.isOpenTab3;
  }

  onClickAddInfo() {
    this.display = true;
  }

}
