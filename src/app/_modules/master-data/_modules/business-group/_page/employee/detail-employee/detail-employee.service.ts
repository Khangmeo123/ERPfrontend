import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { DetailEmployeeRepository } from './detail-employee.repository';
import { EmployeeForm } from 'src/app/_modules/master-data/_backend/employee/employee.form';

@Injectable()
export class DetailEmployeeService {
  private detailEmployeeForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(
    new EmployeeForm(),
  ));

  constructor(private fb: FormBuilder, private detailEmployeeRepository: DetailEmployeeRepository) {
    this.detailEmployeeForm.next(this.fb.group(
      new EmployeeForm(),
    ));
  }
}
