import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
})
export class EmployeeComponent implements OnInit {

  modal = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleModal() {
    this.modal = !this.modal;
  }
}
