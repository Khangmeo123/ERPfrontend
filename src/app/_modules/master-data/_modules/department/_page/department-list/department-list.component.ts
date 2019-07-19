import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {

  modal = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleModal() {
    this.modal = !this.modal;
  }
}
