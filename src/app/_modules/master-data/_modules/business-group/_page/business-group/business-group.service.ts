import { BusinessGroupEntity } from './../../../../_backend/business-group/business-group.entity';
import { BusinessGroupRepository } from './business-group.repository';
import { BusinessGroupSearchEntity } from './../../../../_backend/business-group/business-group.searchentity';
import { BusinessGroupForm } from './../../../../_backend/business-group/business-group.form';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

export class BusinessGroupService {
  public businessGroupList: BehaviorSubject<BusinessGroupEntity[]>;
  public businessGroupForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private businessGroupRepository: BusinessGroupRepository) {
    this.businessGroupList = new BehaviorSubject([]);
    this.businessGroupForm = new BehaviorSubject(this.fb.group(
      new BusinessGroupForm(),
    ));
  }

  getList(businessGroupSearchEntity: BusinessGroupSearchEntity) {
    this.businessGroupRepository.getList(businessGroupSearchEntity).subscribe(res => {
      if (res) {
        this.businessGroupList.next(res);
      }
    }, err => {
      if (err) {

      }
    });
  }

  getId(businessGroupId: string) {
    this.businessGroupRepository.getId(businessGroupId).subscribe(res => {
      if (res) {
        this.businessGroupForm.next(this.fb.group(
          new BusinessGroupForm(res),
        ));
      }
    }, err => {
      if (err) {

      }
    });
  }

  add(businessGroupEntity: any) {
    this.businessGroupRepository.add(businessGroupEntity).subscribe(res => {
      if (res) {

      }
    }, err => {
      if (err) {

      }
    });
  }

  edit(businessGroupEntity: any) {

  }

  delete(businessGroupId: string) {

  }
}
