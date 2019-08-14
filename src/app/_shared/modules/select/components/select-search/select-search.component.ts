import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';

@Component({
    selector: 'app-select-search',
    templateUrl: './select-search.component.html',
    styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit {

    @Output() search: EventEmitter<string> = new EventEmitter<string>();

    @ViewChild('inputElement', {static: true}) inputElement;

    constructor() {
    }

    ngOnInit() {
        this.inputElement.nativeElement.focus();
    }

    onChange(event) {
        this.search.emit(event.target.value);
    }
}
