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

  public employee: EmployeeEntity = new EmployeeEntity({
    hrOrganizationId: '7a8dd522-3015-4f10-9a7a-1e4353346a23',
    id: '7006cc57-07ef-44cc-956c-146415296d83',
    code: '00001',
    name: 'Nguyen Van An',
  });

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
