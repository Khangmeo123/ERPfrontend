import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sob',
  templateUrl: './sob.component.html',
  styleUrls: ['./sob.component.scss'],
})
export class SobComponent implements OnInit {

  visible = false;
  isSaveBookMark: boolean = false;

  constructor() {
  }

  isAdd = true;

  ngOnInit() {
  }

  toggleModal() {
    this.visible = !this.visible;
  }

  onClickSaveBookMark() {
    this.isSaveBookMark = !this.onClickSaveBookMark;
  }
}
