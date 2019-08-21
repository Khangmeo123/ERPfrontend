import { FormControl, FormGroup } from '@angular/forms';

export class FormModel {
  id = new FormControl();
  isDeleted = new FormControl(false);
  isEdited = new FormControl();

  constructor() {
  }

  mapData(entity?: any) {
    if (entity !== null && entity !== undefined) {
      Object.keys(entity)
        .forEach((item) => {
        if (entity.hasOwnProperty(item) && this.hasOwnProperty(item)) {
          if (entity[item] && typeof entity[item] === 'object' && entity[item].constructor === Array) {
            // this.recursiveMap(entity[item], this[item]);
            entity[item]
              .forEach(elm => {
              if (typeof elm === 'object' && elm.constructor === Object) {
                const formGroup = new FormGroup({});
                Object.keys(elm)
                  .forEach(result => {
                  if (result === 'errors' && elm[result] !== null) {
                    const errorForm = new FormGroup({});
                    Object.keys(elm[result]).forEach(i => {
                      errorForm.addControl(i, new FormControl(elm[result][i]));
                    });
                    formGroup.addControl(result, errorForm);
                  } else {
                    formGroup.addControl(result, new FormControl(elm[result]));
                  }
                });
                this[item].push(formGroup);
              } else {
                this[item].push(new FormControl(elm));
              }
            });
          } else {
            this[item].patchValue(entity[item]);
          }
        }
      });
    }
  }

  // recursiveMap(dataArray: any[], insertArray: any[]) {
  //     dataArray.forEach(item => {
  //         if (item && typeof item === 'object' && item.constructor === Array) {
  //             this.recursiveMap(item, insertArray[item]);
  //         } else {
  //             const formGroup = new FormGroup({});
  //             Object.keys(item).forEach(result => {
  //                 if (result === 'errors') {
  //                     const errorForm = new FormGroup({});
  //                     Object.keys(item[result]).forEach(i => {
  //                         errorForm.addControl(i, new FormControl(item[result][i]));
  //                     });
  //                     formGroup.addControl(result, errorForm);
  //                 } else {
  //                     formGroup.addControl(result, new FormControl(''));
  //                 }
  //             });
  //             insertArray.push(formGroup);
  //         }
  //     });
  // }
}
