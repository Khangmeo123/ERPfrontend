import { GoodsReceiptPOContent, GoodsReceiptPOEntity } from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GoodsReceiptPOForm } from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.form';
import { GoodsReceiptPOReceiveRepository } from './goods-receipt-po-receive.repository';
import {
  BatchBinLocationEntity,
  BinLocationEntity,
  QuantityEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import { GeneralService } from 'src/app/_services/general-service.service';
import { Injectable } from '@angular/core';

@Injectable()
export class GoodsReceiptPOReceiveService {

  public goodsReceiptPOForm: BehaviorSubject<FormGroup>;

  public quantity: BehaviorSubject<GoodsReceiptPOContent> = new BehaviorSubject<GoodsReceiptPOContent>(new GoodsReceiptPOContent());

  public serialNumber: BehaviorSubject<GoodsReceiptPOContent> = new BehaviorSubject<GoodsReceiptPOContent>(new GoodsReceiptPOContent());

  public batch: BehaviorSubject<GoodsReceiptPOContent> = new BehaviorSubject<GoodsReceiptPOContent>(new GoodsReceiptPOContent());

  constructor(
    private fb: FormBuilder,
    private goodsReceiptPORepository: GoodsReceiptPOReceiveRepository,
    private toastrService: ToastrService,
    private generalService: GeneralService,
  ) {
    this.goodsReceiptPOForm = new BehaviorSubject(this.fb.group(new GoodsReceiptPOForm()));
  }

  getDetail = (id: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.goodsReceiptPORepository.getDetail(id)
        .subscribe(
          (goodsReceiptPO: GoodsReceiptPOEntity) => {
            if (goodsReceiptPO) {
              const goodsReceiptPOForm = this.fb.group(
                new GoodsReceiptPOForm(goodsReceiptPO),
              );
              this.recalculateContents(goodsReceiptPOForm);
              resolve();
            }
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  };

  receive = (id: string): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      this.goodsReceiptPORepository.receive(id)
        .subscribe(
          (result: boolean) => {
            if (result) {
              this.toastrService.success('Cập nhật thành công !');
              resolve();
            }
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  };

  rejectReceive = (goodsReceiptPOId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReceiptPORepository.rejectReceive(goodsReceiptPOId)
        .subscribe(
          (result) => {
            if (result) {
              this.toastrService.success('Cập nhật thành công !');
              resolve();
            }
          },
          (error: Error) => {
            reject(error);
          },
        );
    });
  };

  recalculateContents = (goodsReceiptPOForm: FormGroup) => {
    // const currentArray = goodsReceiptPOForm.get('goodsReceiptPOContents') as FormArray;
    // let totalGoodsReceiptPOContents = 0;
    // for (const control of currentArray.controls) {
    //   if (control instanceof FormGroup) {
    //     const unitPrice = control.get('unitPrice').value;
    //     const taxRate = control.get('taxRate').value;
    //     const itemDiscountCost = control.get('itemDiscountCost').value;
    //     const quantity = control.get('quantity').value;
    //     const taxNumber = unitPrice * (taxRate / 100);
    //     const totalValue = Math.round((unitPrice + taxNumber - itemDiscountCost) * quantity);
    //     if (control.get('total')) {
    //       control.get('total').setValue(totalValue);
    //     } else {
    //       control.addControl('total', new FormControl(totalValue));
    //     }
    //     totalGoodsReceiptPOContents += totalValue;
    //   }
    // }
    // goodsReceiptPOForm.get('totalGoodsReceiptPOContents').setValue(totalGoodsReceiptPOContents);
    this.goodsReceiptPOForm.next(goodsReceiptPOForm);
  };

  // quantity:
  getQuantityDetail = (goodsReceiptPOContentId: string, enableBinLocation: boolean) => {
    this.goodsReceiptPORepository.getQuantityDetail(goodsReceiptPOContentId)
      .subscribe(
        (result) => {
          if (result) {
            if (result.goodsReceiptPOQuantityDetails[0].goodsReceiptPOQuantities.length === 0 && enableBinLocation) {
              const goodsReceiptPOQuantity = new QuantityEntity();
              result.goodsReceiptPOQuantityDetails[0].goodsReceiptPOQuantities.push(goodsReceiptPOQuantity);
            }
            this.quantity.next(result);
          }
        },
        (error) => {
          if (error) {
            console.log(error);
          }
        });
  };

  updateQuantityDetail = (quantityDetail: any): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReceiptPORepository.updateQuantityDetail(quantityDetail).subscribe((result) => {
        if (result) {
          this.toastrService.success('Hệ thống cập nhật thành công!');
          const currentForm = this.goodsReceiptPOForm.getValue();
          const currentArray = currentForm.get('goodsReceiptPOContents') as FormArray;
          for (const control of currentArray.controls) {
            if (control instanceof FormGroup) {
              if (control.get('id').value === quantityDetail.id) {
                control.get('actualReceive').setValue(quantityDetail.GoodsReceiptPOQuantityDetails[0].actualReceive);
              }
            }
          }
          resolve();
          this.goodsReceiptPOForm.next(currentForm);
        }
      }, (error) => {
        if (error) {
          this.quantity.next(error);
        }
        this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
      });
    });
  };

  addBinLocationQuantity = (goodsReceiptContentId: string) => {
    const binLocation = new QuantityEntity();
    const currentQuantityDetail = this.quantity.getValue();
    const currentBinLocationArray = currentQuantityDetail.goodsReceiptPOQuantityDetails[0].goodsReceiptPOQuantities;
    binLocation.goodsReceiptContentId = goodsReceiptContentId;
    binLocation.binLocationCode = null;
    currentBinLocationArray.push(binLocation);
    this.quantity.next(currentQuantityDetail);
  };

  deleteBinLocationQuantity = (index: number) => {
    const currentQuantityDetail = this.quantity.getValue();
    const currentBinLocationArray = currentQuantityDetail.goodsReceiptPOQuantityDetails[0].goodsReceiptPOQuantities;
    if (index > 0) {
      currentBinLocationArray.splice(index, 1);
    }
    this.recalculateQuantityDetail(currentQuantityDetail);
  };

  recalculateQuantityDetail = (goodsReceiptPOContent: GoodsReceiptPOContent) => {
    goodsReceiptPOContent.goodsReceiptPOQuantityDetails.forEach((item) => {
      item.actualReceive = 0;
      if (item.goodsReceiptPOQuantities.length > 0) {
        item.goodsReceiptPOQuantities.forEach((elm) => {
          item.actualReceive += elm.quantity;
        });
      }
    });
    this.quantity.next(goodsReceiptPOContent);
  };

  getSerialNumber = (goodsReceiptPOContentId: string) => {
    this.goodsReceiptPORepository.getSerialNumber(goodsReceiptPOContentId).subscribe((result) => {
      if (result) {
        this.serialNumber.next(result);
      }
    }, (error) => {
      if (error) {
        console.log(error);
      }
    });
  };

  updateSerialNumber = (goodsReceiptPOSerialNumberEntity: any) => {
    return new Promise((resolve, reject) => {
      this.goodsReceiptPORepository.updateSerialNumber(goodsReceiptPOSerialNumberEntity).subscribe((result) => {
        if (result) {
          this.toastrService.success('Hệ thống cập nhật thành công!');
          resolve();
        }
      }, (error) => {
        if (error) {
          this.serialNumber.next(error);
          this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
          reject();
        }
      });
    });
  };

  analyzeQRCode = (itemDetailId: string, qrCode: string) => {
    this.goodsReceiptPORepository.analyzeQRCode(itemDetailId, qrCode)
      .subscribe(
        (result) => {
          if (result) {
            const currentSerialNumber = this.serialNumber.getValue();
            const currentList = currentSerialNumber.goodsReceiptPOSerialNumbers;
            const filterItem = currentList.filter((item) => {
              return item.serialNumber === result.serialNumber;
            });
            if (filterItem.length > 0) {
              this.toastrService.error('Quét QR xảy ra lỗi, mã sản phẩm đã tồn tại!');
              this.generalService.alertSound();
            } else {
              this.toastrService.success('Hệ thống cập nhật thành công !');
              result.binLocationId = null;
              result.binLocationCode = null;
              currentList.push(result);
              this.serialNumber.next(currentSerialNumber);
            }
          }
        },
        (error) => {
          if (error) {
            this.toastrService.error('Quét QR xảy ra lỗi!');
            this.generalService.alertSound();
          }
        },
      );
  };

  changeLocationSerialNumber = (binLocationEntity: BinLocationEntity) => {
    const currentSerialNumber = this.serialNumber.getValue();
    const currentSerialNumberList = currentSerialNumber.goodsReceiptPOSerialNumbers;
    if (currentSerialNumberList) {
      currentSerialNumberList.forEach((item) => {
        if (item.isSelected) {
          item.binLocationId = binLocationEntity.id;
          item.binLocationCode = binLocationEntity.code;
          item.isSelected = false;
        }
      });
    }
    this.serialNumber.next(currentSerialNumber);
  };

  deleteSerialNumber = (index) => {
    const currentSerialNumber = this.serialNumber.getValue();
    const currentSerialNumberList = currentSerialNumber.goodsReceiptPOSerialNumbers;
    currentSerialNumberList.splice(index, 1);
    this.serialNumber.next(currentSerialNumber);
  };

  checkAllSerialNumber = (checked: boolean) => {
    const currentSerialNumber = this.serialNumber.getValue();
    const currentSerialNumberList = currentSerialNumber.goodsReceiptPOSerialNumbers;
    currentSerialNumberList.forEach((item) => {
      item.isSelected = checked;
    });
    this.serialNumber.next(currentSerialNumber);
  };

  deleteMultipleSerialNumber = () => {
    const indexArray = [];
    const currentSerialNumber = this.serialNumber.getValue();
    const currentSerialNumberList = currentSerialNumber.goodsReceiptPOSerialNumbers;
    currentSerialNumberList.forEach((item) => {
      if (item.isSelected) {
        indexArray.push(currentSerialNumberList.indexOf(item));
        item.isSelected = false;
      }
    });
    for (let i = indexArray.reverse().length - 1; i >= 0; i--) {
      currentSerialNumberList.splice(indexArray.reverse()[i], 1);
    }
    this.serialNumber.next(currentSerialNumber);
  };

  getBatch = (goodsReceiptPOContentId: string) => {
    return new Promise<void>((resolve, reject) => {
      this.goodsReceiptPORepository.getBatch(goodsReceiptPOContentId)
        .subscribe(
          (goodsReceiptPOContent: GoodsReceiptPOContent) => {
            if (goodsReceiptPOContent) {
              this.batch.next(goodsReceiptPOContent);
              resolve();
            }
          },
          (error: Error) => {
            reject(error);
          });
    });
  };

  updateBatch = (goodsReceiptPOBatchEntity: any) => {
    return new Promise((resolve, reject) => {
      this.goodsReceiptPORepository.updateBatch(goodsReceiptPOBatchEntity).subscribe((result) => {
        if (result) {
          this.toastrService.success('Hệ thống cập nhật thành công!');
          const currentForm = this.goodsReceiptPOForm.getValue();
          const currentArray = currentForm.get('goodsReceiptPOContents') as FormArray;
          for (const control of currentArray.controls) {
            if (control instanceof FormGroup) {
            }
          }
          resolve();
          this.goodsReceiptPOForm.next(currentForm);
        }
      }, (error) => {
        reject();
        this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
      });
    });
  };

  analyzeBatchCode = (itemDetailId: string, qrCode: string) => {
    this.goodsReceiptPORepository.analyzeBatchCode(itemDetailId, qrCode).subscribe((result) => {
      if (result) {
        const currentBatch = this.batch.getValue();
        const currentBatchList = currentBatch.goodsReceiptPOBatches;
        currentBatchList.push(result);
        this.batch.next(currentBatch);
      }
    }, (error) => {
      if (error) {
        this.toastrService.error('Quét QR xảy ra lỗi!');
      }
    });
  };

  changeLocationBatch = (binLocationEntity: BinLocationEntity) => {
    const currentBatch = this.batch.getValue();
    const currentBatchList = currentBatch.goodsReceiptPOBatches;
    if (currentBatchList) {
      currentBatchList.forEach((item) => {
        if (item.isSelected && item.goodsReceiptPOBatchBinLocations) {
          item.goodsReceiptPOBatchBinLocations.forEach((i) => {
            i.binLocationId = binLocationEntity.id;
            i.binLocationCode = binLocationEntity.code;
          });
        }
      });
    }
    this.batch.next(currentBatch);
  };

  addBinLocationBatch = (indexRow: number, goodsReceiptPOBatchId: string) => {
    const currentBatch = this.batch.getValue();
    const currentBatchList = currentBatch.goodsReceiptPOBatches;
    const currentBinLocationArray = currentBatchList[indexRow].goodsReceiptPOBatchBinLocations;
    const binLocation = new BatchBinLocationEntity();
    binLocation.goodsReceiptPOBatchId = goodsReceiptPOBatchId;
    currentBinLocationArray.push(binLocation);
    this.batch.next(currentBatch);
  };

  deleteBinLocationBatch = (indexRow: number, index: number) => {
    const currentBatch = this.batch.getValue();
    const currentBatchList = currentBatch.goodsReceiptPOBatches;
    const currentBinLocationArray = currentBatchList[indexRow].goodsReceiptPOBatchBinLocations;
    if (index > 0) {
      currentBinLocationArray.splice(index, 1);
    }
    this.batch.next(currentBatch);
  };

  checkAllBatch = (checked: boolean) => {
    const currentBatch = this.batch.getValue();
    const currentBatchList = currentBatch.goodsReceiptPOBatches;
    currentBatchList.forEach((item) => {
      item.isSelected = checked;
    });
    this.batch.next(currentBatch);
  };

  deleteMultipleBatch = () => {
    const indexArray = [];
    const currentBatch = this.batch.getValue();
    const currentBatchList = currentBatch.goodsReceiptPOBatches;
    currentBatchList.forEach((item) => {
      if (item.isSelected) {
        indexArray.push(currentBatchList.indexOf(item));
        item.isSelected = false;
      }
    });
    for (let i = indexArray.reverse().length - 1; i >= 0; i--) {
      currentBatchList.splice(indexArray.reverse()[i], 1);
    }
    this.batch.next(currentBatch);
  };
}
