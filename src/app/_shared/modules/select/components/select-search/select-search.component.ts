import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit {

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit() {
  }

  onChange(event) {
    this.search.emit(event.target.value);
  }
}
