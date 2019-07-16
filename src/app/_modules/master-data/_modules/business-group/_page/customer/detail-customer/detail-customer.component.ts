import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.scss'],
})
export class DetailCustomerComponent implements OnInit, OnDestroy {
  form = new FormGroup({
    name: new FormControl(),
  });

  bankAccountsModal = false;

  contactsModal = false;

  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
  }

  toggleBankAccountsModal() {
    this.bankAccountsModal = !this.bankAccountsModal;
  }

  toggleContactsModal() {
    this.contactsModal = !this.contactsModal;
  }

  onClickOpen(event) {
    this.isOpenTab1 = !this.isOpenTab1;
  }

  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2;
  }

  onClickOpenTab3() {
    this.isOpenTab3 = !this.isOpenTab3;
  }
}
