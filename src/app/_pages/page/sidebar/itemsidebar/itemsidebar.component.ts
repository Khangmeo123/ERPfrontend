import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ItemSidebar } from './itemsidebar.entity';
import { Router } from '@angular/router';
import { toggleMenu } from 'src/app/_shared/select/tree-select/tree-select.animations';
import { AppService } from 'src/app/_services';
import { toggleMenuSideBar, toggleMenuNavbar, toggleMenuNavbarRight, visibleSpan } from '../sidebar.animation';

@Component({
    selector: 'app-item-sidebar',
    templateUrl: './itemsidebar.component.html',
    styleUrls: ['./itemsidebar.component.scss'],
    animations: [toggleMenuNavbar, toggleMenuNavbarRight, toggleMenuSideBar, visibleSpan, ]
})
export class ItemSidebarComponent implements OnInit {
    expanded: boolean;
    @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
    @Input() item: ItemSidebar;
    @Input() depth = 0;
    @Input() isShowChild: boolean = false;
    @Input() listMenu = [];
    @Output() dataOut = new EventEmitter();


    private isShowOut: boolean;
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
        console.log('ngOnChanges listRootMenu', this.listRootMenu)
    }

    get animationState() {
        return this.expanded ? 'open' : 'closed';
    }

    onItemSelected(item: ItemSidebar, index) {
        let ele = document.querySelector('.menu-items');
        console.log('onItemSelected ele', ele);
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
            // this.disabled(item.children, item.disabled)
        }
        // console.log('onItemSelected', item);
    }





}
