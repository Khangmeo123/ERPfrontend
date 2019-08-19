import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Repository} from 'src/app/_repositories/repository';
import {Observable} from 'rxjs';
import {BankEntity} from 'src/app/_modules/master-data/_backend/bank/bank.entity';
import {BankSearchEntity} from 'src/app/_modules/master-data/_backend/bank/bank.searchentity';
import {map} from 'rxjs/operators';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BankRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/business-group/bank';
  }

  getList(bankSearchEntity: BankSearchEntity): Observable<BankEntity[]> {
    return this.http.post<BankEntity[]>(this.apiUrl + '/list', JSON.stringify(bankSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new BankEntity(item);
        });
      }),
    );
  }

  count(bankSearchEntity: BankSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(bankSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getId(bankId: string): Observable<BankEntity> {
    return this.http.post<BankEntity>(this.apiUrl + '/get', JSON.stringify({Id: bankId}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return new BankEntity(r.body);
      }),
    );
  }


  add(bankEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(bankEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  update(bankEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(bankEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  deactivate(bankEntity: any): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(bankEntity),
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
