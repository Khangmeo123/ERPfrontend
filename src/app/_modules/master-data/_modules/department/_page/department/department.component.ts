import { Component, OnInit } from '@angular/core';
import { BookmarkService } from '../../../../../../_services';
import { DepartmentService } from './department.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  providers: [
    BookmarkService,
    DepartmentService,
  ],
})
export class DepartmentComponent implements OnInit {
  isSavedBookMark = false;

  routes = [
    {
      key: 'Nhân sự',
      route: '/master-data/department/employee',
    },
    {
      key: 'Tài sản',
      route: '/master-data/department/asset',
    },
    {
      key: 'Kho bãi',
      route: '/master-data/department/warehouse-group',
    },
    {
      key: 'Dự án',
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
