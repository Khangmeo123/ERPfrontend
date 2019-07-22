// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { Repository } from 'src/app/_helpers/repository';
// import { Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { environment } from 'src/environments/environment';
// import { NaturalResourceTaxSearchentity } from '../../../../_backend/resource-tax/resource-tax.searchentity';
// import { NaturalResourceTaxEntity } from '../../../../_backend/resource-tax/resource-tax.entity';
//
// @Injectable({
//   providedIn: 'root',
// })
// export class ResourceTaxRepository extends Repository {
//   constructor(public http: HttpClient) {
//     super(http);
//     this.apiUrl = environment.apiUrlApps + 'master-data/setOfBook';
//   }
//
//   getList(specialConsumptionTaxSearchEntity: NaturalResourceTaxSearchentity): Observable<NaturalResourceTaxEntity[]> {
//     return this.http.post<NaturalResourceTaxEntity[]>(this.apiUrl + '/list', JSON.stringify(specialConsumptionTaxSearchEntity),
//       {observe: 'response', headers: this.getHeader()}).pipe(
//       map(r => {
//         return r.body.map((item) => {
//           return new SpecialConsumptionTaxEntity(item);
//         });
//       }),
//     );
//   }
//
//   count(specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity): Observable<number> {
//     return this.http.post<number>(this.apiUrl + '/count', JSON.stringify(specialConsumptionTaxSearchEntity),
//       {observe: 'response', headers: this.getHeader()}).pipe(
//       map(r => r.body),
//     );
//   }
//
//   getId(specialConsumptionTaxId: string): Observable<SpecialConsumptionTaxEntity> {
//     return this.http.post<SpecialConsumptionTaxEntity>(this.apiUrl + '/get', JSON.stringify({Id: specialConsumptionTaxId}),
//       {observe: 'response', headers: this.getHeader()}).pipe(
//       map(r => {
//         return new SpecialConsumptionTaxEntity(r.body);
//       }),
//     );
//   }
//
//
//   add(specialConsumptionTaxEntity: any): Observable<boolean> {
//     return this.http.post<boolean>(this.apiUrl + '/create', JSON.stringify(specialConsumptionTaxEntity),
//       {observe: 'response', headers: this.getHeader()}).pipe(
//       map(r => r.body),
//     );
//   }
//
//   update(specialConsumptionTaxEntity: any): Observable<boolean> {
//     return this.http.post<boolean>(this.apiUrl + '/update', JSON.stringify(specialConsumptionTaxEntity),
//       {observe: 'response', headers: this.getHeader()}).pipe(
//       map(r => r.body),
//     );
//   }
//
//   delete(specialConsumptionTaxEntity: any): Observable<boolean> {
//     return this.http.post<boolean>(this.apiUrl + '/delete', JSON.stringify(specialConsumptionTaxEntity),
//       {observe: 'response', headers: this.getHeader()}).pipe(
//       map(r => r.body),
//     );
//   }
// }
