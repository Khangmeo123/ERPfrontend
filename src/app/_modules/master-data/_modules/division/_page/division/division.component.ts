import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { LegalEntity } from 'src/app/_modules/master-data/_backend/legal/legal.entity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { DivisionService } from './division.service';
import { DivisionSearchEntity } from 'src/app/_modules/master-data/_backend/division/division.searchentity';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { BookmarkService } from 'src/app/_services';
import { GeneralService } from 'src/app/_services/general-service.service';
import { translate } from 'src/app/_helpers/string';
import { DivisionEntity } from 'src/app/_modules/master-data/_backend/division/division.entity';

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss'],
  providers: [DivisionService],
})
export class DivisionComponent implements OnInit {
  pageTitle = translate('division.header.title');
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  display = false;
  isSaveBookMark = false;
  // Form general customer detail
  divisionSubs: Subscription = new Subscription();
  divisionForm: FormGroup;
  divisionSearchEntity: DivisionSearchEntity = new DivisionSearchEntity();
  divisionGroupList: DivisionEntity[];

  // list drop:
  legalIds: LegalEntity[];
  legalExceptIds: LegalEntity[];
  legalTyping: Subject<LegalSearchEntity> = new Subject();
  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  legalEntityId: string;
  selectedDivision: any;
  pagination = new PaginationModel();


  constructor(
    protected router: Router,
    private divisionService: DivisionService,
    private bookmarkService: BookmarkService,
    private genaralService: GeneralService) {

    const listLegal = this.divisionService.legalEntityList.subscribe(res => {
      if (res) {
        this.legalIds = res.ids;
        this.legalExceptIds = res.exceptIds;
      }
    });

    const divisionListSub = this.divisionService.divisionList.subscribe(res => {
      if (res) {
        this.divisionGroupList = res;
        this.selectedDivision = res[0];
      }
    });

    const divisionCountSub = this.divisionService.divisionCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });

    const divisionFormSub = this.divisionService.divisionForm.subscribe(res => {
      if (res) {
        this.divisionForm = res;
      }
    });

    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });
    this.divisionService.getListLegalEntityByTyping(this.legalTyping);
    this.divisionSubs.add(listLegal).add(divisionListSub).add(divisionCountSub).add(divisionFormSub).add(bookMarkNotify);
  }

  ngOnInit() {
  }

  openlegalList() {
    this.legalSearchEntity = new LegalSearchEntity();
    if (this.legalEntityId !== undefined && this.legalEntityId !== null) {
      this.legalSearchEntity.ids.push(this.legalEntityId);
    }
    this.divisionService.getListLegalEntity(this.legalSearchEntity);
  }

  legalSearch(event) {
    this.legalSearchEntity = new LegalSearchEntity();
    if (this.legalEntityId !== undefined && this.legalEntityId !== null) {
      this.legalSearchEntity.ids.push(this.legalEntityId);
    }
    this.legalSearchEntity.name.startsWith = event;
    this.legalTyping.next(this.legalSearchEntity);
  }

  selectedLegal(event) {
    this.legalEntityId = event[0];
    this.divisionSearchEntity.legalEntityId = event[0];
    this.divisionService.getList(this.divisionSearchEntity);
  }



  getList() {
    this.pagination.pageNumber = 1;
    this.divisionSearchEntity.skip = 0;
    this.divisionSearchEntity.take = this.pagination.take;
    this.divisionService.getList(this.divisionSearchEntity);
  }
  paginationOut(pagination: PaginationModel) {
    this.divisionSearchEntity.skip = pagination.skip;
    this.divisionSearchEntity.take = pagination.take;
    this.divisionService.getList(this.divisionSearchEntity);
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.divisionSearchEntity.orderBy = event.sortField;
      this.divisionSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }

    if (this.divisionSearchEntity.legalEntityId && this.divisionSearchEntity.legalEntityId !== undefined) {
      this.getList();
    }

  }

  save() {
    if (!this.divisionForm.valid) {
      this.genaralService.validateAllFormFields(this.divisionForm);
    } else {
      this.divisionSearchEntity.legalEntityId = this.legalEntityId;
      this.divisionForm.value.legalEntityId = this.legalEntityId;
      this.divisionService.save(this.divisionForm.value, this.divisionSearchEntity).then(res => {
        this.display = res;
      }).catch(err => {
        this.display = err;
      });
    }
  }

  add() {
    this.display = true;
    this.divisionService.add();
  }

  edit(divisionId: string) {
    this.divisionService.edit(divisionId);
    this.display = true;
  }

  clearSearch(table: any) {
    this.divisionSearchEntity = new DivisionSearchEntity();
    this.divisionSearchEntity.legalEntityId = this.legalEntityId;
    table.reset();
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
