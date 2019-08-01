import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { EmployeeDetailOfLegalEntity } from 'src/app/_modules/master-data/_backend/legal-employee-detail/legal-employee-detail.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeDetailService } from './employee-detail.service';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { ProvinceEntity } from 'src/app/_modules/master-data/_backend/province/province.entity';
import { ProvinceSearchEntity } from 'src/app/_modules/master-data/_backend/province/province.searchentity';
import { BankSearchEntity } from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import { BankEntity } from 'src/app/_modules/master-data/_backend/bank/bank.entity';


@Component({
  selector: 'app-detail-employee-of-legal-entity',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  providers: [EmployeeDetailService]
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {


  displayContact: boolean = false;

  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;

  // Form general employee detail
  employeeDetailSubs: Subscription = new Subscription();
  employeeDetailForm: FormGroup;
  employeeDetailEntity: EmployeeDetailOfLegalEntity = new EmployeeDetailOfLegalEntity();

  //list drop province
  provinceIds: ProvinceEntity[];
  provinceExceptIds: ProvinceEntity[];
  provinceTyping: Subject<ProvinceSearchEntity> = new Subject();
  provinceSearchEntity: ProvinceSearchEntity = new ProvinceSearchEntity();

  //list drop bank
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
    private employeeDetailService: EmployeeDetailService,
    private router: Router,
    private generalService: GeneralService, ) {
    this.route.queryParams.subscribe(params => {
      this.employeeIdQuery = params.legalEntityId;
      this.employeeDetailService.getId(params.id);
    });

    const employeeFormSub = this.employeeDetailService.employeeDetailForm.subscribe(res => {
      if (res) {
        this.employeeDetailForm = res;
      }
    });

    const listProvince = this.employeeDetailService.proviceList.subscribe(res => {
      if (res) {
        this.provinceIds = res.ids;
        this.provinceExceptIds = res.exceptIds;
      }
    });

    const listBank = this.employeeDetailService.bankList.subscribe(res => {
      if (res) {
        this.bankIds = res.ids;
        this.bankExceptIds = res.exceptIds;
      }
    });

    const contactForm = this.employeeDetailService.contactForm.subscribe(res => {
      if (res) {
        this.contactForm = res;
      }
    });

    this.employeeDetailService.getListListBankByTyping(this.bankTyping);
    this.employeeDetailService.getListProvinceByTyping(this.provinceTyping);
    this.employeeDetailSubs.add(employeeFormSub).add(listProvince).add(listBank).add(contactForm);
  }

  ngOnInit() {
    const arr = this.router.url.split('/')[3];
    switch (arr) {
      case 'employee-of-legal-entity':
        this.routeLink = '/master-data/legal-entity/employee-of-legal-entity';
        break;
      case 'employee-position':
        this.routeLink = '/master-data/legal-entity/employee-position';
        break;
    }
  }

  ngOnDestroy() {
    this.employeeDetailSubs.unsubscribe();
  }

  // list drop bank list

  openBankList(bankId: string) {
    this.bankSearchEntity = new BankSearchEntity();
    if (bankId !== null && bankId !== undefined) {
      this.bankSearchEntity.ids.push(bankId);
    }
    this.employeeDetailService.getListBank(this.bankSearchEntity);
  }


  bankSearch(event: any, id: string) {
    this.bankSearchEntity = new BankSearchEntity();
    this.bankSearchEntity.code.startsWith = event;
    this.bankSearchEntity.name.startsWith = event;
    if (id !== null && id.length > 0) {
      this.bankSearchEntity.ids.push(id);
    }
    this.bankTyping.next(this.bankSearchEntity);
  }

  // list drop province

  openProvinceList(provinceId: string) {
    this.provinceSearchEntity = new ProvinceSearchEntity();
    if (provinceId !== null && provinceId !== undefined) {
      this.provinceSearchEntity.ids.push(provinceId);
    }
    this.employeeDetailService.getListProvince(this.provinceSearchEntity);
  }


  provinceSearch(event: any, id: string) {
    this.provinceSearchEntity = new ProvinceSearchEntity();
    this.provinceSearchEntity.name.startsWith = event;
    if (id !== null && id.length > 0) {
      this.provinceSearchEntity.ids.push(id);
    }
    this.provinceTyping.next(this.provinceSearchEntity);
  }
  selectedProvince(event) {
    const data = event.map(e => ({
      provinceId: e.id,
      provinceName: e.name,
    }));
    this.contactForm.setValue({
      ...this.contactForm.value,
      ...data[0],
    });
  }



  onClickOpenTab1() {
    this.isOpenTab1 = !this.isOpenTab1;
  }

  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2;
  }

  // list contact
  addContact() {
    this.displayContact = !this.displayContact;
    this.employeeDetailService.addContact();
  }
  saveContact(contactValue: any) {
    if (!this.contactForm.valid) {
      this.generalService.validateAllFormFields(this.contactForm);
    } else {
      this.employeeDetailService.saveContact(contactValue, this.index);
      this.displayContact = !this.displayContact;
    }
  }

  editContact(contact: any, index: any) {
    this.index = index;
    this.displayContact = true;
    this.employeeDetailService.editContact(contact);
  }

  // page action

  save() {
   
    if (!this.employeeDetailForm.valid) {
      this.generalService.validateAllFormFields(this.employeeDetailForm);
    } else {
      this.employeeDetailService.save(this.employeeDetailForm.value).then(res => {
        this.router.navigate([this.routeLink]);
      });
    }
  }


  cancel() {
    this.router.navigate([this.routeLink]);
  }
}
