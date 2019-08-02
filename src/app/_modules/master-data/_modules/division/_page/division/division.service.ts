
import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DivisionRepository } from './division.repository';
import { DivisionForm } from 'src/app/_modules/master-data/_backend/division/division.form';
import { DivisionSearchEntity } from 'src/app/_modules/master-data/_backend/division/division.searchentity';
import { LegalSearchEntity } from 'src/app/_modules/master-data/_backend/legal/legal.searchentity';
import { Entities } from 'src/app/_helpers/entity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { DivisionEntity } from 'src/app/_modules/master-data/_backend/division/division.entity';

export class DivisionService {
  public divisionList: BehaviorSubject<DivisionEntity[]>;
  public divisionForm: BehaviorSubject<FormGroup>;
  public divisionCount: BehaviorSubject<number>;
  public legalEntityList: BehaviorSubject<Entities>;


  constructor(private fb: FormBuilder, private divisionRepository: DivisionRepository, private toastrService: ToastrService) {
    this.divisionCount = new BehaviorSubject(0);
    this.divisionList = new BehaviorSubject([]);
    this.divisionForm = new BehaviorSubject(this.fb.group(
      new DivisionForm(),
    ));

    this.legalEntityList = new BehaviorSubject(new Entities());
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

  // delete(divisionEntity: any, divisionSearchEntity: DivisionSearchEntity): Promise<boolean> {
  //   const defered = new Promise<boolean>((resolve, reject) => {
  //     this.divisionRepository.delete(divisionEntity).subscribe(res => {
  //       if (res) {
  //         this.getList(divisionSearchEntity);
  //         this.toastrService.success('Cập nhật thành công !');
  //         resolve(false);
  //       }
  //     }, err => {
  //       if (err) {
  //         this.divisionForm.next(this.fb.group(
  //           new DivisionForm(err),
  //         ));
  //         reject(true);
  //       }
  //     });
  //   });
  //   return defered;
  // }

  getListLegalEntity(legalSearchEntity: LegalSearchEntity) {
    this.divisionRepository.getListLegalEntityDrop(legalSearchEntity).subscribe(res => {
      if (res) {
        this.legalEntityList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  getListLegalEntityByTyping(legalSearchEntity: Observable<LegalSearchEntity>) {
    legalSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.divisionRepository.getListLegalEntityDrop(searchEntity);
      })).subscribe(res => {
        if (res) {
          this.legalEntityList.next(res);
        }
      });
  }

}
