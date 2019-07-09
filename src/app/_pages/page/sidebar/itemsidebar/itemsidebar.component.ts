import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ItemSidebar } from './itemsidebar.entity';
import { Router } from '@angular/router';
import { AppService } from 'src/app/_services';
import { toggleMenuSideBar, toggleMenuNavbar } from '../sidebar.animation';

@Component({
    selector: 'app-item-sidebar',
    templateUrl: './itemsidebar.component.html',
    styleUrls: ['./itemsidebar.component.scss'],
    animations: [toggleMenuNavbar, toggleMenuSideBar]
})
export class ItemSidebarComponent implements OnInit {
    expanded: boolean;
    @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
    @Input() item: ItemSidebar;
    @Input() depth = 0;
    @Input() isShowChild: boolean = false;
    @Input() listMenu = [];
    @Output() dataOut = new EventEmitter();


    public isShowOut: boolean;
    public isTogge: boolean = false;
    public listRootMenu = []

    constructor(public router: Router, private appService: AppService) {
    }

    ngOnInit() {
    }

    ngOnChanges(change) {
        if (change.isShowChild && this.isShowChild !== undefined) {
            this.isShowOut = this.isShowChild;
        }

        if (change.listMenu && this.listMenu && this.listMenu.length > 0) {
            this.listRootMenu = this.listMenu;
        }
    }


    onItemSelected(item: ItemSidebar, index) {
        let ele = document.querySelector('.menu-items');
        if (item.children && item.children.length) {
            this.expanded = !this.expanded;
            if (item.iconName === 1) {
                item.disabled = true;
                if (this.expanded === true) {
                    for (const menu of this.listRootMenu) {
                        if (item.displayName !== menu.displayName) {
                            menu.disabled = false;
                        }
                    }
                } else {
                    for (const menu of this.listRootMenu) {
                        menu.disabled = true;
                    }
                }
                this.dataOut.emit(this.listRootMenu);

            }
        }
    }

}
