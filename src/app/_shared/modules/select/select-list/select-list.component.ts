import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {copy} from '../../../../_helpers/miscellaneous';

const COPIED_TOOLTIP = 'Copied';
const COPY_TOOLTIP = 'Copy';

@Component({
  selector: 'app-select-list',
  templateUrl: './select-list.component.html',
  styleUrls: ['./select-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SelectListComponent implements OnInit {

  @Input() dataSource: any[];

  @Input() key = 'label';

  @Input() selected = false;

  @Output() selectionChange = new EventEmitter();

  protected copyTooltip = COPIED_TOOLTIP;

  constructor() {
  }

  ngOnInit() {
  }

  onChange(event) {
    this.selectionChange.emit(event);
  }

  copy(event) {
    copy(event.target.previousElementSibling.innerText);
    event.stopPropagation();
  }
}
