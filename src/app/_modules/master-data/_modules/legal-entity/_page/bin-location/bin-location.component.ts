import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {BinLocationService} from './bin-location.service';
import {LegalEntity} from '../../../../_backend/legal/legal.entity';
import {Subscription} from 'rxjs';
import {BinLocationEntity} from '../../../../_backend/bin-location/bin-location.entity';
import {Entities} from '../../../../../../_helpers/entity';
import {LegalSearchEntity} from '../../../../_backend/legal/legal.searchentity';
import {BinLocationSearchEntity} from '../../../../_backend/bin-location/bin-location.search-entity';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-bin-location',
  templateUrl: './bin-location.component.html',
  styleUrls: ['./bin-location.component.scss'],
  providers: [
    BinLocationService,
  ],
  encapsulation: ViewEncapsulation.None,
})
export class BinLocationComponent implements OnInit, OnDestroy, OnChanges {

  public subscription: Subscription = new Subscription();

  public legalEntity: LegalEntity = null;

  public legalEntityList: LegalEntity[] = [];

  public legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  public selectedLegalEntityList: LegalEntity[] = [];

  public level1List: BinLocationEntity[] = [];

  public level1SearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  public level2List: BinLocationEntity[] = [];

  public level2SearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  public level3List: BinLocationEntity[] = [];

  public level3SearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  public level4List: BinLocationEntity[] = [];

  public level4SearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();

  public modal: boolean = false;

  public binLocationForm: FormGroup;

  constructor(private binLocationService: BinLocationService) {

    const legalEntitySub: Subscription = this.binLocationService.legalEntityList.subscribe((entities: Entities) => {
      this.legalEntityList = entities.exceptIds;
      this.selectedLegalEntityList = entities.ids;
    });

    const level1Sub: Subscription = this.binLocationService.subLevel1List.subscribe((list: BinLocationEntity[]) => {
      this.level1List = list;
    });

    const level2Sub: Subscription = this.binLocationService.subLevel2List.subscribe((list: BinLocationEntity[]) => {
      this.level2List = list;
    });

    const level3Sub: Subscription = this.binLocationService.subLevel3List.subscribe((list: BinLocationEntity[]) => {
      this.level3List = list;
    });

    const level4Sub: Subscription = this.binLocationService.subLevel4List.subscribe((list: BinLocationEntity[]) => {
      this.level4List = list;
    });

    const binLocationFormSub: Subscription = this.binLocationService.binLocationForm.subscribe((form: FormGroup) => {
      this.binLocationForm = form;
    });

    this.subscription
      .add(legalEntitySub)
      .add(level1Sub)
      .add(level2Sub)
      .add(level3Sub)
      .add(level4Sub)
      .add(binLocationFormSub);
  }

  public legalEntitySelector = node => node;

  ngOnInit(): void {
    this.getLegalEntityList()
      .then(() => {
        if (this.legalEntityList.length) {
          this.selectLegalEntity(this.legalEntityList[0]);
        }
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  selectLegalEntity(legalEntity: LegalEntity) {
    this.legalEntity = legalEntity;

    this.level1SearchEntity.legalEntityId = legalEntity.id;
    this.binLocationService.getSubLevel1List(this.level1SearchEntity);

    this.level2SearchEntity.legalEntityId = legalEntity.id;
    this.binLocationService.getSubLevel2List(this.level2SearchEntity);

    this.level3SearchEntity.legalEntityId = legalEntity.id;
    this.binLocationService.getSubLevel3List(this.level3SearchEntity);

    this.level4SearchEntity.legalEntityId = legalEntity.id;
    this.binLocationService.getSubLevel4List(this.level4SearchEntity);
  }

  getLegalEntityList() {
    this.legalSearchEntity = new LegalSearchEntity();
    if (this.legalEntity) {
      this.legalSearchEntity.ids = [
        this.legalEntity.id,
      ];
    }
    return this.binLocationService.getLegalEntityList(this.legalSearchEntity);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onOpenLegalEntityList() {
    this.getLegalEntityList();
  }

  onSearchLegalEntity(event) {
    this.legalSearchEntity.name.startsWith = event;
    return this.binLocationService.getLegalEntityList(this.legalSearchEntity);
  }

  onSelectLegalEntity(event) {
    if (event) {
      if (event.length) {
        this.selectLegalEntity(event[0]);
      }
    }
  }

  async onChangeRowData(event, level: number, rowData: BinLocationEntity) {
    if (event.key === 'Enter') {
      this.binLocationService.updateSubLevelEntity(level, rowData);
    }
  }

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  add() {
    this.binLocationService.add();
    this.openModal();
  }

  edit(binLocationEntity: BinLocationEntity) {
    this.binLocationService.edit(binLocationEntity);
    this.openModal();
  }

  cancel() {
    this.binLocationService.cancel();
    this.closeModal();
  }

  save() {

  }
}
