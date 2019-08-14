import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ISelect, SelectMode } from '../../select.interface';
import { toggleMenu } from '../../../../animations/toggleMenu';
import { buildTree, getListDirection, initiateSelectedNodes } from '../../helpers';
import { addItemToArray, removeItemByIndex } from '../../../../../_helpers/array.helper';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    toggleMenu,
  ],
})
export class TreeSelectComponent implements OnInit, OnChanges, ISelect {

  @Input() selectedSuffix = 'selected';

  @Input() disabled = false;

  @Input() mode: SelectMode = 'single';

  @Input() dataSource: any[] = [];

  @Input() key = 'label';

  @Input() selectedIds = [];

  @Input() firstLoad = false;

  @Output() firstLoadData = new EventEmitter();

  @Input() scaleX = '';

  @Output() selectionChange = new EventEmitter();

  listDirection = 'down';

  @Input() direction: string = 'auto';

  treeData: any[] = [];

  selectedNodes: any[] = [];

  isLoading = false;

  isOpened = false;

  public id: string;

  constructor() {
    this.id = Guid.create().toString();
  }

  get hasData() {
    return this.treeData && this.treeData.length;
  }

  get hasSelectedData() {
    return this.selectedNodes && this.selectedNodes.length;
  }

  get selection() {
    if (this.isSingle) {
      if (this.selectedNodes.length) {
        return this.selectedNodes[0];
      }
      return null;
    }
    return this.selectedNodes;
  }

  set selection(data) {
    if (this.isCheckbox) {
      this.selectedNodes = data;
      this.onChange();
      return;
    }
    const node = data[0] || data;
    const index = this.selectedNodes.indexOf(node);
    if (index >= 0) {
      this.selectedNodes = removeItemByIndex(this.selectedNodes, index);
      this.onChange();
      return;
    }
    if (this.isSingle) {
      this.selectedNodes[0] = node;
      this.onChange();
      return;
    }
    this.selectedNodes = addItemToArray(this.selectedNodes, node);
    this.onChange();
    return;
  }

  get selectedText() {
    const {
      key,
      selectedNodes,
      isSingle,
    } = this;
    if (isSingle) {
      if (selectedNodes.length) {
        return selectedNodes[0][key];
      }
    }
    return `${selectedNodes.length} ${this.selectedSuffix}`;
  }

  get listState() {
    return this.isOpened ? 'opened' : 'closed';
  }

  get isSingle() {
    return this.mode === 'single';
  }

  get isCheckbox() {
    return this.mode === 'checkbox';
  }

  @Input() valueSelector = (node) => node.id;

  ngOnInit() {
  }

  openList(event) {
    if (!this.isOpened) {
      this.beforeOpenList(event);
    }
    this.isOpened = true;
  }

  toggleList(event) {
    if (this.isOpened) {
      this.closeList(event);
    } else {
      this.openList(event);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dataSource) {
      if (this.isLoading) {
        this.isLoading = false;
      }
      if (this.dataSource.length >= 0) {
        this.treeData = buildTree(this.dataSource);
      }
    }
    if (changes.selectedIds) {
      this.selectedNodes = initiateSelectedNodes(this.dataSource, this.selectedIds);
    }
  }

  closeList(event) {
    if (this.isOpened) {
      this.beforeCloseList(event);
    }
    this.isOpened = false;
  }

  beforeCloseList(event) {
    // Do nothing
  }

  beforeOpenList(event) {
    if (this.firstLoad) {
      if (this.firstLoadData) {
        this.isLoading = true;
        this.firstLoad = false;
        this.firstLoadData.emit();
      }
    }
    if (this.direction === 'auto') {
      this.listDirection = getListDirection(event.target);
    } else {
      this.listDirection = this.direction;
    }
  }

  onSelect(data) {
  }

  onUnselect(event) {
  }

  unselect(event) {
    const {index} = event;
    if (this.isSingle) {
      this.selectedNodes = [];
    } else {
      this.selectedNodes = removeItemByIndex(this.selectedNodes, index);
    }
    this.onChange();
  }

  onChange() {
    this.selectionChange.emit(
      this.selectedNodes.map(this.valueSelector),
    );
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
