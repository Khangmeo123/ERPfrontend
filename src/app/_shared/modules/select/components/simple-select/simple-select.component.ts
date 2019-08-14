import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {toggleMenu} from '../../../../animations/toggleMenu';
import {ISelect} from '../../select.interface';
import {getListDirection} from '../../helpers';
import {Guid} from 'guid-typescript';

@Component({
    selector: 'app-simple-select',
    templateUrl: './simple-select.component.html',
    styleUrls: ['./simple-select.component.scss'],
    animations: [
        toggleMenu,
    ],
})
export class SimpleSelectComponent implements OnInit, ISelect, OnChanges {
    @Input() list = [];

    @Input() initialValue = null;

    selectedItem = null;

    @Input() disabled = false;

    isOpened = false;

    listDirection = 'down';

    @Input() direction: string = 'auto';

    isLoading = false;

    @Input() key = 'label';

    @Output() selectionChange = new EventEmitter();

    @Output() listOpen = new EventEmitter();

    @Output() clear: EventEmitter<void> = new EventEmitter<void>();

    public id: string;

    currentValue: string;

    constructor() {
        this.id = Guid.create().toString();
    }

    get listState() {
        return this.isOpened ? 'opened' : 'closed';
    }

    get hasData() {
        return this.list && this.list.length;
    }

    @Input() valueSelector = (node) => node.id;

    beforeOpenList(event) {
        if (this.direction === 'auto') {
            this.listDirection = getListDirection(event.target);
        } else {
            this.listDirection = this.direction;
        }
        this.isLoading = true;
        this.listOpen.emit(event);
    }

    beforeCloseList(event) {
    }

    toggleList(event) {
        if (this.isOpened) {
            this.closeList(event);
        } else {
            this.openList(event);
        }
    }

    closeList(event) {
        if (this.isOpened) {
            this.beforeCloseList(event);
            this.isOpened = false;
        }
    }

    onChange() {
    }

    onSelect(event) {
        const {data} = event;
        this.selectedItem = data;
        this.currentValue = data[this.key];
        this.selectionChange.emit(this.valueSelector(data));
        this.isOpened = false;
    }

    onUnselect(event) {
    }

    openList(event) {
        if (!this.isOpened) {
            this.beforeOpenList(event);
            this.isOpened = true;
        }
    }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.initialValue) {
            if (!changes.initialValue.currentValue) {
                this.selectedItem = null;
                this.initialValue = null;
            } else {
                const pattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
                if (pattern.test(changes.initialValue.currentValue)) {
                    this.initialValue = this.currentValue;
                }
            }
        }
    }

    onClear() {
        this.initialValue = null;
        this.selectedItem = null;
        this.clear.emit();
    }

    onClickOutside(event) {
        if (event.id === this.id) {
            return;
        }
        this.closeList(event);
    }

    onHeadClick(event) {
        event.id = this.id;
        this.toggleList(event);
    }
}
