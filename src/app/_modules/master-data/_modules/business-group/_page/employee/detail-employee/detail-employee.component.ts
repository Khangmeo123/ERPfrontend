import { Component, OnInit, OnChanges } from '@angular/core';
import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';

@Component({
  selector: 'app-detail-employee',
  templateUrl: './detail-employee.component.html',
  styleUrls: ['./detail-employee.component.scss']
})
export class DetailEmployeeComponent implements OnInit, OnChanges {

  isOpenTab1: boolean = true;

  display: boolean = false;
  filters = {
    id: new TextFilter(),
    name_contact: new TextFilter(),
    relationship: new TextFilter(),
    phone: new TextFilter(),
    email: new TextFilter(),
    address: new TextFilter(),
  }
  constructor() { }

  ngOnInit() {
  }

  ngOnChanges (){
  }

  onClickOpen(event) {
    this.isOpenTab1 = !this.isOpenTab1;
  }


}
