import {UomSearchEntity} from 'src/app/_modules/master-data/_backend/uom/uom.searchentity';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Repository} from 'src/app/_helpers/repository';
import {Observable} from 'rxjs';
import {ItemEntity} from 'src/app/_modules/master-data/_backend/item/item.entity';
import {ItemSearchEntity} from 'src/app/_modules/master-data/_backend/item/item.searchentity';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {Entities, EnumEntity} from 'src/app/_helpers/entity';
import {UomEntity} from 'src/app/_modules/master-data/_backend/uom/uom.entity';

@Injectable({
  providedIn: 'root',
})
export class ItemListRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/business-group/item/item-list';
  }

  getList(itemSearchEntity: ItemSearchEntity): Observable<ItemEntity[]> {
    return this.http.post<ItemEntity[]>(this.apiUrl + '/list', JSON.stringify(itemSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new ItemEntity(item);
        });
      }),
    );
  }

  count(itemSearchEntity: ItemSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(itemSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getUomList(uomSearchEntity: UomSearchEntity): Observable<Entities> {
    return this.http.post<Entities>(this.apiUrl + '/drop-list-unit-of-measure', JSON.stringify(uomSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        r.body.ids = r.body.ids.map(item => {
          return new UomEntity(item);
        });
        r.body.exceptIds = r.body.exceptIds.map(item => {
          return new UomEntity(item);
        });
        return r.body;
      }),
    );
  }

  getStatusList(): Observable<EnumEntity[]> {
    return this.http.post<EnumEntity[]>(this.apiUrl + '/enum-list-status', JSON.stringify({}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  importFile(file: File) {
    const formData = new FormData();
    formData.append('file', file[0]);
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
