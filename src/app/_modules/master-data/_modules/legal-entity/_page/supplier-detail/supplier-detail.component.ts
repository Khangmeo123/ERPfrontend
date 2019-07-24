import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierDetailService } from './supplier-detail.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-detail-supplier-group',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss'],
  providers: [SupplierDetailService]
})
export class SupplierDetailComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(),
  });

  bankAccountsModal = false;
  contactsModal = false;

  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;

  supplierDetailSubs: Subscription = new Subscription();
  supplierForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private supplierDetailService: SupplierDetailService,
    private router: Router,
    private generalService: GeneralService) {
    this.route.queryParams.subscribe(params => {
        this.supplierDetailService.getId(params.id);
    });

    // const supplierFormSub = this.supplierDetailService.supplierDetailForm.subscribe(res => {
    //   if (res) {
    //     this.supplierForm = res;
    //   }
    // });

    // this.supplierDetailSubs.add(supplierFormSub).add(statusListSub);
  }

  ngOnInit(): void {

  }

  onClickSaveBookMark(event) {

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

  sort(event) {

  }

  sortBankAccount(event) {

  }

  onClickDelete() {

  }
}
