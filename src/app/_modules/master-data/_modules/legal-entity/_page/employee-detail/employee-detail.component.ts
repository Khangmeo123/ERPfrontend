import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-detail-employee-of-legal-entity',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss']
})
export class EmployeeDetailComponent implements OnInit {

  
  displayContact : boolean = false;
  
  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  constructor() { }

  ngOnInit() {
  }
  
  onClickOpenTab1() {
    this.isOpenTab1 = !this.isOpenTab1;
  }

  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2;
  }
  

  showAddcontact(){
    
    this.displayContact = !this.displayContact;
  }
 
}
