import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coa',
  templateUrl: './coa.component.html',
  styleUrls: ['./coa.component.scss'],
})
export class CoaComponent implements OnInit {

  modalState = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleModal() {
    this.modalState = !this.modalState;
  }
}
