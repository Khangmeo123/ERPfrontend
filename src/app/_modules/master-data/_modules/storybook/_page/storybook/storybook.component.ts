import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-storybook',
  templateUrl: './storybook.component.html',
  styleUrls: ['./storybook.component.scss'],
})
export class StorybookComponent implements OnInit {

  visible = false;

  constructor() {
  }

  isAdd = true;

  ngOnInit() {
  }

  toggleModal() {
    this.visible = !this.visible;
  }
}
