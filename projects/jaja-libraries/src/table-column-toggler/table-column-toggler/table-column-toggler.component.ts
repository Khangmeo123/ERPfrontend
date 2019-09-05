import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export interface IColumn {
  header: string;
  field: string;
  isSelected?: boolean;

  [key: string]: any;
}

@Component({
  selector: 'jaja-table-column-toggler',
  templateUrl: './table-column-toggler.component.html',
  styleUrls: [
    './table-column-toggler.component.scss',
  ],
})
export class TableColumnTogglerComponent implements OnInit {

  @Input()
  public appendTo: string = 'body';

  @Input()
  public columns: IColumn[] = [
    {
      header: 'Header 1',
      field: 'field-1',
    },
    {
      header: 'Header 2',
      field: 'field-2',
    },
    {
      header: 'Header 3',
      field: 'field-3',
    },
    {
      header: 'Header 4',
      field: 'field-4',
    },
  ];

  @Output()
  public selectColumn: EventEmitter<IColumn> = new EventEmitter<IColumn>();

  public arrow: string = 'keyboard_arrow_down';

  constructor() {
  }

  ngOnInit() {
  }

  onSelectColumn(event) {
    this.selectColumn.emit(event);
  }

  onToggle(dropdown) {
    this.arrow = dropdown.isOpen ? 'keyboard_arrow_up' : 'keyboard_arrow_down';
  }
}
