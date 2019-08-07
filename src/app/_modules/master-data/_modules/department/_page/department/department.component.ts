import {Component, OnInit} from '@angular/core';
import {BookmarkService} from '../../../../../../_services';
import {DepartmentService} from './department.service';
import {LegalEntity} from '../../../../_backend/legal/legal.entity';
import {LegalSearchEntity} from '../../../../_backend/legal/legal.searchentity';
import {DivisionEntity} from '../../../../_backend/division/division.entity';
import {DivisionSearchEntity} from '../../../../_backend/division/division.searchentity';
import {Subject, Subscription} from 'rxjs';
import {Entities} from '../../../../../../_helpers/entity';

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
      route: '/master-data/department/hr-organization',
    },
    {
      key: 'Tài sản',
      route: '/master-data/department/asset-organization',
    },
    {
      key: 'Kho bãi',
      route: '/master-data/department/warehouse-group',
    },
    {
      key: 'Dự án',
      route: '/master-data/department/project-organization',
    },
  ];

  /**
   * Legal Entity
   */
  public legalEntity: LegalEntity = null;

  public legalEntityList: LegalEntity[] = [];

  public selectedLegalEntityList: LegalEntity[] = [];

  public legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  public legalEntityTyping: Subject<LegalSearchEntity> = new Subject<LegalSearchEntity>();

  /**
   * Division
   */
  public division: DivisionEntity = null;

  public divisionList: DivisionEntity[] = [];

  public selectedDivisionList: DivisionEntity[] = [];

  public divisionSearchEntity: DivisionSearchEntity = new DivisionSearchEntity();

  public divisionEntityTyping: Subject<DivisionSearchEntity> = new Subject<DivisionSearchEntity>();

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

    const legalEntitySub: Subscription = this.departmentService.selectedLegalEntity.subscribe((legalEntity: LegalEntity) => {
      if (legalEntity) {
        this.legalEntity = legalEntity;
      }
    });

    const divisionSub: Subscription = this.departmentService.selectedDivision.subscribe((division: DivisionEntity) => {
      if (division) {
        this.division = division;
      }
    });

    this.subscription
      .add(legalEntityListSub)
      .add(legalEntitySub)
      .add(divisionListSub)
      .add(divisionSub);
  }

  ngOnInit() {
  }

  onClickSaveBookMark(event) {
    this.bookmarkService.addBookMarks(event);
  }

  getLegalEntityList() {
    this.legalSearchEntity = new LegalSearchEntity();
    this.departmentService.getLegalEntityList(this.legalSearchEntity);
  }

  onSelectLegalEntity() {
    this.legalSearchEntity.ids = this.selectedLegalEntityList.map((legalEntity: LegalEntity) => legalEntity.id);
    this.departmentService.selectLegalEntity(this.selectedLegalEntityList[0]);
  }

  getDivisionList() {
    this.divisionSearchEntity = new DivisionSearchEntity();
    this.departmentService.getDivisionList(this.divisionSearchEntity);
  }

  onSelectDivision() {
    this.divisionSearchEntity.ids = this.selectedDivisionList.map((division: DivisionEntity) => division.id);
    this.departmentService.selectDivision(this.selectedDivisionList[0]);
  }

  onDivisionSearch(event) {
    this.divisionSearchEntity.name.startsWith = event;
    this.divisionEntityTyping.next(this.divisionSearchEntity);
    this.departmentService.getDivisionEntityListByTyping(this.divisionEntityTyping);
  }

  onLegalEntitySearch(event) {
    this.legalSearchEntity.name.startsWith = event;
    this.legalEntityTyping.next(this.legalSearchEntity);
    this.departmentService.getLegalEntityListByTyping(this.legalEntityTyping);
  }
}
