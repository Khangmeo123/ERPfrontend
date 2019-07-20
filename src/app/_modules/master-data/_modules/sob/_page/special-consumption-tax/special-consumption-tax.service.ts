// import { BehaviorSubject, forkJoin } from 'rxjs';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { ToastrService } from 'ngx-toastr';
//
// export class SpecialConsumptionTaxService {
//   public specialConsumptionTaxList: BehaviorSubject<SpecialConsumptionTaxEntity[]>;
//   public specialConsumptionTaxCount: BehaviorSubject<number>;
//   public specialConsumptionTaxForm: BehaviorSubject<FormGroup>;
//
//   constructor(private fb: FormBuilder, private specialConsumptionTaxRepository: SpecialConsumptionTaxRepository, private toastrService: ToastrService) {
//     this.specialConsumptionTaxCount = new BehaviorSubject(0);
//     this.specialConsumptionTaxList = new BehaviorSubject([]);
//     this.specialConsumptionTaxForm = new BehaviorSubject(this.fb.group(
//       new SpecialConsumptionTaxForm(),
//     ));
//   }
//
//   getList(specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity) {
//     forkJoin(this.specialConsumptionTaxRepository.getList(specialConsumptionTaxSearchEntity),
//       this.specialConsumptionTaxRepository.count(specialConsumptionTaxSearchEntity)).subscribe(([list, count]) => {
//       if (list) {
//         this.specialConsumptionTaxList.next(list);
//       }
//       if (count) {
//         this.specialConsumptionTaxCount.next(count);
//       }
//     });
//   }
//
//   add() {
//     this.specialConsumptionTaxForm.next(this.fb.group(
//       new SpecialConsumptionTaxForm(),
//     ));
//   }
//
//   edit(specialConsumptionTaxId: string) {
//     this.specialConsumptionTaxRepository.getId(specialConsumptionTaxId).subscribe(res => {
//       if (res) {
//         this.specialConsumptionTaxForm.next(this.fb.group(
//           new SpecialConsumptionTaxForm(res),
//         ));
//       }
//     }, err => {
//       if (err) {
//         console.log(err);
//       }
//     });
//   }
//
//   save(specialConsumptionTaxEntity: any, specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity): Promise<boolean> {
//     const defered = new Promise<boolean>((resolve, reject) => {
//       if (specialConsumptionTaxEntity.id === null || specialConsumptionTaxEntity.id === undefined) {
//         this.specialConsumptionTaxRepository.add(specialConsumptionTaxEntity).subscribe(res => {
//           if (res) {
//             this.getList(specialConsumptionTaxSearchEntity);
//             this.toastrService.success('Cập nhật thành công !');
//             resolve(false);
//           }
//         }, err => {
//           if (err) {
//             this.specialConsumptionTaxForm.next(this.fb.group(
//               new SpecialConsumptionTaxForm(err),
//             ));
//             reject(true);
//           }
//         });
//       } else {
//         this.specialConsumptionTaxRepository.update(specialConsumptionTaxEntity).subscribe(res => {
//           if (res) {
//             this.getList(specialConsumptionTaxSearchEntity);
//             this.toastrService.success('Cập nhật thành công !');
//             resolve(false);
//           }
//         }, err => {
//           if (err) {
//             this.specialConsumptionTaxForm.next(this.fb.group(
//               new SpecialConsumptionTaxForm(err),
//             ));
//             reject(true);
//           }
//         });
//       }
//     });
//     return defered;
//   }
//
//   delete(specialConsumptionTaxEntity: any, specialConsumptionTaxSearchEntity: SpecialConsumptionTaxSearchentity): Promise<boolean> {
//     const defered = new Promise<boolean>((resolve, reject) => {
//       this.specialConsumptionTaxRepository.delete(specialConsumptionTaxEntity).subscribe(res => {
//         if (res) {
//           this.getList(specialConsumptionTaxSearchEntity);
//           this.toastrService.success('Cập nhật thành công !');
//           resolve(false);
//         }
//       }, err => {
//         if (err) {
//           this.specialConsumptionTaxForm.next(this.fb.group(
//             new SpecialConsumptionTaxForm(err),
//           ));
//           reject(true);
//         }
//       });
//     });
//     return defered;
//   }
// }
