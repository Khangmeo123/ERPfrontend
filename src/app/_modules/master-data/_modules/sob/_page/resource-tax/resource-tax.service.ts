import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NaturalResourceTaxEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.entity';
import { ResourceTaxRepository } from './resource-tax.repository';
import { NaturalResourceTaxForm } from '../../../../_backend/natural-resource-tax/natural-resource-tax.form';
import { NaturalResourceTaxSearchEntity } from '../../../../_backend/natural-resource-tax/natural-resource-tax.searchentity';

export class ResourceTaxService {
  public resourceTaxList: BehaviorSubject<NaturalResourceTaxEntity[]>;
  public resourceTaxCount: BehaviorSubject<number>;
  public resourceTaxForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private resourceTaxRepository: ResourceTaxRepository, private toastrService: ToastrService) {
    this.resourceTaxCount = new BehaviorSubject(0);
    this.resourceTaxList = new BehaviorSubject([]);
    this.resourceTaxForm = new BehaviorSubject(this.fb.group(
      new NaturalResourceTaxForm(),
    ));
  }

  getList(resourceTaxSearchEntity: NaturalResourceTaxSearchEntity) {
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
      new NaturalResourceTaxForm(),
    ));
  }

  edit(resourceTaxId: string) {
    this.resourceTaxRepository.getId(resourceTaxId).subscribe(res => {
      if (res) {
        this.resourceTaxForm.next(this.fb.group(
          new NaturalResourceTaxForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(resourceTaxEntity: any, resourceTaxSearchEntity: NaturalResourceTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
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
              new NaturalResourceTaxForm(err),
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
              new NaturalResourceTaxForm(err),
            ));
            reject(true);
          }
        });
      }
    });

  }

  deactivate(resourceTaxEntity: any, resourceTaxSearchEntity: NaturalResourceTaxSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.resourceTaxRepository.deactivate(resourceTaxEntity).subscribe(res => {
        if (res) {
          this.getList(resourceTaxSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.resourceTaxForm.next(this.fb.group(
            new NaturalResourceTaxForm(err),
          ));
          reject(true);
        }
      });
    });

  }
}
