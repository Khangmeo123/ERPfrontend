import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { VoucherListRepository } from './voucher.repository';
import { VoucherListEntity } from '../../../../_backend/voucher-list/voucher-list.entity';
import { VoucherListForm } from '../../../../_backend/voucher-list/voucher-list.form';
import { VoucherListSearchEntity } from '../../../../_backend/voucher-list/voucher-list.searchentity';

export class VoucherListService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public voucherList: BehaviorSubject<VoucherListEntity[]> = new BehaviorSubject([]);
  public voucherListForm: BehaviorSubject<FormGroup>;
  public voucherListCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private fb: FormBuilder, private voucherListRepository: VoucherListRepository, private toastrService: ToastrService) {
    this.voucherListCount = new BehaviorSubject(0);
    this.voucherListForm = new BehaviorSubject(this.fb.group(
      new VoucherListForm(),
    ));
  }

  getList(voucherListSearchEntity: VoucherListSearchEntity) {
    forkJoin(this.voucherListRepository.getList(voucherListSearchEntity),
      this.voucherListRepository.count(voucherListSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.voucherList.next(list);
      }
      if (count) {
        this.voucherListCount.next(count);
      }
    });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.voucherListRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  add() {
    this.voucherListForm.next(this.fb.group(
      new VoucherListForm(),
    ));
  }

  cancel() {
    this.voucherListForm.next(this.fb.group(
      new VoucherListForm(),
    ));
  }

  edit(voucherListId: string) {
    this.voucherListRepository.getId(voucherListId).subscribe(res => {
      if (res) {
        this.voucherListForm.next(this.fb.group(
          new VoucherListForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(voucherListEntity: any, voucherListSearchEntity: VoucherListSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (voucherListEntity.id === null || voucherListEntity.id === undefined) {
        this.voucherListRepository.add(voucherListEntity).subscribe(res => {
          if (res) {
            this.getList(voucherListSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.voucherListForm.next(this.fb.group(
              new VoucherListForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.voucherListRepository.update(voucherListEntity).subscribe(res => {
          if (res) {
            this.getList(voucherListSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.voucherListForm.next(this.fb.group(
              new VoucherListForm(err),
            ));
            reject(true);
          }
        });
      }
    });

  }

  deactivate(voucherListEntity: any, voucherListSearchEntity: VoucherListSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.voucherListRepository.deactivate(voucherListEntity).subscribe(res => {
        if (res) {
          this.getList(voucherListSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.voucherListForm.next(this.fb.group(
            new VoucherListForm(err),
          ));
          reject(true);
        }
      });
    });

  }
}
