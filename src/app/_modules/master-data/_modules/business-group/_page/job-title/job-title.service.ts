import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { JobTitleRepository } from './job-title.repository';
import { JobTitleForm } from 'src/app/_modules/master-data/_backend/job-title/job-title.form';
import { ToastrService } from 'ngx-toastr';
import { JobTitleEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.entity';
import { JobTitleSearchEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.searchentity';
import { environment } from 'src/environments/environment';

@Injectable()
export class JobTitleService {
  public jobTitleList: BehaviorSubject<JobTitleEntity[]>;
  public jobTitleForm: BehaviorSubject<FormGroup>;
  public jobTitleCount: BehaviorSubject<number>;
  constructor(private fb: FormBuilder, private jobTitleRepository: JobTitleRepository, private toastrService: ToastrService) {
    this.jobTitleCount = new BehaviorSubject(0);
    this.jobTitleList = new BehaviorSubject([]);
    this.jobTitleForm = new BehaviorSubject(this.fb.group(
      new JobTitleForm(),
    ));
  }

  getList(jobTitleSearchEntity: JobTitleSearchEntity) {
    forkJoin(this.jobTitleRepository.getList(jobTitleSearchEntity),
      this.jobTitleRepository.count(jobTitleSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.jobTitleList.next(list);
        }
        if (count) {
          this.jobTitleCount.next(count);
        }
      });
  }

  add() {
    this.jobTitleForm.next(this.fb.group(
      new JobTitleForm(),
    ));
  }

  edit(jobTitleId: string) {
    this.jobTitleRepository.getId(jobTitleId).subscribe(res => {
      if (res) {
        this.jobTitleForm.next(this.fb.group(
          new JobTitleForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(jobTitleEntity: any, jobTitleSearchEntity: JobTitleSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (jobTitleEntity.id === null || jobTitleEntity.id === undefined || jobTitleEntity.id === environment.emptyGuid) {
        this.jobTitleRepository.add(jobTitleEntity).subscribe(res => {
          if (res) {
            this.getList(jobTitleSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.jobTitleForm.next(this.fb.group(
              new JobTitleForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.jobTitleRepository.update(jobTitleEntity).subscribe(res => {
          if (res) {
            this.getList(jobTitleSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.jobTitleForm.next(this.fb.group(
              new JobTitleForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(jobTitleEntity: any, jobTitleSearchEntity: JobTitleSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.jobTitleRepository.delete(jobTitleEntity).subscribe(res => {
        if (res) {
          this.getList(jobTitleSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.jobTitleForm.next(this.fb.group(
            new JobTitleForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }

}
