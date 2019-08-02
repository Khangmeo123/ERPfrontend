import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentMethodEntity } from '../../../../_backend/payment-method/payment-method.entity';
import { PaymentMethodRepository } from './payment-method.repository';
import { PaymentMethodForm } from '../../../../_backend/payment-method/payment-method.form';
import { PaymentMethodSearchEntity } from '../../../../_backend/payment-method/payment-method.searchentity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { translate } from '../../../../../../_helpers/string';

export class PaymentMethodService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public paymentMethodList: BehaviorSubject<PaymentMethodEntity[]> = new BehaviorSubject([]);
  public paymentMethodForm: BehaviorSubject<FormGroup>;
  public paymentMethodCount: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private fb: FormBuilder, private paymentMethodRepository: PaymentMethodRepository, private toastrService: ToastrService) {
    this.paymentMethodCount = new BehaviorSubject(0);
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

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.paymentMethodRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  add() {
    this.paymentMethodForm.next(this.fb.group(
      new PaymentMethodForm(),
    ));
  }

  cancel() {
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
    return new Promise<boolean>((resolve, reject) => {
      if (paymentMethodEntity.id === null || paymentMethodEntity.id === undefined) {
        this.paymentMethodRepository.add(paymentMethodEntity).subscribe(res => {
          if (res) {
            this.getList(paymentMethodSearchEntity);
            this.toastrService.success(translate('general.update.success'));
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
            console.log(res);
            this.getList(paymentMethodSearchEntity);
            this.toastrService.success(translate('general.update.success'));
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

  }

  delete(paymentMethodEntity: any, paymentMethodSearchEntity: PaymentMethodSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.paymentMethodRepository.delete(paymentMethodEntity).subscribe(res => {
        if (res) {
          this.getList(paymentMethodSearchEntity);
          this.toastrService.success(translate('general.update.success'));
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

  }
}
