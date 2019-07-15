import { BusinessGroupEntity } from './../../../../_backend/business-group/business-group.entity';
import { BusinessGroupRepository } from './business-group.repository';
import { BusinessGroupSearchEntity } from './../../../../_backend/business-group/business-group.searchentity';
import { BusinessGroupForm } from './../../../../_backend/business-group/business-group.form';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

export class BusinessGroupService {
  public listBusinessGroups: BehaviorSubject<BusinessGroupEntity[]> = new BehaviorSubject([]);
  constructor(private fb: FormBuilder, private businessGroupRepository: BusinessGroupRepository) { }

  getList(businessGroupSearchEntity: BusinessGroupSearchEntity) {
    this.businessGroupRepository.getList(businessGroupSearchEntity).subscribe(res => {
      if (res) {
        this.listBusinessGroups.next(res);
      }
    }, err => {
      if (err) {

      }
    });
  }

  getId(businessGroupId: string) {

  }

  add(businessGroupEntity: any) {

  }

  edit(businessGroupEntity: any) {

  }

  delete(businessGroupId: string) {

  }
}
