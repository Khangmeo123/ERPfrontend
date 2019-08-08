import { BusinessGroupEntity } from './../../../../_backend/business-group/business-group.entity';
import { BusinessGroupRepository } from './business-group.repository';
import { BusinessGroupSearchEntity } from './../../../../_backend/business-group/business-group.searchentity';
import { BusinessGroupForm } from './../../../../_backend/business-group/business-group.form';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

export class BusinessGroupService {
  public businessGroupList: BehaviorSubject<BusinessGroupEntity[]>;
  public businessGroupForm: BehaviorSubject<FormGroup>;
  public businessGroupCount: BehaviorSubject<number>;
  constructor(private fb: FormBuilder, private businessGroupRepository: BusinessGroupRepository, private toastrService: ToastrService) {
    this.businessGroupCount = new BehaviorSubject(0);
    this.businessGroupList = new BehaviorSubject([]);
    this.businessGroupForm = new BehaviorSubject(this.fb.group(
      new BusinessGroupForm(),
    ));
  }

  getList(businessGroupSearchEntity: BusinessGroupSearchEntity) {
    forkJoin(this.businessGroupRepository.getList(businessGroupSearchEntity),
      this.businessGroupRepository.count(businessGroupSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.businessGroupList.next(list);
        }
        if (count) {
          this.businessGroupCount.next(count);
        }
      });
  }

  add() {
    this.businessGroupForm.next(this.fb.group(
      new BusinessGroupForm(),
    ));
  }

  edit(businessGroupId: string) {
    this.businessGroupRepository.getId(businessGroupId).subscribe(res => {
      if (res) {
        this.businessGroupForm.next(this.fb.group(
          new BusinessGroupForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(businessGroupEntity: any, businessGroupSearchEntity: BusinessGroupSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (businessGroupEntity.id === null || businessGroupEntity.id === undefined || businessGroupEntity.id === environment.emptyGuid) {
        this.businessGroupRepository.add(businessGroupEntity).subscribe(res => {
          if (res) {
            this.getList(businessGroupSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.businessGroupForm.next(this.fb.group(
              new BusinessGroupForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.businessGroupRepository.update(businessGroupEntity).subscribe(res => {
          if (res) {
            this.getList(businessGroupSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.businessGroupForm.next(this.fb.group(
              new BusinessGroupForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(businessGroupEntity: any, businessGroupSearchEntity: BusinessGroupSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.businessGroupRepository.delete(businessGroupEntity).subscribe(res => {
        if (res) {
          this.getList(businessGroupSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.businessGroupForm.next(this.fb.group(
            new BusinessGroupForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
