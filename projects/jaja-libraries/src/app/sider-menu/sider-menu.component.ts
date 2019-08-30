import {Component, OnInit} from '@angular/core';

interface IRoute {
  path: string;
  title: string;
  exact?: boolean;
  children?: IRoute[];
}

@Component({
  selector: 'app-sider-menu',
  templateUrl: './sider-menu.component.html',
  styleUrls: ['./sider-menu.component.scss'],
})
export class SiderMenuComponent implements OnInit {

  menu: IRoute[] = [
    {
      path: '',
      title: 'JAJA Libraries',
      exact: false,
      children: [
        {
          path: 'table-column-toggler',
          title: 'Column toggler',
          exact: false,
        },
      ],
    },
  ];

  constructor() {
  }

  ngOnInit() {
  }
}
