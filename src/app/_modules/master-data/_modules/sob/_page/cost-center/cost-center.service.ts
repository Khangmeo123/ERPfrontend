import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Entities } from 'src/app/_helpers/entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { CostCenterRepository } from './cost-center.repository';
import { CostCenterEntity } from '../../../../_backend/cost-center/cost-center.entity';
import { CostCenterSearchEntity } from '../../../../_backend/cost-center/cost-center.searchentity';
import { CostCenterForm } from '../../../../_backend/cost-center/cost-center.form';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';

export class CostCenterService {
  public costCenterList: BehaviorSubject<CostCenterEntity[]>;
  public costCenterCount: BehaviorSubject<number>;
  public costCenterForm: BehaviorSubject<FormGroup>;

  public coaList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  constructor(private fb: FormBuilder, private costCenterRepository: CostCenterRepository, private toastrService: ToastrService) {
    this.costCenterCount = new BehaviorSubject(0);
    this.costCenterList = new BehaviorSubject([]);
    this.costCenterForm = new BehaviorSubject(this.fb.group(
      new CostCenterForm(),
    ));
  }

  getList(costCenterSearchEntity: CostCenterSearchEntity) {
    forkJoin(this.costCenterRepository.getList(costCenterSearchEntity),
      this.costCenterRepository.count(costCenterSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.costCenterList.next(list);
      }
      if (count) {
        this.costCenterCount.next(count);
      }
    });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.costCenterRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        this.sobList.next(list);
      });
  }

  getCoaList(coaSearchEntity: CoaSearchEntity) {
    this.costCenterRepository.getCoaList(coaSearchEntity)
      .subscribe((list: Entities) => {
        this.coaList.next(list);
      });
  }

  add() {
    this.costCenterForm.next(this.fb.group(
      new CostCenterForm(),
    ));
  }

  cancel() {
    this.costCenterForm.next(this.fb.group(
      new CostCenterForm(),
    ));
  }

  edit(costCenterId: string) {
    this.costCenterRepository.getId(costCenterId).subscribe(res => {
      if (res) {
        this.costCenterForm.next(this.fb.group(
          new CostCenterForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(costCenterEntity: any, costCenterSearchEntity: CostCenterSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (costCenterEntity.id === null || costCenterEntity.id === undefined) {
        this.costCenterRepository.add(costCenterEntity).subscribe(res => {
          if (res) {
            this.getList(costCenterSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.costCenterForm.next(this.fb.group(
              new CostCenterForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.costCenterRepository.update(costCenterEntity).subscribe(res => {
          if (res) {
            this.getList(costCenterSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.costCenterForm.next(this.fb.group(
              new CostCenterForm(err),
            ));
            reject(true);
          }
        });
      }
    });

  }

  delete(costCenterEntity: any, costCenterSearchEntity: CostCenterSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.costCenterRepository.delete(costCenterEntity).subscribe(res => {
        if (res) {
          this.getList(costCenterSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.costCenterForm.next(this.fb.group(
            new CostCenterForm(err),
          ));
          reject(true);
        }
      });
    });
  }
}
