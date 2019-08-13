import {Injectable} from '@angular/core';
import {BehaviorSubject, forkJoin} from 'rxjs';
import {ProvinceEntity} from '../../../../_backend/province/province.entity';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ProvinceForm} from '../../../../_backend/province/province.form';
import {ProvinceSearchEntity} from '../../../../_backend/province/province.searchentity';
import {ProvinceRepository} from './province.repository';
import {translate} from '../../../../../../_helpers/string';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ProvinceService {
  public provinceList: BehaviorSubject<ProvinceEntity[]> = new BehaviorSubject<ProvinceEntity[]>([]);

  public provinceCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public provinceForm: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);

  constructor(private fb: FormBuilder, private provinceRepository: ProvinceRepository, private toastrService: ToastrService) {
    this.provinceForm.next(
      this.fb.group(
        new ProvinceForm(),
      ),
    );
  }

  public getList(provinceSearchEntity: ProvinceSearchEntity): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      forkJoin(
        this.provinceRepository.getList(provinceSearchEntity),
        this.provinceRepository.count(provinceSearchEntity),
      )
        .subscribe(
          ([list, count]) => {
            this.provinceList.next(list);
            this.provinceCount.next(count);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  public get(provinceSearchEntity: ProvinceSearchEntity): Promise<ProvinceEntity> {
    return new Promise<ProvinceEntity>((resolve, reject) => {
      this.provinceRepository.get(provinceSearchEntity)
        .subscribe(
          (province: ProvinceEntity) => {
            this.provinceForm.next(
              this.fb.group(
                new ProvinceForm(province),
              ),
            );
            resolve();
          },
          (error: Error) => {
            this.toastrService.error(translate('province.get.error'));
            reject(error);
          },
        );
    });
  }

  public save(provinceEntity: ProvinceEntity): Promise<ProvinceEntity> {
    return new Promise<ProvinceEntity>((resolve, reject) => {
      (
        provinceEntity.id
          ? this.provinceRepository.update(provinceEntity)
          : this.provinceRepository.create(provinceEntity)
      )
        .subscribe(
          (province: ProvinceEntity) => {
            this.toastrService.success(translate('province.update.success'));
            resolve(province);
          },
          (error: Error) => {
            this.toastrService.error(translate('province.update.error'));
            reject(error);
          },
        );
    });
  }

  public delete(provinceEntity: ProvinceEntity): Promise<ProvinceEntity> {
    return new Promise<ProvinceEntity>((resolve, reject) => {
      this.provinceRepository.delete(provinceEntity)
        .subscribe(
          (province: ProvinceEntity) => {
            this.toastrService.success(translate('province.delete.success'));
            resolve(province);
          },
          (error: Error) => {
            this.toastrService.error(translate('province.create.error'));
            reject(error);
          },
        );
    });
  }

  public resetForm() {
    this.provinceForm.next(
      this.fb.group(
        new ProvinceForm(),
      ),
    );
  }

  edit(provinceEntity: ProvinceEntity) {
    this.provinceForm.next(
      this.fb.group(
        new ProvinceForm(provinceEntity),
      ),
    );
  }
}
