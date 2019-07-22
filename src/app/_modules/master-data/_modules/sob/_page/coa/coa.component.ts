import { Component, OnInit } from '@angular/core';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { CoaService } from './coa.service';

@Component({
  selector: 'app-coa',
  templateUrl: './coa.component.html',
  styleUrls: ['./coa.component.scss'],
  providers: [
    CoaService,
  ],
})
export class CoaComponent implements OnInit {

  modalState = false;

  coaList: CoaEntity[] = [];

  coaSE: CoaSearchEntity = new CoaSearchEntity();

  constructor(private coaService: CoaService) {
  }

  ngOnInit() {
  }

  toggleModal() {
    this.modalState = !this.modalState;
  }
}
