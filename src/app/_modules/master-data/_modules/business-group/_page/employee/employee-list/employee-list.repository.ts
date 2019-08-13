import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Repository } from 'src/app/_helpers/repository';
import { environment } from 'src/environments/environment';
import { EmployeeSearchEntity } from 'src/app/_modules/master-data/_backend/employee/employee.searchentity';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EmployeeEntity } from 'src/app/_modules/master-data/_backend/employee/employee.entity';
import { EnumEntity } from 'src/app/_helpers/entity';
import { PasswordEntity } from '../../../../../_backend/password/password.entity';

@Injectable({
  providedIn: 'root',
})
export class EmployeeListRepository extends Repository {
  constructor(public http: HttpClient) {
    super(http);
    this.apiUrl = environment.apiUrlApps + 'master-data/business-group/employee/employee-list';
  }

  getList(employeeSearchEntity: EmployeeSearchEntity): Observable<EmployeeEntity[]> {
    return this.http.post<EmployeeEntity[]>(this.apiUrl + '/list', JSON.stringify(employeeSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => {
        return r.body.map((item) => {
          return new EmployeeEntity(item);
        });
      }),
    );
  }

  count(employeeSearchEntity: EmployeeSearchEntity): Observable<number> {
    return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(employeeSearchEntity),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  getStatusList(): Observable<EnumEntity[]> {
    return this.http.post<EnumEntity[]>(this.apiUrl + '/enum-list-status', JSON.stringify({}),
      {observe: 'response', headers: this.getHeader()}).pipe(
      map(r => r.body),
    );
  }

  changePassword(passwordEntity: PasswordEntity): Observable<PasswordEntity> {
    return this.http.post<PasswordEntity>(
      this.apiUrl + '/change-password',
      passwordEntity,
      {observe: 'response', headers: this.getHeader()},
    )
      .pipe(
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
