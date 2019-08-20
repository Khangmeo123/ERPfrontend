import {Repository} from '../../../../../../../_repositories/repository';
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {LegalSearchEntity} from '../../../../../_backend/legal/legal.searchentity';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../../../environments/environment';
import {Entities} from '../../../../../../../_helpers/entity';
import {map} from 'rxjs/operators';
import {CodeFormulaSearchEntity} from '../../../../../_backend/code-formula/code-formula.search-entity';
import {SplitRuleEntity} from '../../../../../_backend/code-formula/code-formula.entity';

@Injectable({
  providedIn: 'root',
})
export class CodeFormulaListRepository extends Repository {
  constructor(http?: HttpClient) {
    super(http);
    this.apiUrl = `${environment.apiUrlApps}master-data/legal-entity/code-formula/code-formula-list`;
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
      this.getUrl('list-split-rule'),
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
      this.getUrl('count-split-rule'),
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

  create(splitRuleEntity: SplitRuleEntity): Observable<SplitRuleEntity> {
    return this.http.post<SplitRuleEntity>(
      this.getUrl('create'),
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
      this.getUrl('update'),
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
      this.getUrl('delete'),
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
}
