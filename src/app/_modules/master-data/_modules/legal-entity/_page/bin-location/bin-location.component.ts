import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { BinLocationService } from './bin-location.service';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { Subscription } from 'rxjs';
import { BinLocationEntity, BinLocationFieldEntity } from '../../../../_backend/bin-location/bin-location.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';
import { BinLocationSearchEntity } from '../../../../_backend/bin-location/bin-location.search-entity';
import { FormControl, FormGroup } from '@angular/forms';
import { GeneralService } from '../../../../../../_helpers/general-service.service';

@Component({
  selector: 'app-bin-location',
  templateUrl: './bin-location.component.html',
  styleUrls: ['./bin-location.component.scss'],
  providers: [
    BinLocationService,
    GeneralService,
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

  public binLocationFieldEntity: BinLocationFieldEntity = null;

  constructor(private binLocationService: BinLocationService, private generalService: GeneralService) {

    const legalEntitySub: Subscription = this.binLocationService.legalEntityList.subscribe(async (entities: Entities) => {
      this.legalEntityList = entities.exceptIds;
      this.selectedLegalEntityList = entities.ids;

      if (this.legalEntityList.length) {
        const legalEntity: LegalEntity = this.legalEntityList[0];
        const binLocationFieldSearchEntity: BinLocationSearchEntity = new BinLocationSearchEntity();
        binLocationFieldSearchEntity.legalEntityId = legalEntity.id;
        this.selectLegalEntity(legalEntity);
        await this.binLocationService.getBinLocationFieldEntity(binLocationFieldSearchEntity);
      }
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

    const binLocationFieldSub: Subscription = this.binLocationService.binLocationFieldEntity
      .subscribe((binLocationFieldEntity: BinLocationFieldEntity) => {
        this.binLocationFieldEntity = binLocationFieldEntity;
      });

    this.subscription
      .add(legalEntitySub)
      .add(level1Sub)
      .add(level2Sub)
      .add(level3Sub)
      .add(level4Sub)
      .add(binLocationFormSub)
      .add(binLocationFieldSub);
  }

  get code() {
    return this.binLocationForm.get('code') as FormControl;
  }

  get name() {
    return this.binLocationForm.get('name') as FormControl;
  }

  get errors() {
    return this.binLocationForm.get('errors') as FormGroup;
  }

  get legalEntityId() {
    return this.binLocationForm.get('legalEntityId') as FormControl;
  }

  public legalEntitySelector = node => node;

  async ngOnInit() {
    await this.getLegalEntityList();
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

  openModal() {
    this.modal = true;
  }

  closeModal() {
    this.modal = false;
  }

  add(level: number) {
    this.binLocationService.add(level);
    this.legalEntityId.setValue(this.legalEntity.id);
    this.openModal();
  }

  edit(binLocationEntity: BinLocationEntity, level: number) {
    this.binLocationService.edit(binLocationEntity, level);
    this.openModal();
  }

  cancel() {
    this.binLocationService.cancel();
    this.closeModal();
  }

  save() {
    if (this.binLocationForm.invalid) {
      this.generalService.validateAllFormFields(this.binLocationForm);
    }
    if (this.binLocationForm.valid) {
      return this.binLocationService.save(this.binLocationForm.value, this[`level${this.binLocationService.level}SearchEntity`])
        .then(() => {
          this.closeModal();
        });
    }
  }

  delete(binLocationEntity: BinLocationEntity) {
    this.binLocationService.delete(binLocationEntity, this[`level${this.binLocationService.level}SearchEntity`])
      .then(() => {
        this.closeModal();
      });
  }

  onFilterChange(level: number) {
    this.binLocationService[`getSubLevel${level}List`](this[`level${level}SearchEntity`]);
  }
}
