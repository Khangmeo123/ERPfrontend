import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit {

  isOpenTab1: boolean = true;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  onClickOpen() {
    this.isOpenTab1 = !this.isOpenTab1;
  }

}
