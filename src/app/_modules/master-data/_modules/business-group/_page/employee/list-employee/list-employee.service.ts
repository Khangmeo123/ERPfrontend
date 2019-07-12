import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EmployeeRepository } from './list-employee.repository';

@Injectable()
export class BankService {
  constructor(private employeeRepository: EmployeeRepository) {
  }
}
