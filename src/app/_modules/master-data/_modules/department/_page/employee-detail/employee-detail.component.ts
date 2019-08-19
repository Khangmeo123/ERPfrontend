import { Component, OnInit, OnDestroy } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../../../../../../_services/general-service.service';
import { Subscription, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { DepartmentEmployeeDetailEntity } from 'src/app/_modules/master-data/_backend/department-employee-detail/department-employee-detail.entity';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentEmployeeDetailService } from './employee-detail.service';

@Component({
  selector: 'app-department-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  providers: [DepartmentEmployeeDetailService],
})
export class DepartmentEmployeeDetailComponent implements OnInit, OnDestroy {
  displayContact: boolean = false;

  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;
  isOpenTab4: boolean = false;

  // Form general employee detail
  departmentEmployeeDetailSubs: Subscription = new Subscription();
  departmentEmployeeDetailForm: FormGroup;
  departmentEmployeeDetailEntity: DepartmentEmployeeDetailEntity = new DepartmentEmployeeDetailEntity();

  // list drop province
  provinceIds: ProvinceEntity[];
  provinceExceptIds: ProvinceEntity[];
  provinceTyping: Subject<ProvinceSearchEntity> = new Subject();
  provinceSearchEntity: ProvinceSearchEntity = new ProvinceSearchEntity();

  // list drop bank
  bankIds: BankEntity[];
  bankExceptIds: BankEntity[];
  bankTyping: Subject<BankSearchEntity> = new Subject();
  bankSearchEntity: BankSearchEntity = new BankSearchEntity();

  contactForm: FormGroup;
  employeeIdQuery: string = '';
  routeLink: any;
  index: number = -1;

  valueSelector = node => node;


  constructor(
    private route: ActivatedRoute,
    private departmentEmployeeDetailService: DepartmentEmployeeDetailService,
    private router: Router,
    private generalService: GeneralService) {

    this.route.queryParams.subscribe(params => {
      if (params) {
        if (params.id) {
          this.employeeIdQuery = params.id;
          this.departmentEmployeeDetailService.getId(params.id);
        }
        if (params.route) {
          switch (params.route) {
            case 'hr-organization':
              this.routeLink = '/master-data/department/hr-organization';
              break;
            case 'project':
              this.routeLink = '/master-data/department/project';
              break;
          }
        }
      }
    });

    const employeeFormSub = this.departmentEmployeeDetailService.departmentEmployeeDetailForm.subscribe(res => {
      if (res) {
        this.departmentEmployeeDetailForm = res;
      }
    });

    const listProvince = this.departmentEmployeeDetailService.proviceList.subscribe(res => {
      if (res) {
        this.provinceIds = res.ids;
        this.provinceExceptIds = res.exceptIds;
      }
    });

    const listBank = this.departmentEmployeeDetailService.bankList.subscribe(res => {
      if (res) {
        this.bankIds = res.ids;
        this.bankExceptIds = res.exceptIds;
      }
    });

    const contactForm = this.departmentEmployeeDetailService.contactForm.subscribe(res => {
      if (res) {
        this.contactForm = res;
      }
    });

    this.departmentEmployeeDetailService.getListListBankByTyping(this.bankTyping);
    this.departmentEmployeeDetailService.getListProvinceByTyping(this.provinceTyping);
    this.departmentEmployeeDetailSubs.add(employeeFormSub).add(listProvince).add(listBank).add(contactForm);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.departmentEmployeeDetailSubs.unsubscribe();
  }

  deactiveItemDetail() {

  }
  // list drop bank list

  openBankList(bankId: string) {
    this.bankSearchEntity = new BankSearchEntity();
    if (bankId !== null && bankId.length > 0) {
      this.bankSearchEntity.ids.push(bankId);
    }
    this.departmentEmployeeDetailService.getListBank(this.bankSearchEntity);
  }


  bankSearch(event: any, bankId: string) {
    this.bankSearchEntity = new BankSearchEntity();
    this.bankSearchEntity.name.startsWith = event;
    if (bankId !== null && bankId.length > 0) {
      this.bankSearchEntity.ids.push(bankId);
    }
    this.bankTyping.next(this.bankSearchEntity);
  }

  // list drop province

  openProvinceList(provinceId: string) {
    this.provinceSearchEntity = new ProvinceSearchEntity();
    if (provinceId !== null && provinceId.length > 0) {
      this.provinceSearchEntity.ids.push(provinceId);
    }
    this.departmentEmployeeDetailService.getListProvince(this.provinceSearchEntity);
  }


  provinceSearch(event: any, id: string) {
    this.provinceSearchEntity = new ProvinceSearchEntity();
    this.provinceSearchEntity.name.startsWith = event;
    if (id !== null && id.length > 0) {
      this.provinceSearchEntity.ids.push(id);
    }
    this.provinceTyping.next(this.provinceSearchEntity);
  }

  // list contact
  addContact() {
    this.index = -1;
    this.displayContact = true;
    this.departmentEmployeeDetailService.addContact();
  }

  saveContact(contactValue: any) {
    if (!this.contactForm.valid) {
      this.generalService.validateAllFormFields(this.contactForm);
    } else {
      this.departmentEmployeeDetailService.saveContact(contactValue, this.index);
      this.displayContact = false;
    }
  }

  editContact(contact: any, index: number) {
    this.index = index;
    this.displayContact = true;
    this.departmentEmployeeDetailService.editContact(contact);
  }

  deleteContact(index: number) {
    this.departmentEmployeeDetailService.deleteContact(index);
  }

  // page action
  save() {
    if (!this.departmentEmployeeDetailForm.valid) {
      this.generalService.validateAllFormFields(this.departmentEmployeeDetailForm);
    } else {
      this.departmentEmployeeDetailService.save(this.departmentEmployeeDetailForm.value).then(res => {
        this.router.navigate([this.routeLink]);
      });
    }
  }

  cancel() {
    this.router.navigate([this.routeLink]);
  }
}
