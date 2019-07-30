
import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DivisionEntity } from 'src/app/_modules/master-data/_backend/division/divisionl.entity';
import { DivisionRepository } from './division.repository';
import { DivisionForm } from 'src/app/_modules/master-data/_backend/division/division.form';
import { DivisionSearchEntity } from 'src/app/_modules/master-data/_backend/division/division.searchentity';

export class DivisionService {
  public divisionList: BehaviorSubject<DivisionEntity[]>;
  public divisionForm: BehaviorSubject<FormGroup>;
  public divisionCount: BehaviorSubject<number>;
  constructor(private fb: FormBuilder, private divisionRepository: DivisionRepository, private toastrService: ToastrService) {
    this.divisionCount = new BehaviorSubject(0);
    this.divisionList = new BehaviorSubject([]);
    this.divisionForm = new BehaviorSubject(this.fb.group(
      new DivisionForm(),
    ));
  }

  getList(divisionSearchEntity: DivisionSearchEntity) {
    forkJoin(this.divisionRepository.getList(divisionSearchEntity),
      this.divisionRepository.count(divisionSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.divisionList.next(list);
        }
        if (count) {
          this.divisionCount.next(count);
        }
      });
  }

  add() {
    this.divisionForm.next(this.fb.group(
      new DivisionForm(),
    ));
  }

  edit(divisionId: string) {
    this.divisionRepository.getId(divisionId).subscribe(res => {
      if (res) {
        this.divisionForm.next(this.fb.group(
          new DivisionForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(divisionEntity: any, divisionSearchEntity: DivisionSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (divisionEntity.id === null || divisionEntity.id === undefined) {
        this.divisionRepository.add(divisionEntity).subscribe(res => {
          if (res) {
            this.getList(divisionSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            const testItem = this.fb.group(
              new DivisionForm(err),
            );
            this.divisionForm.next(this.fb.group(
              new DivisionForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.divisionRepository.update(divisionEntity).subscribe(res => {
          if (res) {
            this.getList(divisionSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.divisionForm.next(this.fb.group(
              new DivisionForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(divisionEntity: any, divisionSearchEntity: DivisionSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.divisionRepository.delete(divisionEntity).subscribe(res => {
        if (res) {
          this.getList(divisionSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.divisionForm.next(this.fb.group(
            new DivisionForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
