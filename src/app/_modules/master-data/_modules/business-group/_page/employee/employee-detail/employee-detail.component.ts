import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { translate } from 'src/app/_helpers/string';
import { PaginationModel } from 'src/app/_shared/modules/pagination/pagination.model';
import { FormGroup } from '@angular/forms';
import { Subscription, Subject } from 'rxjs';
import { JobTitleSearchEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.searchentity';
import { JobTitleEntity } from 'src/app/_modules/master-data/_backend/job-title/job-title.entity';
import { JobLevelSearchEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.searchentity';
import { JobLevelEntity } from 'src/app/_modules/master-data/_backend/job-level/job-level.entity';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/_helpers/general-service.service';
import { EmployeeDetailService } from './employee-detail.service';
import { EnumEntity } from 'src/app/_helpers/entity';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  providers: [EmployeeDetailService]
})
export class EmployeeDetailComponent implements OnInit, OnDestroy {

  pageTitle: string = translate('employee.header.title');
  bookMarkId: string;
  isBookMark: boolean = false;
  isShowDialog: boolean = false;
  pagination: PaginationModel = new PaginationModel();
  employeeForm: FormGroup;
  employeeDetailSubs: Subscription = new Subscription();
  // jobTitle:
  jobTitleTyping: Subject<JobTitleSearchEntity> = new Subject();
  jobTitleSearchEntity: JobTitleSearchEntity = new JobTitleSearchEntity();
  jobTitleExceptIds: JobTitleEntity[];
  jobTitleIds: JobTitleEntity[];
  // jobLevel:
  jobLevelTyping: Subject<JobLevelSearchEntity> = new Subject();
  jobLevelSearchEntity: JobLevelSearchEntity = new JobLevelSearchEntity();
  jobLevelExceptIds: JobLevelEntity[];
  jobLevelIds: JobLevelEntity[];
  // status:
  statusList: EnumEntity[];
  popoverTitle: string = '';
  popoverMessage: string = 'Bạn có chắc chắn muốn xóa ?';
  isOpenTab1: boolean = true;

  constructor(private route: ActivatedRoute, private employeeDetailService: EmployeeDetailService, private router: Router,
    private generalService: GeneralService) {
    this.route.queryParams
      .subscribe(params => {
        this.employeeDetailService.getId(params.id);
      });
    const employeeFormSub = this.employeeDetailService.employeeForm.subscribe(res => {
      if (res) {
        this.employeeForm = res;
      }
    });
    const statusListSub = this.employeeDetailService.statusList.subscribe(res => {
      if (res) {
        this.statusList = res;
      }
    });
    const jobTitleListSub = this.employeeDetailService.jobTitleList.subscribe(res => {
      if (res) {
        this.jobTitleExceptIds = res.exceptIds;
        this.jobTitleIds = res.ids;
      }
    });
    this.employeeDetailService.getJobTitleListByTyping(this.jobTitleTyping);
    const jobLevelListSub = this.employeeDetailService.jobLevelList.subscribe(res => {
      if (res) {
        this.jobLevelExceptIds = res.exceptIds;
        this.jobLevelIds = res.ids;
      }
    });
    this.employeeDetailService.getJobLevelListByTyping(this.jobLevelTyping);
    this.employeeDetailSubs.add(employeeFormSub).add(statusListSub).add(jobTitleListSub).add(jobLevelListSub);
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.employeeDetailSubs.unsubscribe();
  }
  cancel() {
    this.router.navigate(['/master-data/employee/employee-list']);
  }

  delete() {
    this.employeeDetailService.delete(this.employeeForm.value).then(res => {
      this.router.navigate(['/master-data/employee/employee-list']);
    });
  }

  save() {
    if (!this.employeeForm.valid) {
      this.generalService.validateAllFormFields(this.employeeForm);
    } else {
      this.employeeDetailService.save(this.employeeForm).then(res => {
        this.router.navigate(['/master-data/employee/employee-list']);
      });
    }
  }

  openStatusList() {
    if (this.statusList.length === 0) {
      this.employeeDetailService.getStatusList();
    }
  }

  openJobTitleList(jobTitleId: string) {
    this.jobTitleSearchEntity = new JobTitleSearchEntity();
    this.jobTitleSearchEntity.ids.push(jobTitleId);
    this.employeeDetailService.getJobTitleList(this.jobTitleSearchEntity);
  }

  searchJobTitle(event: string) {
    this.jobTitleSearchEntity.code.startsWith = event;
    this.jobTitleSearchEntity.name.startsWith = event;
    this.jobTitleTyping.next(this.jobTitleSearchEntity);
  }

  openJobLevelList(jobTitleId: string) {
    this.jobLevelSearchEntity = new JobLevelSearchEntity();
    this.jobLevelSearchEntity.ids.push(jobTitleId);
    this.employeeDetailService.getJobTitleList(this.jobTitleSearchEntity);
  }

  searchJobLevel(event: string) {
    this.jobLevelSearchEntity.code.startsWith = event;
    this.jobLevelSearchEntity.name.startsWith = event;
    this.jobLevelTyping.next(this.jobLevelSearchEntity);
  }
}
