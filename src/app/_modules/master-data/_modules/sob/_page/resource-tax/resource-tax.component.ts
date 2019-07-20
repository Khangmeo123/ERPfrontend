import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-tax',
  templateUrl: './resource-tax.component.html',
  styleUrls: ['./resource-tax.component.scss']
})
export class ResourceTaxComponent implements OnInit {
  visible = false;
  constructor() { }

  ngOnInit() {
  }

  toggleModal() {
    this.visible = !this.visible;
  }
}
