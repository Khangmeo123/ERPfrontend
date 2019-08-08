import { Component, OnDestroy, OnInit } from '@angular/core';
import { BinLocationService } from './bin-location.service';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { Subscription } from 'rxjs';
import { BinLocationEntity } from '../../../../_backend/bin-location/bin-location.entity';
import { Entities } from '../../../../../../_helpers/entity';
import { LegalSearchEntity } from '../../../../_backend/legal/legal.searchentity';

@Component({
  selector: 'app-bin-location',
  templateUrl: './bin-location.component.html',
  styleUrls: ['./bin-location.component.scss'],
  providers: [
    BinLocationService,
  ],
})
export class BinLocationComponent implements OnInit, OnDestroy {

  public subscription: Subscription = new Subscription();

  public legalEntityList: LegalEntity[] = [];

  public legalSearchEntity: LegalSearchEntity = new LegalSearchEntity();

  public selectedLegalEntityList: LegalEntity[] = [];

  public level1List: BinLocationEntity[] = [];

  public level2List: BinLocationEntity[] = [];

  public level3List: BinLocationEntity[] = [];

  public level4List: BinLocationEntity[] = [];

  constructor(private binLocationService: BinLocationService) {

    const legalEntitySub: Subscription = this.binLocationService.legalEntityList.subscribe((entities: Entities) => {
      this.legalEntityList = entities.exceptIds;
      this.selectedLegalEntityList = entities.ids;
    });

    const level1Sub: Subscription = this.binLocationService.subLevel1List.subscribe((list: BinLocationEntity[]) => {
      this.level1List = list;
    });

    const level2Sub: Subscription = this.binLocationService.subLevel1List.subscribe((list: BinLocationEntity[]) => {
      this.level2List = list;
    });

    const level3Sub: Subscription = this.binLocationService.subLevel1List.subscribe((list: BinLocationEntity[]) => {
      this.level3List = list;
    });

    const level4Sub: Subscription = this.binLocationService.subLevel1List.subscribe((list: BinLocationEntity[]) => {
      this.level4List = list;
    });

    this.subscription
      .add(legalEntitySub)
      .add(level1Sub)
      .add(level2Sub)
      .add(level3Sub)
      .add(level4Sub);
  }

  ngOnInit(): void {
    this.getLegalEntityList();
  }

  getLegalEntityList() {
    this.legalSearchEntity = new LegalSearchEntity();
    return this.binLocationService.getLegalEntityList(this.legalSearchEntity);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
