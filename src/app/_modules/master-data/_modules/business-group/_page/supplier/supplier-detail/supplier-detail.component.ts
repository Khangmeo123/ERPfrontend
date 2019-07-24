import { Component, OnInit, OnDestroy } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { translate } from 'src/app/_helpers/string';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { EnumEntity } from 'src/app/_helpers/entity';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierDetailService } from './supplier-detail.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';

@Component({
  selector: 'app-supplier-detail',
  templateUrl: './supplier-detail.component.html',
  styleUrls: ['./supplier-detail.component.scss'],
  providers: [SupplierDetailService]
})
export class SupplierDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = translate('supplier.detail.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  supplierForm: FormGroup;
  supplierDetailSubs: Subscription = new Subscription();
  // status:
  statusList: EnumEntity[];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  isOpenTab1: boolean = true;

  constructor(private route: ActivatedRoute, private supplierDetailService: SupplierDetailService, private router: Router,
    private generalService: GeneralService) {
    this.route.queryParams
      .subscribe(params => {
        this.supplierDetailService.getId(params.id);
      });
    const supplierFormSub = this.supplierDetailService.supplierForm.subscribe(res => {
      if (res) {
        this.supplierForm = res;
      }
    });
    const statusListSub = this.supplierDetailService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    this.supplierDetailSubs.add(supplierFormSub).add(statusListSub);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.supplierDetailSubs.unsubscribe();
  }

  cancel() {
    this.router.navigate(['/master-data/business-group/supplier/supplier-list']);
  }

  delete() {
    this.supplierDetailService.delete(this.supplierForm.value).then(res => {
      this.router.navigate(['/master-data/business-group/supplier/supplier-list']);
    });
  }

  save() {
    if (!this.supplierForm.valid) {
      this.generalService.validateAllFormFields(this.supplierForm);
    } else {
      this.supplierDetailService.save(this.supplierForm).then(res => {
        this.router.navigate(['/master-data/business-group/supplier/supplier-list']);
      });
    }
  }

  openStatusList() {
    if (this.statusList.length === 0) {
      this.supplierDetailService.getStatusList();
    }
  }

}
