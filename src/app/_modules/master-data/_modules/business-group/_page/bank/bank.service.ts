import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { BankRepository } from './bank.repository';
import { BankForm } from 'src/app/_modules/master-data/_backend/bank/bank.form';

@Injectable()
export class BankService {
  private bankForm: BehaviorSubject<FormGroup | undefined> = new BehaviorSubject(this.fb.group(
    new BankForm(),
  ));

  constructor(private fb: FormBuilder, private bankRepository: BankRepository) {
    this.bankForm.next(this.fb.group(
      new BankForm(),
    ));
  }
}
