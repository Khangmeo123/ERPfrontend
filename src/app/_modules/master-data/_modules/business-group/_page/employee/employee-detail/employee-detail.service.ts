import { ToastrService } from 'ngx-toastr';
import { EmployeeForm } from './../../../../../_backend/employee/employee.form';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { EmployeeDetailRepository } from './employee-detail.repository';
import { Entities, EnumEntity } from 'src/app/_helpers/entity';
import { JobTitleSearchEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.searchentity';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { JobLevelSearchEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.searchentity';
import { environment } from 'src/environments/environment';

@Injectable()
export class EmployeeDetailService {
  public employeeForm: BehaviorSubject<FormGroup>;
  public jobLevelList: BehaviorSubject<Entities>;
  public jobTitleList: BehaviorSubject<Entities>;
  public statusList: BehaviorSubject<EnumEntity[]>;
  constructor(private fb: FormBuilder, private employeeDetailRepository: EmployeeDetailRepository,
    private toastrService: ToastrService) {
    this.employeeForm = new BehaviorSubject(this.fb.group(
      new EmployeeForm(),
    ));
    this.jobLevelList = new BehaviorSubject(new Entities());
    this.jobTitleList = new BehaviorSubject(new Entities());
    this.statusList = new BehaviorSubject([]);
  }

  getId(employeeId?) {
    if (employeeId === null || employeeId === undefined) {
      this.employeeForm.next(this.fb.group(
        new EmployeeForm(),
      ));
    } else {
      this.employeeDetailRepository.getId(employeeId).subscribe(res => {
        if (res) {
          this.employeeForm.next(this.fb.group(
            new EmployeeForm(res),
          ));
        }
      }, err => {
        if (err) {
          console.log(err);
        }
      });
    }
  }

  save(employeeEntity: any): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (employeeEntity.id === null || employeeEntity.id === undefined || employeeEntity.id === environment.emtyGuid) {
        this.employeeDetailRepository.add(employeeEntity).subscribe(res => {
          if (res) {
            this.toastrService.success('Cập nhật thành công !');
            resolve();
          }
        }, err => {
          if (err) {
            this.employeeForm.next(this.fb.group(
              new EmployeeForm(err),
            ));
          }
        });
      } else {
        this.employeeDetailRepository.update(employeeEntity).subscribe(res => {
          if (res) {
            this.toastrService.success('Cập nhật thành công !');
            resolve();
          }
        }, err => {
          if (err) {
            this.employeeForm.next(this.fb.group(
              new EmployeeForm(err),
            ));
          }
        });
      }
    });
    return defered;
  }

  delete(employeeEntity: any): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.employeeDetailRepository.delete(employeeEntity).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
          resolve();
        }
      }, err => {
        if (err) {
          this.employeeForm.next(this.fb.group(
            new EmployeeForm(err),
          ));
        }
      });
    });
    return defered;
  }

  getStatusList() {
    this.employeeDetailRepository.getStatusList().subscribe(res => {
      if (res) {
        this.statusList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  getJobTitleList(jobTitleSearchEntity: JobTitleSearchEntity) {
    this.employeeDetailRepository.getJobTitleList(jobTitleSearchEntity).subscribe(res => {
      if (res) {
        this.jobTitleList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  getJobTitleListByTyping(jobTitleSearchEntity: Observable<JobTitleSearchEntity>) {
    jobTitleSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.employeeDetailRepository.getJobTitleList(searchEntity);
      })).subscribe(res => {
        if (res) {
          this.jobTitleList.next(res);
        }
      });
  }

  getJobLevelList(jobLevelSearchEntity: JobLevelSearchEntity) {
    this.employeeDetailRepository.getJobLevelList(jobLevelSearchEntity).subscribe(res => {
      if (res) {
        this.jobLevelList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  getJobLevelListByTyping(jobLevelSearchEntity: Observable<JobLevelSearchEntity>) {
    jobLevelSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.employeeDetailRepository.getJobLevelList(searchEntity);
      })).subscribe(res => {
        if (res) {
          this.jobLevelList.next(res);
        }
      });
  }

}
