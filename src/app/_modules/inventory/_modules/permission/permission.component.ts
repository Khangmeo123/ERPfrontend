import { Component, OnInit } from '@angular/core';
import {translate} from '../../../../_helpers/string';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {
  pageTitle = translate('permission.header.title');

  constructor() { }

  ngOnInit() {
  }

  sort(event) {

  }

}
