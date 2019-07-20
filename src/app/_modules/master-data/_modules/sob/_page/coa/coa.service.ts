import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CoaEntity } from '../../../../_backend/coa/coa.entity';
import { CoaForm } from '../../../../_backend/coa/coa.form';
import { CoaSearchEntity } from '../../../../_backend/coa/coa.searchentity';
import { CoaRepository } from './coa.repository';

export class CoaService {
  public coaList: BehaviorSubject<CoaEntity[]>;
  public coaCount: BehaviorSubject<number>;
  public coaForm: BehaviorSubject<FormGroup>;

  constructor(private fb: FormBuilder, private coaRepository: CoaRepository, private toastrService: ToastrService) {
    this.coaCount = new BehaviorSubject(0);
    this.coaList = new BehaviorSubject([]);
    this.coaForm = new BehaviorSubject(this.fb.group(
      new CoaForm(),
    ));
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

  add() {
    this.coaForm.next(this.fb.group(
      new CoaForm(),
    ));
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
    const defered = new Promise<boolean>((resolve, reject) => {
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
    return defered;
  }

  delete(coaEntity: any, coaSearchEntity: CoaSearchEntity): Promise<boolean> {
    const defered = new Promise<boolean>((resolve, reject) => {
      this.coaRepository.delete(coaEntity).subscribe(res => {
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
    return defered;
  }
}
