import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { translate } from 'src/app/_helpers/string';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { Subscription } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerDetailService } from './customer-detail.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss'],
  providers: [CustomerDetailService],
})
export class CustomerDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = translate('customer.detail.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  customerForm: FormGroup;
  customerDetailSubs: Subscription = new Subscription();
  // status:
  statusList: EnumEntity[];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  isOpenTab1: boolean = true;

  constructor(private route: ActivatedRoute, private customerDetailService: CustomerDetailService, private router: Router,
    private generalService: GeneralService) {
    this.route.queryParams
      .subscribe(params => {
        this.customerDetailService.getId(params.id);
      });
    const customerFormSub = this.customerDetailService.customerForm.subscribe(res => {
      if (res) {
        this.customerForm = res;
      }
    });
    const statusListSub = this.customerDetailService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    this.customerDetailSubs.add(customerFormSub).add(statusListSub);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.customerDetailSubs.unsubscribe();
  }

  cancel() {
    this.router.navigate(['/master-data/business-group/customer/customer-list']);
  }

  delete() {
    this.customerDetailService.delete(this.customerForm.value).then(res => {
      this.router.navigate(['/master-data/business-group/customer/customer-list']);
    });
  }

  save() {
    if (!this.customerForm.valid) {
      this.generalService.validateAllFormFields(this.customerForm);
    } else {
      this.customerDetailService.save(this.customerForm).then(res => {
        this.router.navigate(['/master-data/business-group/customer/customer-list']);
      });
    }
  }

  openStatusList() {
    if (this.statusList.length === 0) {
      this.customerDetailService.getStatusList();
    }
  }


}
