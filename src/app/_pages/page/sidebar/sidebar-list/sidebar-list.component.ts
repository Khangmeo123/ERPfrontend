import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { SidebarItem } from '../interfaces/SidebarItem';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-list',
  templateUrl: './sidebar-list.component.html',
  styleUrls: ['./sidebar-list.component.scss'],
})
export class SidebarListComponent implements OnInit {
  @Input() level = 0;

  @Input() menu: SidebarItem[] = [];

  @Input() pinned = false;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    console.log(this.activatedRoute);
  }
}
