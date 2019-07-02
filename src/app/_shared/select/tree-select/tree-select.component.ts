import {Component, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {TreeNode} from 'primeng/api';
import {toggleMenu} from './tree-select.component.animations';
import {Tree} from 'primeng/tree';

type SelectMode = 'single' | 'multiple' | 'checkbox';

@Component({
  selector: 'app-tree',
  templateUrl: './tree-select.component.html',
  styleUrls: [
    './tree-select.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    toggleMenu,
  ],
})
export class TreeSelectComponent implements OnInit {
  options: TreeNode[] = [];

  @Input() mode: SelectMode = 'single';

  @Input() selectedLabel = 'mục đã chọn';

  @Input() initialValue: TreeNode[] | TreeNode = null;

  @Input() isLoading = false;

  @Output() selector = new EventEmitter<TreeNode | TreeNode[]>();

  @ViewChild('tree', {static: false}) tree: Tree;

  private isOpened = false;

  private nodes: TreeNode[] = [];

  ngOnInit(): void {
    if (this.initialValue) {
      this.selectedNodes = this.initialValue;
    }
  }

  get displayClearButton() {
    return this.nodes.length > 0;
  }

  get animationState() {
    return this.isOpened ? 'open' : 'closed';
  }

  get toggleState() {
    return `${this.isOpened ? 'pi pi-caret-up' : 'pi pi-caret-down'} mx-1`;
  }

  clearSelection() {
    if (this.nodes.length > 0) {
      this.nodes = [];
    }
  }

  get isSingle() {
    return this.mode === 'single';
  }

  onKeyDown(event) {
    console.log(event.key);
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      const parentNode = event.target.parentNode.parentNode;
      const firstElement = parentNode.querySelector('.select-list ul li');
      console.log(firstElement);
      if (firstElement) {
        firstElement.firstChild.focus();
      }
    }
  }

  get selectedNodes() {
    if (this.isSingle) {
      if (this.nodes.length > 0) {
        return this.nodes[0];
      }
      return null;
    }
    return this.nodes;
  }

  set selectedNodes(data: TreeNode[] | TreeNode) {
    if (this.mode === 'checkbox') {
      this.nodes = Object.values(data);
      return;
    }
    const node = data[0] || data;
    if (this.isSingle) {
      if (this.nodes.length === 1) {
        if (this.nodes[0] === node) {
          this.nodes = [];
          return;
        }
      }
      this.nodes[0] = node;
      return;
    }
    const index = this.nodes.indexOf(node);
    if (index >= 0) {
      this.nodes = [
        ...this.nodes.slice(0, index),
        ...this.nodes.slice(index + 1),
      ];
      return;
    }
    this.nodes = [
      ...this.nodes,
      node,
    ];
  }

  get selectedText() {
    if (this.isSingle) {
      if (this.nodes.length === 1) {
        return this.nodes[0].label;
      }
    }
    return `${this.nodes.length} ${this.selectedLabel}`;
  }

  onSelect() {
    if (this.isSingle) {
      this.closeList();
    }
  }

  openList() {
    if (!this.isOpened) {
      this.isOpened = true;
    }
  }

  closeList() {
    if (this.isOpened) {
      this.isOpened = false;
    }
  }

  toggleList() {
    this.isOpened = !this.isOpened;
  }

  onChange(data) {
    this.selector.emit(data);
  }
}
