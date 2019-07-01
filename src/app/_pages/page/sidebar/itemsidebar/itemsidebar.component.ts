import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ItemSidebar } from './itemsidebar.entity';
import { Router } from '@angular/router';

@Component({
    selector: 'app-item-sidebar',
    templateUrl: './itemsidebar.component.html',
    // styleUrls: ['./itemsidebar.component.scss'],
    animations: [
        trigger('indicatorRotate', [
            state('collapsed', style({ transform: 'rotate(0deg)' })),
            state('expanded', style({ transform: 'rotate(180deg)' })),
            transition('expanded <=> collapsed',
                animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
            ),
        ])
    ]
})
export class ItemSidebarComponent implements OnInit {
    expanded: boolean;
    @HostBinding('attr.aria-expanded') ariaExpanded = this.expanded;
    @Input() item: ItemSidebar;
    @Input() depth = 0;
    constructor(public router: Router) { }

    ngOnInit() {
        console.log('item: : : ', this.item)
    }
    onItemSelected(item: ItemSidebar) {
        if (!item.children || !item.children.length) {
            this.router.navigate([item.route]);
        }
        if (item.children && item.children.length) {
            this.expanded = !this.expanded;
        }
    }
}
