import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { PermissionEntity, PermissionSearchEntity } from '../permission.entities';
import { PermissionRepository } from './permission.repository';
import { EnumEntity } from '../../../../../_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../_helpers/string';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {

  documentStatus: BehaviorSubject<EnumEntity[]> = new BehaviorSubject<EnumEntity[]>([]);

  permissionList: BehaviorSubject<PermissionEntity[]> = new BehaviorSubject<PermissionEntity[]>([]);

  permissionCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private permissionRepository: PermissionRepository, private toastrService: ToastrService) {
  }

  getList(permissionSearchEntity: PermissionSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      forkJoin(
        this.permissionRepository.getList(permissionSearchEntity),
        this.permissionRepository.count(permissionSearchEntity),
      )
        .subscribe(
          ([list, count]) => {
            this.permissionList.next(list);
            this.permissionCount.next(count);
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }
}
