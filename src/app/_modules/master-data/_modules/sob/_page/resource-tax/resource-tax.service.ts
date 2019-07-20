import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ResourceTaxEntity } from '../../../../_backend/resource-tax/resource-tax.entity';
import { ResourceTaxRepository } from './resource-tax.repository';
import { ResourceTaxForm } from '../../../../_backend/resource-tax/resource-tax.form';
import { ResourceTaxSearchentity } from '../../../../_backend/resource-tax/resource-tax.searchentity';

export class ResourceTaxService {
  public resourceTaxList: BehaviorSubject<ResourceTaxEntity[]>;
  public resourceTaxCount: BehaviorSubject<number>;
  public resourceTaxForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private resourceTaxRepository: ResourceTaxRepository, private toastrService: ToastrService) {
    this.resourceTaxCount = new BehaviorSubject(0);
    this.resourceTaxList = new BehaviorSubject([]);
    this.resourceTaxForm = new BehaviorSubject(this.fb.group(
      new ResourceTaxForm(),
    ));
  }

  getList(resourceTaxSearchEntity: ResourceTaxSearchentity) {
    forkJoin(this.resourceTaxRepository.getList(resourceTaxSearchEntity),
      this.resourceTaxRepository.count(resourceTaxSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.resourceTaxList.next(list);
      }
      if (count) {
        this.resourceTaxCount.next(count);
      }
    });
  }

  add() {
    this.resourceTaxForm.next(this.fb.group(
      new ResourceTaxForm(),
    ));
  }

  edit(resourceTaxId: string) {
    this.resourceTaxRepository.getId(resourceTaxId).subscribe(res => {
      if (res) {
        this.resourceTaxForm.next(this.fb.group(
          new ResourceTaxForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(resourceTaxEntity: any, resourceTaxSearchEntity: ResourceTaxSearchentity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (resourceTaxEntity.id === null || resourceTaxEntity.id === undefined) {
        this.resourceTaxRepository.add(resourceTaxEntity).subscribe(res => {
          if (res) {
            this.getList(resourceTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.resourceTaxForm.next(this.fb.group(
              new ResourceTaxForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.resourceTaxRepository.update(resourceTaxEntity).subscribe(res => {
          if (res) {
            this.getList(resourceTaxSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.resourceTaxForm.next(this.fb.group(
              new ResourceTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(resourceTaxEntity: any, resourceTaxSearchEntity: ResourceTaxSearchentity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.resourceTaxRepository.delete(resourceTaxEntity).subscribe(res => {
        if (res) {
          this.getList(resourceTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.resourceTaxForm.next(this.fb.group(
            new ResourceTaxForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
