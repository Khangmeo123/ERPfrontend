import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  tmptable = [ 
    {
      code: '1',
      name: 'Nguyễn Thị Hương'
    }
  ]

  constructor(protected router: Router) { }

  ngOnInit() {
  }

  onClickViewDetail() {
    this.router.navigate(['/master-data/department/employee/detail-employee']);
  }

}
