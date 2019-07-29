import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PaymentTermEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.entity';
import { PaymentTermRepository } from './payment-term.repository';
import { PaymentTermSearchEntity } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.searchentity';
import { PaymentTermForm } from 'src/app/_modules/master-data/_backend/payment-term/payment-term.form';
import { Entities } from 'src/app/_helpers/entity';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';

export class PaymentTermService {
  public paymentTermList: BehaviorSubject<PaymentTermEntity[]>;
  public paymentTermCount: BehaviorSubject<number>;
  public paymentTermForm: BehaviorSubject<FormGroup>;

  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());

  constructor(private fb: FormBuilder, private paymentTermRepository: PaymentTermRepository, private toastrService: ToastrService) {
    this.paymentTermCount = new BehaviorSubject(0);
    this.paymentTermList = new BehaviorSubject([]);
    this.paymentTermForm = new BehaviorSubject(this.fb.group(
      new PaymentTermForm(),
    ));
  }

  getList(paymentTermSearchEntity: PaymentTermSearchEntity) {
    forkJoin(this.paymentTermRepository.getList(paymentTermSearchEntity),
      this.paymentTermRepository.count(paymentTermSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.paymentTermList.next(list);
      }
      if (count) {
        this.paymentTermCount.next(count);
      }
    });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.paymentTermRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        this.sobList.next(list);
      });
  }

  add() {
    this.paymentTermForm.next(this.fb.group(
      new PaymentTermForm(),
    ));
  }

  cancel() {
    this.paymentTermForm.next(this.fb.group(
      new PaymentTermForm(),
    ));
  }

  edit(paymentTermId: string) {
    this.paymentTermRepository.getId(paymentTermId).subscribe(res => {
      if (res) {
        this.paymentTermForm.next(this.fb.group(
          new PaymentTermForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(paymentTermEntity: any, paymentTermSearchEntity: PaymentTermSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      if (paymentTermEntity.id === null || paymentTermEntity.id === undefined) {
        this.paymentTermRepository.add(paymentTermEntity).subscribe(res => {
          if (res) {
            this.getList(paymentTermSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.paymentTermForm.next(this.fb.group(
              new PaymentTermForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.paymentTermRepository.update(paymentTermEntity).subscribe(res => {
          if (res) {
            this.getList(paymentTermSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.paymentTermForm.next(this.fb.group(
              new PaymentTermForm(err),
            ));
            reject(true);
          }
        });
      }
    });
    return defered;
  }

  delete(paymentTermEntity: any, paymentTermSearchEntity: PaymentTermSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.paymentTermRepository.delete(paymentTermEntity).subscribe(res => {
        if (res) {
          this.getList(paymentTermSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.paymentTermForm.next(this.fb.group(
            new PaymentTermForm(err),
          ));
          reject(true);
        }
      });
    });
    return defered;
  }
}
