import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {PaginationModel} from '../../../../../../_shared/modules/pagination/pagination.model';
import {Router} from '@angular/router';
import {translate} from 'src/app/_helpers/string';
import {BookmarkService} from 'src/app/_services';
import {GeneralService} from 'src/app/_helpers/general-service.service';
import {EmployeePositionService} from './employee-position.service';
import {EmployeePositionSearchEntity} from 'src/app/_modules/master-data/_backend/employee-position/employee-position.searchentity';
import {EmployeePositionEntity} from 'src/app/_modules/master-data/_backend/employee-position/employee-position.entity';
import {FormGroup} from '@angular/forms';
import {Subscription, Subject} from 'rxjs';
import {LegalEntity} from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import {LegalSearchEntity} from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import {EmployeeEntity} from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import {EmployeeSearchEntity} from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import {environment} from 'src/environments/environment.prod';

@Component({
  selector: 'app-employee-position',
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
  paginationDetail = new PaginationModel();
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

  exportLink = environment.apiUrlApps + 'master-data/legal-entity/employee-position/export?positionId=';
  @ViewChild('tableEmployee', {static: false}) public tableEmployee: TemplateRef<any>;

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
        this.paginationDetail.totalItems = res;
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

    this.employeeSearchEntity.skip = this.paginationDetail.skip;
    this.employeeSearchEntity.take = this.paginationDetail.take;
  }

  // drop legal entity

  openLegalEntityList() {
    this.legalSearchEntity = new LegalSearchEntity();
    if (this.legalEntityId !== null && this.legalEntityId !== undefined) {
      this.legalSearchEntity.ids.push(this.legalEntityId);
    }
    this.employeePositionService.getListLegalEntity(this.legalSearchEntity);
  }

  legalSearch(event) {
    this.legalSearchEntity = new LegalSearchEntity();
    this.legalSearchEntity.ids = this.legalId;
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
        this.employeePositionId = this.employeePositionList[0].id;
        this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
      }
    });

  }

  // drop list employee

  openEmployeeList(id: string[]) {
    this.employeeSearchEntity = new EmployeeSearchEntity();
    this.employeeSearchEntity.ids = id;
    if (this.legalEntityId !== '' && this.legalEntityId !== undefined) {
      this.employeeSearchEntity.legalEntityId = this.legalEntityId;
      this.employeeSearchEntity.positionId = this.employeePositionId;
      this.employeePositionService.getDropListEmployee(this.employeeSearchEntity);
    }
  }

  employeeSearch(event) {
    if (this.legalEntityId !== null && this.legalEntityId !== undefined) {
      this.employeeSearchEntity.legalEntityId = this.legalEntityId;
    }
    this.employeeSearchEntity.name.startsWith = event;
    this.employeeTyping.next(this.employeeSearchEntity);
  }

  selectEmployee(event) {
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
      this.employeePositionSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    if (this.legalEntityId !== '' && this.legalEntityId !== undefined && this.legalEntityId !== null) {
      this.employeePositionService.getList(this.employeePositionSearchEntity).then(res => {
        if (this.employeePositionList && this.employeePositionList.length > 0) {
          this.employeeSearchEntity.legalEntityId = this.legalEntityId;
          this.employeeSearchEntity.positionId = this.employeeDetailList[0].id;
          this.employeePositionId = this.employeeDetailList[0].id;
          this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
        }
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
    this.employeePositionService.getList(this.employeePositionSearchEntity).then(res => {
      if (this.employeePositionList && this.employeePositionList.length > 0) {
        this.employeeSearchEntity.positionId = this.employeePositionList[0].id;
      } else {
        this.employeeSearchEntity.positionId = null;
      }
      this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
    });
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
    this.employeePositionService.saveEmployee(this.employeeSearchEntity)
      .then(res => {
        this.employeeSearchEntity.legalEntityId = this.legalEntityId;
        this.employeeSearchEntity.positionId = this.employeePositionId;
        this.employeeIds = [];
        this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
      })
      .catch(err => {
      });
  }

  onClickDetail(employeePositionId) {
    this.employeePositionId = employeePositionId;
    this.employeeSearchEntity.positionId = employeePositionId;
    this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
  }

  //list employee
  sortEmployeeDetail(event) {
    if (event.sortField && event.sortOrder) {
      this.employeeSearchEntity.orderBy = event.sortField;
      this.employeeSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    if (this.employeeSearchEntity.positionId !== undefined) {
      this.employeeSearchEntity.positionId = this.employeePositionId;
      this.getListDetail();
    }
  }

  getListDetail() {
    this.paginationDetail.pageNumber = 1;
    this.employeeSearchEntity.skip = 0;
    this.employeeSearchEntity.take = this.paginationDetail.take;
    this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
  }

  clearSearch(tableCustomer: any) {
    this.employeeSearchEntity = new EmployeeSearchEntity();
    this.employeeSearchEntity.legalEntityId = this.legalEntityId;
    this.employeeSearchEntity.positionId = this.employeePositionId;
    tableCustomer.reset();
  }

  paginationDetailOut(pagination: PaginationModel) {
    this.employeeSearchEntity.skip = pagination.skip;
    this.employeeSearchEntity.take = pagination.take;
    this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
  }

  editEmployeeDetail(employeePositionId) {
    this.router.navigate(['/master-data/legal-entity/employee-position/employee-detail'],
      {queryParams: {id: employeePositionId}});
  }

  deleteEmployeeFormPosition(employeeId: string) {
    this.employeePositionService.deleteEmployeeFormPosition(employeeId, this.employeePositionId)
      .then(res => {
        if (res) {
          this.clearSearch(this.tableEmployee);
          this.employeePositionService.getListEmployeeDetail(this.employeeSearchEntity);
        }
      });
  }

  bookMark() {
    this.isSaveBookMark = !this.isSaveBookMark;
    if (this.isSaveBookMark) {
      this.bookmarkService.addBookMarks({name: this.pageTitle, route: this.router.url});
    } else {
      this.bookmarkService.deleteBookMarks({name: this.pageTitle, route: this.router.url});
    }
  }
}
