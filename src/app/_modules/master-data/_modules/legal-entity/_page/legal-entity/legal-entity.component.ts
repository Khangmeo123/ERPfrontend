import { Component, OnInit, OnDestroy } from '@angular/core';
import { PaginationModel } from '../../../../../../_shared/modules/pagination/pagination.model';
import { TextFilter } from '../../../../../../_shared/models/filters/TextFilter';
import { _ } from '@biesbjerg/ngx-translate-extract/dist/utils/utils';
import { BookmarkService } from 'src/app/_services';
import { Router } from '@angular/router';
import { LegalEntityService } from './legal-entity.service';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { GeneralService } from 'src/app/_helpers/general-service.service';


@Component({
  selector: 'app-legal-entity',
  templateUrl: './legal-entity.component.html',
  styleUrls: ['./legal-entity.component.scss'],
  providers: [LegalEntityService]
})
export class LegalEntityComponent implements OnInit, OnDestroy {
  pageTitle = _('legal_entity.header.title');
  isSaveBookMark: boolean = false;
  bookMarkId: string;
  filters = {
    id: new TextFilter(),
    name: new TextFilter(),
    des: new TextFilter(),
  }

  display: boolean = false;
  pagination = new PaginationModel();
  public popoverTitle: string = 'Popover title';
  public popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();
  legalList: LegalEntity[];
  legalForm: FormGroup;
  legalSubs: Subscription = new Subscription();

  sobIds: LegalEntity[];
  sobExceptIds: LegalEntity[];
  sobTyping: Subject<LegalSearchEntity> = new Subject();
  setOfBookId: string = '';

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
    private legalService: LegalEntityService,
    private genaralService: GeneralService) {
    const legalListSub = this.legalService.legalList.subscribe(res => {
      if (res) {
        this.legalList = res;
      }
    });
    const legalFormSub = this.legalService.legalForm.subscribe(res => {
      if (res) {
        this.legalForm = res;
      }
    });

    const sobOfLegalListSub = this.legalService.sobList.subscribe(res => {
      if (res) {
        this.sobIds = res.ids;
        this.sobExceptIds = res.exceptIds;
      }
    })

    const legalListCountSub = this.legalService.legalpCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    const bookMarkNotify = this.bookmarkService.pushItemObs.subscribe(res => {
      this.isSaveBookMark = res;
    });
    this.legalService.getListSobOfLegalByTyping(this.sobTyping);
    this.bookmarkService.checkBookMarks({ name: this.pageTitle, route: this.router.url });
    this.legalSubs.add(legalListSub).add(legalFormSub).add(legalListCountSub).add(bookMarkNotify).add(sobOfLegalListSub);
  }

  ngOnInit() {
    this.legalSearchEntity.skip = this.pagination.skip;
    this.legalSearchEntity.take = this.pagination.take;
  }

  ngOnDestroy() {
    this.legalSubs.unsubscribe();
  }

  openSobList(id: string) {
    this.legalSearchEntity = new LegalSearchEntity();
    this.legalSearchEntity.ids.push(id);
    this.legalService.getListSobOfLegal(this.legalSearchEntity);
  }

  sobSearch(event) {
    this.legalSearchEntity.code = event;
    this.legalSearchEntity.name = event;
    this.sobTyping.next(this.legalSearchEntity);
  }
  selectSob(event) {
    this.legalSearchEntity.setOfBookId = event[0];
    this.setOfBookId = event[0];
    this.getList();
  }

  add() {
    this.display = true;
    this.legalService.add(this.legalSearchEntity.setOfBookId);
  }

  save() {
    if (!this.legalForm.valid) {
      this.genaralService.validateAllFormFields(this.legalForm);
    } else {
      this.legalService.save(this.legalForm.value, this.legalSearchEntity).then(res => {
        this.display = res;
      }).catch(err => {
        this.display = err;
      });
    }
  }

  edit(businessGroupId: string) {
    this.legalService.edit(businessGroupId);
    this.display = true;
  }

  delete() {
    this.legalService.delete(this.legalForm.value, this.legalSearchEntity).then(res => {
      this.display = res;
    }).catch(err => {
      this.display = err;
    });
  }


  getList() {
    this.pagination.pageNumber = 1;
    this.legalSearchEntity.skip = 0;
    this.legalSearchEntity.take = this.pagination.take;
    this.legalService.getList(this.legalSearchEntity);
  }

  paginationOut(pagination: PaginationModel) {
    this.legalSearchEntity.skip = pagination.skip;
    this.legalSearchEntity.take = pagination.take;
    this.legalService.getList(this.legalSearchEntity);
  }

  clearSearch(table: any) {
    this.legalSearchEntity = new LegalSearchEntity();
    this.legalSearchEntity.setOfBookId = this.setOfBookId;
    table.reset();
  }

  sort(event: any) {
    if (event.sortField && event.sortOrder) {
      this.legalSearchEntity.orderBy = event.sortField;
      this.legalSearchEntity.orderType = event.sortOrder > 0 ? 'asc' : 'desc';
    }
    this.getList();
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
