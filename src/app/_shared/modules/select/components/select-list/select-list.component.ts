import {Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation} from '@angular/core';
import {copy} from '../../../../../_helpers/miscellaneous';

const COPIED_TOOLTIP = 'Copied';

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

  copyTooltip = COPIED_TOOLTIP;

  constructor() {
  }

  ngOnInit() {
  }

  onChange(item, index) {
    this.selectionChange.emit({
      index,
      data: item,
    });
  }

  copy(event) {
    copy(event.target.previousElementSibling.innerText);
    event.stopPropagation();
  }

  ulFocus(event) {
    if (event.target.children[0]) {
      event.target.children[0].focus();
    }
  }

  keyDown(event) {
    const {target} = event;
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        if (target.nextElementSibling) {
          target.nextElementSibling.focus();
        }
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        if (target.previousElementSibling) {
          target.previousElementSibling.focus();
        }
        break;
      default:
        break;
    }
  }

  liPress(event, item, index) {
    if (event.key === 'Enter') {
      this.onChange(item, index);
    }
  }
}
