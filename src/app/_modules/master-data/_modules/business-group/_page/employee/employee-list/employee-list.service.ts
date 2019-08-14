import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { EmployeeListRepository } from './employee-list.repository';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordForm } from '../../../../../_backend/password/password.form';
import { PasswordEntity } from '../../../../../_backend/password/password.entity';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../../../_helpers/string';

@Injectable()
export class EmployeeListService {
  public employeeList: BehaviorSubject<EmployeeEntity[]>;
  public employeeCount: BehaviorSubject<number>;
  public statusList: BehaviorSubject<EnumEntity[]>;

  public passwordForm: BehaviorSubject<FormGroup>;

  constructor(private employeeRepository: EmployeeListRepository, private fb: FormBuilder, private toastrService: ToastrService) {
    this.employeeList = new BehaviorSubject([]);
    this.employeeCount = new BehaviorSubject(0);
    this.statusList = new BehaviorSubject([]);
    this.passwordForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new PasswordForm(),
      ),
    );
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

  getStatusList() {
    this.employeeRepository.getStatusList().subscribe(res => {
      if (res) {
        this.statusList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  changePassword(id: string) {
    const form: PasswordForm = new PasswordForm();
    form.id.setValue(id);
    this.passwordForm.next(
      this.fb.group(
        form,
      ),
    );
  }

  savePassword(passwordEntity: PasswordEntity) {
    return new Promise((resolve, reject) => {
      this.employeeRepository.changePassword(passwordEntity)
        .subscribe(
          (entity: PasswordEntity) => {
            this.toastrService.success(translate('employee.password.success'));
            resolve(entity);
          },
          (error: Error) => {
            this.toastrService.error(translate('employee.password.error'));
            reject(error);
          },
        );
    });
  }

  importFile(file: File) {
    return new Promise((resolve, reject) => {
      this.employeeRepository.importFile(file).subscribe(res => {
        if (res) {
          this.toastrService.success(translate('general.import.success'));
          resolve();
        }
      }, err => {
        if (err) {
          this.toastrService.error(translate('general.import.error'));
          reject(err);
        }
      });
    });
  }
}
