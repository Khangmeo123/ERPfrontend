import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GeneralService } from '../../../../../../_helpers/general-service.service';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Entities } from '../../../../../../_helpers/entity';
import { LegalEntity } from '../../../../_backend/legal/legal.entity';
import { DivisionEntity } from '../../../../_backend/division/divisionl.entity';
import { HrOrganizationEntity } from '../../../../_backend/hr-organization/hr-organization.entity';
import { HrOrganizationRepository } from './hr-organization.repository';
import { HrOrganizationForm } from '../../../../_backend/hr-organization/hr-organization.form';
import { HrOrganizationSearchEntity } from '../../../../_backend/hr-organization/hr-organization.search-entity';

@Injectable({
  providedIn: 'root',
})
export class HrOrganizationService extends GeneralService {

  public hrOrganizationList: BehaviorSubject<HrOrganizationEntity[]> = new BehaviorSubject<HrOrganizationEntity[]>([]);

  public hrOrganizationCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  public hrOrganizationForm: BehaviorSubject<FormGroup>;

  public legalEntityList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  /**
   * Current legal entity
   */
  public selectedLegalEntity: BehaviorSubject<LegalEntity> = new BehaviorSubject<LegalEntity>(null);

  public divisionList: BehaviorSubject<Entities> = new BehaviorSubject<Entities>(new Entities());

  /**
   * Current division
   */
  public selectedDivision: BehaviorSubject<DivisionEntity> = new BehaviorSubject<DivisionEntity>(null);

  constructor(private fb: FormBuilder, private hrOrganizationRepository: HrOrganizationRepository, private toastrService: ToastrService) {
    super();
    this.hrOrganizationForm = new BehaviorSubject<FormGroup>(
      this.fb.group(
        new HrOrganizationForm(),
      ),
    );
  }

  getList(hrOrganizationSearchEntity: HrOrganizationSearchEntity): void {
    forkJoin(
      this.hrOrganizationRepository.getList(hrOrganizationSearchEntity),
      this.hrOrganizationRepository.count(hrOrganizationSearchEntity),
    )
      .subscribe(([list, count]) => {
        if (list) {
          this.hrOrganizationList.next(list);
        }
        if (count) {
          this.hrOrganizationCount.next(count);
        }
      });
  }

  /**
   * Handle error for data retrieving
   *
   * @param error Error
   * @return void
   */
  handleError(error: Error) {
    this.toastrService.error(error.message);
    return error;
  }

  /**
   * Select division for all tabs
   *
   * @param division DivisionEntity
   * @return void
   */
  selectDivision(division: DivisionEntity) {
    this.selectedDivision.next(division);
  }

  /**
   * Select legal entity for all tabs
   *
   * @param legalEntity LegalEntity
   * @return void
   */
  selectLegalEntity(legalEntity: LegalEntity) {
    this.selectedLegalEntity.next(legalEntity);
  }

  /**
   * Cancel a hrOrganization form, create a new one
   *
   * @return void
   */
  cancel() {
    this.hrOrganizationForm.next(
      this.fb.group(
        this.newHrOrganizationForm(),
      ),
    );
  }

  /**
   * Click a new form for adding hrOrganization
   *
   * @return void
   */
  add() {
    this.hrOrganizationForm.next(
      this.fb.group(
        this.newHrOrganizationForm(),
      ),
    );
  }

  /**
   * Create new hrOrganization
   *
   * @param hrOrganizationEntity HrOrganizationEntity
   * @param hrOrganizationSearchEntity HrOrganizationSearchEntity
   * @return Observable<HrOrganizationEntity>
   */
  create(hrOrganizationEntity: HrOrganizationEntity, hrOrganizationSearchEntity: HrOrganizationSearchEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.hrOrganizationRepository.create(hrOrganizationEntity)
        .subscribe(
          () => {
            this.getList(hrOrganizationSearchEntity);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  /**
   * Update an existing hrOrganization
   *
   * @param hrOrganizationEntity HrOrganizationEntity
   * @param hrOrganizationSearchEntity HrOrganizationSearchEntity
   * @return Observable<HrOrganizationEntity>
   */
  update(hrOrganizationEntity: HrOrganizationEntity, hrOrganizationSearchEntity: HrOrganizationSearchEntity): Promise<void> {
    return new Promise((resolve, reject) => {
      this.hrOrganizationRepository.update(hrOrganizationEntity)
        .subscribe(
          () => {
            this.getList(hrOrganizationSearchEntity);
            resolve();
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  }

  /**
   * Create new hrOrganization form
   *
   * @return HrOrganizationForm
   */
  newHrOrganizationForm(): HrOrganizationForm {
    const hrOrganizationForm: HrOrganizationForm = new HrOrganizationForm();
    const legalEntity: LegalEntity = this.selectedLegalEntity.value;
    const division: DivisionEntity = this.selectedDivision.value;
    if (legalEntity) {
      hrOrganizationForm.legalEntityId.setValue(legalEntity.id);
    }
    if (division) {
      hrOrganizationForm.divisionId.setValue(division.id);
    }
    return hrOrganizationForm;
  }
}
