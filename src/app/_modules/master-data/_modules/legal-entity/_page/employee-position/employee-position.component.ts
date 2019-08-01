import { Component, OnInit } from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Router} from '@angular/router';
import { translate } from 'src/app/_helpers/string';
import { BookmarkService } from 'src/app/_services';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { EmployeePositionService } from './employee-position.service';
import { EmployeePositionSearchEntity } from 'src/app/_modules/master-data/_backend/employee-position/employee-position.searchentity';
import { EmployeePositionEntity } from 'src/app/_modules/master-data/_backend/employee-position/employee-position.entity';
import { FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';

@Component({
  selector: 'app-company-position',
  templateUrl: './employee-position.component.html',
  styleUrls: ['./employee-position.component.scss'],
  providers: [EmployeePositionService]
})
export class EmployeePositionComponent implements OnInit {

  pageTitle: string = translate('employeePosition.header.title');
  isSaveBookMark = false;
  bookMarkId: string;
  display: boolean = false;
  pagination = new PaginationModel();
  paginationdetail = new PaginationModel();
  selectedEmployeePosition: any;

  employeePositionSearchEntity: EmployeePositionSearchEntity = new EmployeePositionSearchEntity();
  employeePositionList: EmployeePositionEntity[];
  employeePositionForm: FormGroup;
  employeePositionSubs: Subscription = new Subscription();

  legalEntityIds: LegalEntity[];
  legalEntityExceptIds: LegalEntity[];
  leGalEntityTyping: Subject<LegalSearchEntity> = new Subject();
  legalEntityId: string = null;
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  employeeIds: EmployeeEntity[];
  employeeExceptIds: EmployeeEntity[];
  employeeTyping: Subject<EmployeeSearchEntity> = new Subject();
  employeeSearchEntity: EmployeeSearchEntity = new EmployeeSearchEntity();
  employeeDetailList: EmployeeEntity[];
  employeeDetailSubs: Subscription = new Subscription();

  listEmployeeId: Array<any> = [];
  employeePositionId: any;

  constructor(
    private employeePositionService: EmployeePositionService,
    protected router: Router,
    private bookmarkService: BookmarkService,
    private genaralService: GeneralService) {
      const employeePositionListSub = this.employeePositionService.employeePositionList.subscribe(res => {
        if (res) {
          this.employeePositionList = res;
          this.selectedEmployeePosition = res[0];
        }
      });
      const legalEntityListSub = this.employeePositionService.legalListDrop.subscribe(res => {
        if (res) {
          this.legalEntityIds = res.ids;
          this.legalEntityExceptIds = res.exceptIds;
        }
      });
      const employeePositionFormSub = this.employeePositionService.employeePositionForm.subscribe(res => {
        if (res) {
          this.employeePositionForm = res;
        }
      });

      const employeePositionCountSub = this.employeePositionService.employeePositionCount.subscribe(res => {
        if (res) {
          this.pagination.totalItems = res;
        }
      });

      const employeeDetaiDrop = this.employeePositionService.employeeListDrop.subscribe(res => {
        if (res) {
          this.employeeIds = res.ids;
          this.employeeExceptIds = res.exceptIds;
        }
      });

      const employeeDetailListSub = this.employeePositionService.employeeDetailList.subscribe(res => {
        if (res) {
          this.employeeDetailList = res;
        }
      });
  
      const employeeDetailCountSub = this.employeePositionService.employeeDetailCount.subscribe(res => {
        if (res) {
          this.paginationdetail.totalItems = res;
        }
      });
      
      const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
        this.isSaveBookMark = res;
      });

      this.employeePositionService.getLisLegalEntityByTyping(this.leGalEntityTyping);
      this.employeePositionSubs.add(employeePositionListSub).add(legalEntityListSub).add(employeePositionFormSub)
      .add(employeePositionCountSub).add(bookMarkNotify).add(employeeDetaiDrop).add(employeeDetailListSub).add(employeeDetailCountSub);
    }

  ngOnInit() {

    this.employeePositionSearchEntity.skip = this.pagination.skip;
    this.employeePositionSearchEntity.take = this.pagination.take;

    this.employeeSearchEntity.skip = this.paginationdetail.skip;
    this.employeeSearchEntity.take = this.paginationdetail.take;
  }

  // drop legal entity

  openLegalEntityList(legalId: string) {
    this.legalSearchEntity = new LegalSearchEntity();
    if (legalId !== null && legalId !== undefined) {
      this.legalSearchEntity.ids.push(legalId);
    }
    this.employeePositionService.getListLegalEntity(this.legalSearchEntity);
  }
  legalSearch(event) {
    this.legalSearchEntity.code.startsWith = event;
    this.legalSearchEntity.name.startsWith = event;
    this.leGalEntityTyping.next(this.legalSearchEntity);
  }
  selectLegal(event) {
    this.employeePositionSearchEntity.legalEntityId = event[0];
    this.legalEntityId = event[0];

    this.employeePositionService.getList(this.employeePositionSearchEntity).then(res => {
      if (this.employeePositionList && this.employeePositionList.length > 0) {
        this.employeeSearchEntity.legalEntityId = this.legalEntityId;
        this.employeeSearchEntity.positionId = this.employeePositionList[0].id;
        this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
      }
    });

  }

  // drop list employee

  openEmployeeList(id: []) {
    this.employeeSearchEntity = new EmployeeSearchEntity();
    this.employeeSearchEntity.ids = id;
    if (this.legalEntityId !== '' && this.legalEntityId !== undefined) {
      this.employeeSearchEntity.legalEntityId = this.legalEntityId;
      this.employeePositionService.getDropListEmployee(this.employeeSearchEntity);
    }
  }

  employeeSearch(event) {
    this.employeeSearchEntity.code.startsWith = event;
    this.employeeSearchEntity.name.startsWith = event;
    this.employeeTyping.next(this.employeeSearchEntity);
  }

  selectemployeeApp(event) {
    this.listEmployeeId = event;
  }

  // List employee position

  addEmployeePosition() {
    this.display = true;
    this.employeePositionService.add(this.employeePositionSearchEntity.legalEntityId);
  }

  save() {
    if (!this.employeePositionForm.valid) {
      this.genaralService.validateAllFormFields(this.employeePositionForm);
    } else {
      this.employeePositionService.save(this.employeePositionForm.value, this.employeePositionSearchEntity).then(res => {
        this.display = res;
      }).catch(err => {
        this.display = err;
      });
    }
  }

  sortEmployeePosition(event) {
    if (event.sortField && event.sortOrder) {
      this.employeePositionSearchEntity.orderBy = event.sortField;
      this.employeePositionSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }

    if (this.legalEntityId !== '' && this.legalEntityId !== undefined) {
      this.employeePositionService.getList(this.employeePositionSearchEntity).then(res => {
        this.employeeSearchEntity.legalEntityId = this.legalEntityId;
        this.employeeSearchEntity.positionId = this.employeeDetailList[0].id;
        this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
      });
    }
  }

  clearSearchGroup(tableEmployeePosition: any) {
    this.employeePositionSearchEntity = new EmployeePositionSearchEntity();
    this.employeePositionSearchEntity.legalEntityId = this.legalEntityId;
    tableEmployeePosition.reset();
  }

  getList() {
    this.pagination.pageNumber = 1;
    this.employeePositionSearchEntity.skip = 0;
    this.employeePositionSearchEntity.take = this.pagination.take;
    this.employeePositionService.getList(this.employeePositionSearchEntity);
  }

  edit(positionId: string) {
    this.employeePositionService.edit(positionId);
    this.display = true;
  }

  paginationGroupOut(pagination: PaginationModel) {
    this.employeePositionSearchEntity.skip = pagination.skip;
    this.employeePositionSearchEntity.take = pagination.take;
    this.employeePositionService.getList(this.employeePositionSearchEntity);
  }

  addEmployee() {
    this.employeeSearchEntity.employeeDetailIds = this.listEmployeeId;
    this.employeeSearchEntity.legalEntityId = this.legalEntityId;
    if ((this.employeePositionId === '' || this.employeePositionId === undefined) && this.employeePositionList.length > 0) {
      this.employeePositionId = this.employeePositionList[0].id;
    }
    this.employeeSearchEntity.positionId = this.employeePositionId;
    this.employeePositionService.saveEmployee(this.employeeSearchEntity).then(res => {
      this.employeeSearchEntity.legalEntityId = this.legalEntityId;
      this.employeeSearchEntity.positionId = this.employeePositionId;
      this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
    }).catch(err => {
    });
  }

  //list employee
  sortEmployeeDetail(event) {
    if (event.sortField && event.sortOrder) {
      this.employeeSearchEntity.orderBy = event.sortField;
      this.employeeSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'dsc';
    }
    if (this.employeeSearchEntity.positionId !== undefined) {
      this.employeeSearchEntity.positionId = this.employeePositionId;
      this.getListDetail();
    }
  }
  
  getListDetail() {
    this.paginationdetail.pageNumber = 1;
    this.employeeSearchEntity.skip = 0;
    this.employeeSearchEntity.take = this.paginationdetail.take;
    this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
  }
  clearSearch(tableCustomer: any) {
    this.employeeSearchEntity = new EmployeeSearchEntity();
    this.employeeSearchEntity.legalEntityId = this.legalEntityId;
    tableCustomer.reset();
  }

  paginationDetailOut(pagination: PaginationModel) {
    this.employeeSearchEntity.skip = pagination.skip;
    this.employeeSearchEntity.take = pagination.take;
    this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
  }
  onClickShowDetail (employeePositionId) {
    this.router.navigate(['/master-data/legal-entity/employee-position/employee-detail'],
    { queryParams: { id: employeePositionId} });
  }

  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({ name: this.pageTitle, route: this.router.url });
    } else {
      this.bookmarkService.deleteBookMarks({ name: this.pageTitle, route: this.router.url });
    }
  }
}
