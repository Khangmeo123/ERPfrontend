import { Entities } from './../../../../../../_helpers/entity';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { JobLevelRepository } from './job-level.repository';
import { JobLevelForm } from 'src/app/_modules/master-data/_backend/job-level/job-level.form';
import { ToastrService } from 'ngx-toastr';
import { JobLevelEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.entity';
import { JobLevelSearchEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.searchentity';
import { JobTitleEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.entity';
import { JobTitleSearchEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Injectable()
export class JobLevelService {
  public jobLevelList: BehaviorSubject<JobLevelEntity[]>;
  public jobLevelForm: BehaviorSubject<FormGroup>;
  public jobLevelCount: BehaviorSubject<number>;
  public jobTitleList: BehaviorSubject<Entities>;

  constructor(private fb: FormBuilder, private jobLevelRepository: JobLevelRepository, private toastrService: ToastrService) {
    this.jobLevelCount = new BehaviorSubject(0);
    this.jobLevelList = new BehaviorSubject([]);
    const test = new Entities();
    debugger
    this.jobTitleList = new BehaviorSubject(new Entities());
    this.jobLevelForm = new BehaviorSubject(this.fb.group(
      new JobLevelForm(),
    ));
  }

  getList(jobLevelSearchEntity: JobLevelSearchEntity) {
    forkJoin(this.jobLevelRepository.getList(jobLevelSearchEntity),
      this.jobLevelRepository.count(jobLevelSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.jobLevelList.next(list);
        }
        if (count) {
          this.jobLevelCount.next(count);
        }
      });
  }

  add() {
    this.jobLevelForm.next(this.fb.group(
      new JobLevelForm(),
    ));
  }

  edit(jobLevelId: string) {
    this.jobLevelRepository.getId(jobLevelId).subscribe(res => {
      if (res) {
        this.jobLevelForm.next(this.fb.group(
          new JobLevelForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(jobLevelEntity: any, jobLevelSearchEntity: JobLevelSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (jobLevelEntity.id === null || jobLevelEntity.id === undefined) {
        this.jobLevelRepository.add(jobLevelEntity).subscribe(res => {
          if (res) {
            this.getList(jobLevelSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.jobLevelForm.next(this.fb.group(
              new JobLevelForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.jobLevelRepository.update(jobLevelEntity).subscribe(res => {
          if (res) {
            this.getList(jobLevelSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.jobLevelForm.next(this.fb.group(
              new JobLevelForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(jobLevelEntity: any, jobLevelSearchEntity: JobLevelSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.jobLevelRepository.delete(jobLevelEntity).subscribe(res => {
        if (res) {
          this.getList(jobLevelSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.jobLevelForm.next(this.fb.group(
            new JobLevelForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }

  getListJobTitle(jobTitleSearchEntity: JobTitleSearchEntity) {
    this.jobLevelRepository.getListJobTitle(jobTitleSearchEntity).subscribe(res => {
      if (res) {
        this.jobTitleList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }
  getListJobTitleByTyping(jobTitleSearchEntity: Observable<JobTitleSearchEntity>) {
    jobTitleSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.jobLevelRepository.getListJobTitle(searchEntity)
      })).subscribe(res => {
        if (res) {
          this.jobTitleList.next(res);
        }
      });
  }
}
