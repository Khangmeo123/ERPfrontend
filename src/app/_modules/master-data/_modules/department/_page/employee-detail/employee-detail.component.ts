import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { DepartmentService } from '../department/department.service';
import { Subscription } from 'rxjs';
import { EmployeeEntity } from '../../../../_backend/employee/employee.entity';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  providers: [
    ToastrService,
    GeneralService,
  ],
})
export class EmployeeDetailComponent implements OnInit {
  contactsModal = false;

  isOpenTab1: boolean = false;
  isOpenTab2: boolean = false;
  isOpenTab3: boolean = false;

  public employee: EmployeeEntity = new EmployeeEntity();

  public subscription: Subscription = new Subscription();

  public contactForm: FormGroup;

  constructor(
    private departmentService: DepartmentService,
    private toastrService: ToastrService,
    private generalService: GeneralService,
  ) {
    const employeeSub: Subscription = this.departmentService.selectedEmployee.subscribe((employee: EmployeeEntity) => {
      this.employee = employee;
    });

    this.subscription
      .add(employeeSub);
  }

  ngOnInit() {
  }

  onClickOpen(event) {
    this.isOpenTab1 = !this.isOpenTab1;
  }

  onClickOpenTab2() {
    this.isOpenTab2 = !this.isOpenTab2;
  }

  onClickOpenTab3() {
    this.isOpenTab3 = !this.isOpenTab3;
  }

  toggleContactsModal() {
    this.contactsModal = !this.contactsModal;
  }

  onClickCancel() {

  }

  onClickSave() {

  }

  onClickDelete() {

  }
}
