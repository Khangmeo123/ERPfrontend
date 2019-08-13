import {Repository} from '../../../../../../_helpers/repository';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from '../../../../../../../environments/environment';
import {ProvinceSearchEntity} from '../../../../_backend/province/province.searchentity';
import {Observable} from 'rxjs';
import {ProvinceEntity} from '../../../../_backend/province/province.entity';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProvinceRepository extends Repository {
  public apiUrl: string = `${environment.apiUrlApps}master-data/business-group/province`;

  constructor(http: HttpClient) {
    super(http);
  }

  public getList(provinceSearchEntity: ProvinceSearchEntity): Observable<ProvinceEntity[]> {
    return this.http.post<ProvinceEntity[]>(
      `${this.apiUrl}/list`,
      provinceSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ProvinceEntity[]>) => response.body,
        ),
      );
  }

  public count(provinceSearchEntity: ProvinceSearchEntity): Observable<number> {
    return this.http.post<number>(
      `${this.apiUrl}/count`,
      provinceSearchEntity,
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

  public get(provinceSearchEntity: ProvinceSearchEntity): Observable<ProvinceEntity> {
    return this.http.post<ProvinceEntity>(
      `${this.apiUrl}/get`,
      provinceSearchEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ProvinceEntity>) => response.body,
        ),
      );
  }

  public create(provinceEntity: ProvinceEntity): Observable<ProvinceEntity> {
    return this.http.post<ProvinceEntity>(
      `${this.apiUrl}/create`,
      provinceEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ProvinceEntity>) => response.body,
        ),
      );
  }

  public update(provinceEntity: ProvinceEntity): Observable<ProvinceEntity> {
    return this.http.post<ProvinceEntity>(
      `${this.apiUrl}/update`,
      provinceEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ProvinceEntity>) => response.body,
        ),
      );
  }

  public delete(provinceEntity: ProvinceEntity): Observable<ProvinceEntity> {
    return this.http.post<ProvinceEntity>(
      `${this.apiUrl}/delete`,
      provinceEntity,
      {
        observe: 'response',
        headers: this.getHeader(),
      },
    )
      .pipe(
        map(
          (response: HttpResponse<ProvinceEntity>) => response.body,
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
