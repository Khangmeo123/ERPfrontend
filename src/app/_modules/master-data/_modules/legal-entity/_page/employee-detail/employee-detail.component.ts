import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-detail-employee-of-legal-entity',
  templateUrl: './detail-employee-of-legal-entity.component.html',
  styleUrls: ['./detail-employee-of-legal-entity.component.scss']
})
export class DetailEmployeeOfLegalEntityComponent implements OnInit {

  
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
