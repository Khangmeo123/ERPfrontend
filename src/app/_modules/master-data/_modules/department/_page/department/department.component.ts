import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../../../../../_services';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [
    BookmarkService,
  ],
})
export class DepartmentComponent implements OnInit {

  isSavedBookMark = false;

  routes = [
    {
      key: 'department.employee.title',
      route: '/master-data/department/employee',
    },
    {
      key: 'department.asset.title',
      route: '/master-data/department/asset',
    },
    {
      key: 'department.warehouse.title',
      route: '/master-data/department/warehouse',
    },
    {
      key: 'department.project.title',
      route: '/master-data/department/project',
    },
  ];

  constructor(private bookmarkService: BookmarkService) {
  }

  ngOnInit() {
  }

  onClickSaveBookMark(event) {
    console.log(event);
  }
}
