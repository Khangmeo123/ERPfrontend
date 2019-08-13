import {HttpClient, HttpResponse} from '@angular/common/http';
import {Repository} from '../../../../../../../_helpers/repository';
import {environment} from '../../../../../../../../environments/environment';
import {LegalSearchEntity} from '../../../../../_backend/legal/legal.searchentity';
import {Observable} from 'rxjs';
import {Entities} from '../../../../../../../_helpers/entity';
import {SplitRuleEntity} from '../../../../../_backend/code-formula/code-formula.entity';
import {CodeFormulaSearchEntity} from '../../../../../_backend/code-formula/code-formula.search-entity';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {ItemSearchEntity} from '../../../../../_backend/item/item.searchentity';
import {ItemEntity} from '../../../../../_backend/item/item.entity';


@Injectable({
  providedIn: 'root',
})
export class CodeFormulaDetailRepository extends Repository {
  constructor(http?: HttpClient) {
    super(http);
    this.apiUrl = `${environment.apiUrlApps}master-data/legal-entity/code-formula/code-formula-detail`;
  }

  getUrl(url: string) {
    return `${this.apiUrl}/${url}`;
  }

  getLegalEntityList(legalSearchEntity: LegalSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      this.getUrl('drop-list-legal-entity'),
      legalSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<Entities>) => response.body),
      );
  }

  getList(codeFormulaSearchEntity: CodeFormulaSearchEntity): Observable<SplitRuleEntity[]> {
    return this.http.post<SplitRuleEntity[]>(
      this.getUrl('list'),
      codeFormulaSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<SplitRuleEntity[]>) => response.body),
      );
  }

  count(codeFormulaSearchEntity: CodeFormulaSearchEntity): Observable<number> {
    return this.http.post<number>(
      this.getUrl('list'),
      codeFormulaSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<number>) => response.body),
      );
  }

  get(splitRuleEntity: SplitRuleEntity): Observable<SplitRuleEntity> {
    return this.http.post<SplitRuleEntity>(
      this.getUrl('get-split-rule'),
      splitRuleEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<SplitRuleEntity>) => response.body),
      );
  }

  create(splitRuleEntity: SplitRuleEntity): Observable<SplitRuleEntity> {
    return this.http.post<SplitRuleEntity>(
      this.getUrl('create-split-rule'),
      splitRuleEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<SplitRuleEntity>) => response.body),
      );
  }

  update(splitRuleEntity: SplitRuleEntity): Observable<SplitRuleEntity> {
    return this.http.post<SplitRuleEntity>(
      this.getUrl('update-split-rule'),
      splitRuleEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<SplitRuleEntity>) => response.body),
      );
  }

  delete(splitRuleEntity: SplitRuleEntity): Observable<SplitRuleEntity> {
    return this.http.post<SplitRuleEntity>(
      this.getUrl('delete-split-rule'),
      splitRuleEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<SplitRuleEntity>) => response.body),
      );
  }

  getItemList(itemSearchEntity: ItemSearchEntity): Observable<ItemEntity[]> {
    return this.http.post<ItemEntity[]>(
      this.getUrl('list-item'),
      itemSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ItemEntity[]>) => response.body,
        ),
      );
  }

  countItemList(itemSearchEntity: ItemSearchEntity): Observable<number> {
    return this.http.post<number>(
      this.getUrl('count-item'),
      itemSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<number>) => response.body,
        ),
      );
  }
}
