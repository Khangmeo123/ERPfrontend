import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SobSearchEntity } from '../../../../_backend/sob/sob.searchentity';
import { Entities } from '../../../../../../_helpers/entity';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CoaRepository } from './coa.repository';
import { CoaForm } from '../../../../_backend/coa/coa.form';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { CharacteristicEntity } from '../../../../_backend/characteristic/characteristic.entity';

export class CoaService {
  public sobList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public coaList: BehaviorSubject<CoaEntity[]> = new BehaviorSubject([]);
  public parentAccountList: BehaviorSubject<Entities> = new BehaviorSubject(new Entities());
  public coaForm: BehaviorSubject<FormGroup>;
  public coaCount: BehaviorSubject<number> = new BehaviorSubject(0);
  public characteristicList: BehaviorSubject<CharacteristicEntity[]> = new BehaviorSubject([]);

  constructor(private fb: FormBuilder, private coaRepository: CoaRepository, private toastrService: ToastrService) {
    this.coaCount = new BehaviorSubject(0);
    this.coaForm = new BehaviorSubject(this.fb.group(
      new CoaForm(),
    ));
  }

  getCharacteristicList() {
    this.coaRepository.getCharacteristicList()
      .subscribe((list) => {
        this.characteristicList.next(list);
      });
  }

  getParentAccountList(coaSearchEntity: CoaSearchEntity) {
    this.coaRepository.getParentChartOfAccountList(coaSearchEntity).subscribe((list) => {
      if (list) {
        this.parentAccountList.next(list);
      }
    });
  }

  getList(coaSearchEntity: CoaSearchEntity) {
    forkJoin(this.coaRepository.getList(coaSearchEntity),
      this.coaRepository.count(coaSearchEntity)).subscribe(([list, count]) => {
      if (list) {
        this.coaList.next(list);
      }
      if (count) {
        this.coaCount.next(count);
      }
    });
  }

  getSobList(sobSearchEntity: SobSearchEntity) {
    this.coaRepository.getSobList(sobSearchEntity)
      .subscribe((list: Entities) => {
        if (list) {
          this.sobList.next(list);
        }
      });
  }

  resetForm() {
    this.parentAccountList.next(new Entities());
    this.coaForm.next(this.fb.group(
      new CoaForm(),
    ));
  }

  add() {
    this.resetForm();
  }

  cancel() {
    this.resetForm();
  }

  edit(coaId: string) {
    this.coaRepository.getId(coaId).subscribe(res => {
      if (res) {
        this.coaForm.next(this.fb.group(
          new CoaForm(res),
        ));
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  }

  save(coaEntity: any, coaSearchEntity: CoaSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      if (coaEntity.id === null || coaEntity.id === undefined) {
        this.coaRepository.add(coaEntity).subscribe(res => {
          if (res) {
            this.getList(coaSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.coaForm.next(this.fb.group(
              new CoaForm(err),
            ));
            reject(true);
          }
        });
      } else {
        this.coaRepository.update(coaEntity).subscribe(res => {
          if (res) {
            this.getList(coaSearchEntity);
            this.toastrService.success('Cập nhật thành công !');
            resolve(false);
          }
        }, err => {
          if (err) {
            this.coaForm.next(this.fb.group(
              new CoaForm(err),
            ));
            reject(true);
          }
        });
      }
    });

  }

  deactivate(coaEntity: any, coaSearchEntity: CoaSearchEntity): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.coaRepository.deactivate(coaEntity).subscribe(res => {
        if (res) {
          this.getList(coaSearchEntity);
          this.toastrService.success('Cập nhật thành công !');
          resolve(false);
        }
      }, err => {
        if (err) {
          this.coaForm.next(this.fb.group(
            new CoaForm(err),
          ));
          reject(true);
        }
      });
    });
  }
}
