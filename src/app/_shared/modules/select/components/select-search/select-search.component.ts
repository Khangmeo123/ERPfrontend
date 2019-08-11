import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss'],
})
export class SelectSearchComponent implements OnInit {

  @Output() search = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  onChange(event) {
    this.search.emit(event);
  }
}
