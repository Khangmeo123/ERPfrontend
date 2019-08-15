import {Repository} from '../../../../../../_helpers/repository';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {TaxTemplateEntity, TaxTemplateTypeEntity} from '../../../../_backend/tax-template/tax-template.entity';
import {TaxTemplateSearchEntity} from '../../../../_backend/tax-template/tax-template.search-entity';
import {Entities} from '../../../../../../_helpers/entity';
import {UomSearchEntity} from '../../../../_backend/uom/uom.searchentity';

@Injectable({
  providedIn: 'root',
})
export class TaxTemplateRepository extends Repository {
  public apiUrl: string = `${environment.apiUrlApps}master-data/business-group/tax-template/tax-template-list`;

  constructor(http: HttpClient) {
    super(http);
  }

  public getList(taxTemplateSearchEntity: TaxTemplateSearchEntity): Observable<TaxTemplateEntity[]> {
    return this.http.post<TaxTemplateEntity[]>(
      `${this.apiUrl}/list`,
      taxTemplateSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxTemplateEntity[]>) => response.body,
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

  public getUnitOfMeasureList(uomSearchEntity: UomSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(
      `${this.apiUrl}/enum-list-type`,
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

  public count(taxTemplateSearchEntity: TaxTemplateSearchEntity): Observable<number> {
    return this.http.post<number>(
      `${this.apiUrl}/count`,
      taxTemplateSearchEntity,
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

  public get(taxTemplateSearchEntity: TaxTemplateSearchEntity): Observable<TaxTemplateEntity> {
    return this.http.post<TaxTemplateEntity>(
      `${this.apiUrl}/get`,
      taxTemplateSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxTemplateEntity>) => response.body,
        ),
      );
  }

  public create(taxTemplateEntity: TaxTemplateEntity): Observable<TaxTemplateEntity> {
    return this.http.post<TaxTemplateEntity>(
      `${this.apiUrl}/create`,
      taxTemplateEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxTemplateEntity>) => response.body,
        ),
      );
  }

  public update(taxTemplateEntity: TaxTemplateEntity): Observable<TaxTemplateEntity> {
    return this.http.post<TaxTemplateEntity>(
      `${this.apiUrl}/update`,
      taxTemplateEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxTemplateEntity>) => response.body,
        ),
      );
  }

  public delete(taxTemplateEntity: TaxTemplateEntity): Observable<TaxTemplateEntity> {
    return this.http.post<TaxTemplateEntity>(
      `${this.apiUrl}/delete`,
      taxTemplateEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<TaxTemplateEntity>) => response.body,
        ),
      );
  }

  importFile(files: FileList) {
    const formData = new FormData();
    formData.append('file', files[0]);
    return this.http.post(
      this.apiUrl + '/import',
      formData,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(r => r.body),
      );
  }
}
