import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-customer-group',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
})
export class CustomerDetailComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(),
  });

  bankAccountsModal = false;

  contactsModal = false;

  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;

  isSavedBookMark = false;

  onClickSaveBookMark(event) {

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
