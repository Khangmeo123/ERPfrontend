import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-customer-of-legal-entity',
  templateUrl: './detail-customer-of-legal-entity.component.html',
  styleUrls: ['./detail-customer-of-legal-entity.component.scss']
})
export class DetailCustomerOfLegalEntityComponent implements OnInit {
  displayBank: boolean = false;
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
  showAddbank(){
    
    this.displayBank = !this.displayBank;
  }
}
