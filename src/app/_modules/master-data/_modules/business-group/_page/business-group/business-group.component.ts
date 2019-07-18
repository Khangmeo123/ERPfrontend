import { FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { BusinessGroupSearchEntity } from 'src/app/_modules/master-data/_backend/business-group/business-group.searchentity';
import { BusinessGroupService } from './business-group.service';
import { Subscription } from 'rxjs';
import { BusinessGroupEntity } from 'src/app/_modules/master-data/_backend/business-group/business-group.entity';
import { SortEvent } from 'primeng/api';

@Component({
  selector: 'app-business-group',
  templateUrl: './business-group.component.html',
  styleUrls: ['./business-group.component.scss'],
  providers: [BusinessGroupService]
})
export class BusinessGroupComponent implements OnInit, OnDestroy {
  isSaveBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  businessGroupSearchEntity: BusinessGroupSearchEntity = new BusinessGroupSearchEntity();
  businessGroupList: BusinessGroupEntity[];
  businessGroupForm: FormGroup;
  businessGroupSubs: Subscription = new Subscription();
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';

  constructor(private businessGroupService: BusinessGroupService) {
    const businessGroupListSub = this.businessGroupService.businessGroupList.subscribe(res => {
      if (res) {
        this.businessGroupList = res;
      }
    });
    const businessGroupFormSub = this.businessGroupService.businessGroupForm.subscribe(res => {
      if (res) {
        this.businessGroupForm = res;
      }
    });
    const businessGroupCountSub = this.businessGroupService.businessGroupCount.subscribe(res => {
      if (res) {
        this.pagination.totalItems = res;
      }
    });
    this.businessGroupSubs.add(businessGroupListSub).add(businessGroupFormSub).add(businessGroupCountSub);
  }

  ngOnInit() {
    this.businessGroupSearchEntity.skip = this.pagination.skip;
    this.businessGroupSearchEntity.take = this.pagination.take;
    this.getList();
  }

  ngOnDestroy() {
    this.businessGroupSubs.unsubscribe();
  }

  getList() {
    this.businessGroupService.getList(this.businessGroupSearchEntity);
  }

  add() {
    this.isShowDialog = true;
    this.businessGroupService.add();
  }

  edit(businessGroupId: string) {
    this.businessGroupService.edit(businessGroupId);
    this.isShowDialog = true;
  }

  delete() {
    this.businessGroupService.delete(this.businessGroupForm.get('id').value, this.businessGroupSearchEntity);
  }

  save() {
    if (!this.businessGroupForm.valid) {
      this.businessGroupService.validateAllFormFields(this.businessGroupForm);
    } else {
      this.businessGroupService.save(this.businessGroupForm.value, this.businessGroupSearchEntity).then(res => {
        this.isShowDialog = res;
      }).catch(err => {
        this.isShowDialog = err;
      });
    }
  }

  sort(event: SortEvent) {
    // this.businessGroupSearchEntity.orderBy = event.field;
    // this.businessGroupSearchEntity.orderType = event.order > 0 ? 'asc' : 'dsc';
    this.businessGroupService.getList(this.businessGroupSearchEntity);
  }

  paginationOut(pagination: PaginationModel) {
    this.businessGroupSearchEntity.skip = pagination.skip;
    this.businessGroupSearchEntity.take = pagination.take;
    this.getList();
  }

  clearSearch() {
    this.businessGroupSearchEntity.name.eq = null;
    this.businessGroupSearchEntity.code.eq = null;
    this.businessGroupSearchEntity.description.eq = null;
    debugger
  }
}
