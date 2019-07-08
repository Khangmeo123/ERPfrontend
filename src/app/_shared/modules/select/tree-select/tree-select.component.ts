import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { toggleMenu } from './tree-select.animations';
import { ITreeNode } from './tree-select.interfaces';
import { Tree } from 'primeng/tree';

type SelectMode = 'single' | 'multiple' | 'checkbox';

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: [
    '../select.scss',
    './tree-select.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
  animations: [
    toggleMenu,
  ],
})
export class TreeSelectComponent implements OnInit, OnChanges {
  @Input() options: ITreeNode[] = [];

  @Input() mode: SelectMode = 'single';

  @Input() selectedLabel = 'selected';

  @Input() selectedListLabel = 'Selected';

  @Input() initialValue: ITreeNode[] | ITreeNode = null;

  @Input() isLoading = false;

  @Output() selector = new EventEmitter<ITreeNode | ITreeNode[]>();

  @ViewChild('tree', { static: false }) tree: Tree;

  public isOpened = false;

  public nodes: ITreeNode[] = [];

  ngOnInit(): void {
    if (this.initialValue) {
      this.selectedNodes = this.initialValue;
    }
  }

  ngOnChanges(changes) {
    if (changes.options) {
      if (changes.options.currentValue) {
        this.nodes = [];
        this.options.forEach((node: ITreeNode) => {
          this.retrieveAllSelected(node);
        });
      }
    }
  }

  retrieveAllSelected(node: ITreeNode) {
    if (node.selected) {
      this.nodes = [
        ...this.nodes,
        node,
      ];
    }
    if (node.children) {
      node.children.forEach((subNode) => {
        this.retrieveAllSelected(subNode);
      });
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

  set selectedNodes(data: ITreeNode[] | ITreeNode) {
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

  get rootClass() {
    return `select-component ${this.mode} ${this.isOpened ? 'show' : 'hide'}`;
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

  copyToClipboard(text: string) {
    const input = document.createElement('input');
    input.value = text;
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }

  toggleList() {
    this.isOpened = !this.isOpened;
  }

  onChange(data) {
    this.selector.emit(data);
  }

  onUnselect(event) {
    const {
      target: {
        value: index,
      },
    } = event;
    const node = this.nodes[index];
    this.options = [
      ...this.options,
      node,
    ];
    this.nodes = [
      ...this.nodes.slice(0, index),
      ...this.nodes.slice(index + 1),
    ];
  }
}
