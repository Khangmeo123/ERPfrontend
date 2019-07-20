import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethodEntity } from '../../../../_backend/payment-method/payment-method.entity';
import { PaymentMethodRepository } from './payment-method.repository';
import { PaymentMethodForm } from '../../../../_backend/payment-method/payment-method.form';
import { PaymentMethodSearchEntity } from '../../../../_backend/payment-method/payment-method.searchentity';

export class PaymentMethodService {
  public paymentMethodList: BehaviorSubject<PaymentMethodEntity[]>;
  public paymentMethodCount: BehaviorSubject<number>;
  public paymentMethodForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private paymentMethodRepository: PaymentMethodRepository, private toastrService: ToastrService) {
    this.paymentMethodCount = new BehaviorSubject(0);
    this.paymentMethodList = new BehaviorSubject([]);
    this.paymentMethodForm = new BehaviorSubject(this.fb.group(
      new PaymentMethodForm(),
    ));
  }

  getList(paymentMethodSearchEntity: PaymentMethodSearchEntity) {
    forkJoin(this.paymentMethodRepository.getList(paymentMethodSearchEntity),
      this.paymentMethodRepository.count(paymentMethodSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.paymentMethodList.next(list);
      }
      if (count) {
        this.paymentMethodCount.next(count);
      }
    });
  }

  add() {
    this.paymentMethodForm.next(this.fb.group(
      new PaymentMethodForm(),
    ));
  }

  edit(paymentMethodId: string) {
    this.paymentMethodRepository.getId(paymentMethodId).subscribe(res => {
      if (res) {
        this.paymentMethodForm.next(this.fb.group(
          new PaymentMethodForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(paymentMethodEntity: any, paymentMethodSearchEntity: PaymentMethodSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (paymentMethodEntity.id === null || paymentMethodEntity.id === undefined) {
        this.paymentMethodRepository.add(paymentMethodEntity).subscribe(res => {
          if (res) {
            this.getList(paymentMethodSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.paymentMethodForm.next(this.fb.group(
              new PaymentMethodForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.paymentMethodRepository.update(paymentMethodEntity).subscribe(res => {
          if (res) {
            this.getList(paymentMethodSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.paymentMethodForm.next(this.fb.group(
              new PaymentMethodForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(paymentMethodEntity: any, paymentMethodSearchEntity: PaymentMethodSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.paymentMethodRepository.delete(paymentMethodEntity).subscribe(res => {
        if (res) {
          this.getList(paymentMethodSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.paymentMethodForm.next(this.fb.group(
            new PaymentMethodForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
