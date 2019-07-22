import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { EmployeeListRepository } from './employee-list.repository';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';

@Injectable()
export class EmployeeListService {
  public employeeList: BehaviorSubject<EmployeeEntity[]>;
  public employeeCount: BehaviorSubject<number>;
  constructor(private employeeRepository: EmployeeListRepository, private toastrService: ToastrService) {
    this.employeeList = new BehaviorSubject([]);
    this.employeeCount = new BehaviorSubject(0);
  }

  getList(employeeSearchEntity: EmployeeSearchEntity) {
    forkJoin(this.employeeRepository.getList(employeeSearchEntity),
      this.employeeRepository.count(employeeSearchEntity)).subscribe(([list, count]) => {
        if (list) {
          this.employeeList.next(list);
        }
        if (count) {
          this.employeeCount.next(count);
        }
      });
  }
}
