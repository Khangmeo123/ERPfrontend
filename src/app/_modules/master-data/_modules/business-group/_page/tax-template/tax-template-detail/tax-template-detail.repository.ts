import {HttpClient, HttpResponse} from '@angular/common/http';
import {Repository} from '../../../../../../../_helpers/repository';
import {environment} from '../../../../../../../../environments/environment';
import {LegalSearchEntity} from '../../../../../_backend/legal/legal.searchentity';
import {Observable} from 'rxjs';
import {Entities} from '../../../../../../../_helpers/entity';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';
import {TaxTemplateSearchEntity} from '../../../../../_backend/tax-template/tax-template.search-entity';
import {TaxTemplateEntity, TaxTemplateTypeEntity} from '../../../../../_backend/tax-template/tax-template.entity';
import {UomSearchEntity} from '../../../../../_backend/uom/uom.searchentity';
import {TaxTemplateContentSearchEntity} from '../../../../../_backend/tax-template-content/tax-template-content.search-entity';
import {TaxTemplateContentEntity} from '../../../../../_backend/tax-template-content/tax-template-content.entity';


@Injectable({
  providedIn: 'root',
})
export class TaxTemplateDetailRepository extends Repository {
  constructor(http?: HttpClient) {
    super(http);
    this.apiUrl = `${environment.apiUrlApps}master-data/business-group/tax-template/tax-template-detail`;
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

  public getUnitOfMeasureList(uomSearchEntity: UomSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/drop-list-unit-of-measure`,
      uomSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<Entities>) => response.body,
        ),
      );
  }

  public getTypeList(): Observable<TaxTemplateTypeEntity[]> {
    return this.http.post<TaxTemplateTypeEntity[]>(
      `${this.apiUrl}/enum-list-type`,
      {},
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxTemplateTypeEntity[]>) => response.body,
        ),
      );
  }

  getList(taxTemplateSearchEntity: TaxTemplateSearchEntity): Observable<TaxTemplateEntity[]> {
    return this.http.post<TaxTemplateEntity[]>(
      this.getUrl('list'),
      taxTemplateSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<TaxTemplateEntity[]>) => response.body),
      );
  }

  count(taxTemplateSearchEntity: TaxTemplateSearchEntity): Observable<number> {
    return this.http.post<number>(
      this.getUrl('list'),
      taxTemplateSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<number>) => response.body),
      );
  }

  get(taxTemplateDetailEntity: TaxTemplateEntity): Observable<TaxTemplateEntity> {
    return this.http.post<TaxTemplateEntity>(
      this.getUrl('get'),
      taxTemplateDetailEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<TaxTemplateEntity>) => new TaxTemplateEntity(response.body)),
      );
  }

  create(taxTemplateEntity: TaxTemplateEntity): Observable<TaxTemplateEntity> {
    return this.http.post<TaxTemplateEntity>(
      this.getUrl('create'),
      taxTemplateEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<TaxTemplateEntity>) => response.body),
      );
  }

  update(taxTemplateEntity: TaxTemplateEntity): Observable<TaxTemplateEntity> {
    return this.http.post<TaxTemplateEntity>(
      this.getUrl('update'),
      taxTemplateEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<TaxTemplateEntity>) => response.body),
      );
  }

  delete(taxTemplateEntity: TaxTemplateEntity): Observable<TaxTemplateEntity> {
    return this.http.post<TaxTemplateEntity>(
      this.getUrl('delete'),
      taxTemplateEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<TaxTemplateEntity>) => response.body),
      );
  }

  public getParentTaxList(parentTaxSearchEntity: TaxTemplateContentSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/drop-list-parent-tax`,
      parentTaxSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<Entities>) => {
          const entities: Entities = new Entities();
          entities.ids = response.body.ids.map((item) => new TaxTemplateContentEntity(item));
          entities.exceptIds = response.body.exceptIds.map((item) => new TaxTemplateContentEntity(item));
          return entities;
        }),
      );
  }
}
