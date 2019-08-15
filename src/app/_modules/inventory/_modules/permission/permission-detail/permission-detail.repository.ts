import {Repository} from '../../../../../_helpers/repository';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PermissionDetailRepository extends Repository {
  constructor(http: HttpClient) {
    super(http);
  }
}
