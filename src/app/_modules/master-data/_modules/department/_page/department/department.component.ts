import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../../../../../_services';
import { DepartmentService } from './department.service';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';
import { DivisionEntity } from '../../../../_backend/division/divisionl.entity';
import { DivisionSearchEntity } from '../../../../_backend/division/division.searchentity';
import { Subscription } from 'rxjs';
import { Entities } from '../../../../../../_helpers/entity';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [],
})
export class DepartmentComponent implements OnInit {
  isSavedBookMark = false;

  routes = [
    {
      key: 'Nhân sự',
      route: '/master-data/department/employee',
    },
    {
      key: 'Tài sản',
      route: '/master-data/department/asset',
    },
    {
      key: 'Kho bãi',
      route: '/master-data/department/warehouse-group',
    },
    {
      key: 'Dự án',
      route: '/master-data/department/project',
    },
  ];

  /**
   * Legal Entity
   */
  public legalEntityList: LegalEntity[] = [];

  public selectedLegalEntityList: LegalEntity[] = [];

  public legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  /**
   * Division
   */
  public divisionList: DivisionEntity[] = [];

  public selectedDivisionList: DivisionEntity[] = [];

  public divisionSearchEntity: DivisionSearchEntity = new DivisionSearchEntity();

  /**
   * Data subscriptions
   */
  public subscription: Subscription = new Subscription();

  constructor(private departmentService: DepartmentService, private bookmarkService: BookmarkService) {
    const legalEntityListSub: Subscription = this.departmentService.legalEntityList.subscribe((list: Entities) => {
      this.legalEntityList = list.exceptIds;
      this.selectedLegalEntityList = list.ids;
    });

    const divisionListSub: Subscription = this.departmentService.divisionList.subscribe((list: Entities) => {
      this.divisionList = list.exceptIds;
      this.selectedDivisionList = list.ids;
    });

    this.subscription.add(legalEntityListSub)
      .add(divisionListSub);
  }

  get currentLegalEntity() {
    if (this.legalEntityList.length) {
      return this.legalEntityList[0];
    }
    return null;
  }

  get currentDivision() {
    if (this.divisionList.length) {
      return this.divisionList[0];
    }
    return null;
  }

  ngOnInit() {
  }

  onClickSaveBookMark(event) {
    this.bookmarkService.addBookMarks(event);
  }

  getLegalEntityList() {
    this.departmentService.getLegalEntityList(this.legalSearchEntity);
  }

  onSelectLegalEntity() {
    this.departmentService.selectLegalEntity(this.selectedLegalEntityList[0]);
  }

  getDivisionList() {
    this.departmentService.getDivisionList(this.divisionSearchEntity);
  }

  onSelectDivision() {
    this.departmentService.selectDivision(this.selectedDivisionList[0]);
  }
}
