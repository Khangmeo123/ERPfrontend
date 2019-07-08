import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild, ViewEncapsulation} from '@angular/core';
import {ISelect, SelectMode} from '../select.interface';
import {toggleMenu} from '../../../animations/toggleMenu';
import {buildTree, getListDirection, initiateSelectedNodes} from '../helpers';

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

  @Input() dataSource: any[] = [];

  @Input() mode: SelectMode = 'single';

  @Input() key = 'label';

  @Output() selectionChange = new EventEmitter();

  @Output() firstLoadData = new EventEmitter();

  @ViewChild('head', {static: true}) head;

  @Input() firstLoad = false;

  @Input() selectedIds = [];

  @Input() width = 1;

  listDirection = 'down';

  treeData: any[] = [];

  selectedNodes: any[];

  isLoading = false;

  isOpened = false;

  get selection() {
    if (this.isSingle) {
      if (this.selectedNodes.length) {
        return this.selectedNodes[0];
      }
      return null;
    }
    return this.selectedNodes;
  }

  set selection(data) {}

  get selectedText() {
    if (this.isSingle) {
      if (this.selectedNodes.length) {
        return this.selectedNodes[0][this.key];
      }
    }
    return `${this.selectedNodes.length} selected`;
  }

  get listState() {
    return this.isOpened ? 'opened' : 'closed';
  }

  get selectedData() {
    if (this.isSingle) {
      if (this.selectedNodes.length > 0) {
        return this.selectedNodes[0];
      }
      return null;
    }
    return this.selectedNodes;
  }

  set selectedData(data) {
    if (this.isCheckbox) {
      this.selectedNodes = data;
      return;
    }
    const node = data[0] || data;
    if (this.isSingle) {
      if (this.selectedNodes.length > 0) {
        if (this.selectedNodes[0] === node) {
          // if the node is currently selected, remove it from selected list
          this.selectedNodes = [];
          return;
        }
      }
      // set as currently node
      this.selectedNodes[0] = node;
      return;
    }
    const index = this.selectedNodes.indexOf(node);
    if (index >= 0) {
      this.selectedNodes = [
        ...this.selectedNodes.slice(0, index),
        ...this.selectedNodes.slice(index + 1),
      ];
      return;
    }
    this.selectedNodes = [
      ...this.selectedNodes,
      node,
    ];
    return;
  }

  get isSingle() {
    return this.mode === 'single';
  }

  get isCheckbox() {
    return this.mode === 'checkbox';
  }

  @Input() valueSelector = (node) => node;

  ngOnInit() {
    this.treeData = buildTree(this.dataSource);
    this.selectedNodes = initiateSelectedNodes(this.dataSource, this.selectedIds);
  }

  openList(event) {
    if (!this.isOpened) {
      this.beforeOpenList(event);
    }
    this.isOpened = true;
  }

  toggleList(event) {
    if (this.isOpened) {
      this.beforeCloseList(event);
    } else {
      this.beforeOpenList(event);
    }
    this.isOpened = !this.isOpened;
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
  }

  closeList(event) {
    if (this.isOpened) {
      this.beforeCloseList(event);
    }
    this.isOpened = false;
  }

  beforeCloseList(event) {
  }

  beforeOpenList(event) {
    if (this.firstLoad) {
      if (this.firstLoadData) {
        this.isLoading = true;
        this.firstLoad = false;
        this.firstLoadData.emit();
      }
    }
    console.log(event.target.getBoundingClientRect().width);
    this.listDirection = getListDirection(event.target);
  }

  onUnselect(event) {
    // No need
  }

  unselect({index}) {
    if (this.isSingle) {
      this.selectedNodes = [];
      return;
    }
    this.selectedNodes = [
      ...this.selectedNodes.slice(0, index),
      ...this.selectedNodes.slice(index + 1),
    ];
  }

  onSelect(data) {
    this.selectedData = data;
    const event = this.selectedNodes.map(this.valueSelector);
    this.selectionChange.emit(event);
  }

  onChange() {

  }
}
