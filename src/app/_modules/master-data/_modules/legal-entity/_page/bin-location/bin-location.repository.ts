import {Repository} from '../../../../../../_helpers/repository';
import {Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {LegalSearchEntity} from '../../../../_backend/legal/legal.searchentity';
import {Observable} from 'rxjs';
import {environment} from '../../../../../../../environments/environment';
import {Entities} from '../../../../../../_helpers/entity';
import {map} from 'rxjs/operators';
import {BinLocationSearchEntity} from '../../../../_backend/bin-location/bin-location.search-entity';
import {BinLocationEntity} from '../../../../_backend/bin-location/bin-location.entity';

@Injectable({
  providedIn: 'root',
})
export class BinLocationRepository extends Repository {
  constructor(http?: HttpClient) {
    super(http);
    this.apiUrl = `${environment.apiUrlApps}master-data/legal-entity/bin-location`;
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

  getSubLevel1List(binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> {
    return this.http.post<BinLocationEntity[]>(
      this.getUrl('list-sub-level-1'),
      binLocationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<BinLocationEntity[]>) => response.body),
      );
  }

  getSubLevel2List(binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> {
    return this.http.post<BinLocationEntity[]>(
      this.getUrl('list-sub-level-2'),
      binLocationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<BinLocationEntity[]>) => response.body),
      );
  }

  getSubLevel3List(binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> {
    return this.http.post<BinLocationEntity[]>(
      this.getUrl('list-sub-level-3'),
      binLocationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<BinLocationEntity[]>) => response.body),
      );
  }

  getSubLevel4List(binLocationSearchEntity: BinLocationSearchEntity): Observable<BinLocationEntity[]> {
    return this.http.post<BinLocationEntity[]>(
      this.getUrl('list-sub-level-4'),
      binLocationSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<BinLocationEntity[]>) => response.body),
      );
  }

  updateSubLevelEntity(level: number, binLocationEntity: BinLocationEntity): Observable<BinLocationEntity> {
    return this.http.post<BinLocationEntity>(
      this.getUrl(`update-sub-level-${level}`),
      binLocationEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map((response: HttpResponse<BinLocationEntity>) => response.body),
      );
  }
}
