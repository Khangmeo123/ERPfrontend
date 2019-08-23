import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PermissionEntity, PermissionForm } from '../permission.entities';
import { PermissionDetailRepository } from './permission-detail.repository';
import { Entities, EnumEntity } from '../../../../../_helpers/entity';
import { ToastrService } from 'ngx-toastr';
import { translate } from '../../../../../_helpers/string';

@Injectable({
  providedIn: 'root',
})
export class PermissionDetailService {
  permissionForm: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  constructor(
    private permissionDetailRepository: PermissionDetailRepository,
    private fb: FormBuilder,
    private toastrService: ToastrService,
  ) {
    this.permissionForm.next(
      this.fb.group(
        new PermissionForm(),
      ),
    );
  }

  get(id: string): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.permissionDetailRepository.get(id)
        .subscribe(
          (permissionEntity: PermissionEntity) => {
            this.permissionForm.next(
              this.fb.group(
                new PermissionForm(permissionEntity),
              ),
            );
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  save(permissionEntity: PermissionEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      (
        permissionEntity.id
          ? this.permissionDetailRepository.update(permissionEntity)
          : this.permissionDetailRepository.create(permissionEntity)
      )
        .subscribe(
          () => {
            this.toastrService.success('permission.update.success');
            resolve();
          },
          (error: Error) => {
            this.toastrService.error('permission.update.error');
            reject(error);
          },
        );
    });
  }
}
