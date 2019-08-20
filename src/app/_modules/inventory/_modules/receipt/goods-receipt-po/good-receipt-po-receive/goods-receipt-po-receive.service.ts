import {GoodsReceiptPOContent} from '../../../../_backend/goods-receipt-po/goods-receipt-po.entity';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GoodsReceiptPOForm} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.form';
import {Entities} from 'src/app/_helpers/entity';
import {
  GoodsReceiptPOBinlocationSearchEntity,
  ItemDetailSearchEntity,
  UnitOfMeasureSearchEntity,
  PurchaseOrderSearchEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.searchentity';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {GoodsReceiptPOReceiveRepository} from './goods-receipt-po-receive.repository';
import {
  BatchBinLocationEntity,
  BinLocationEntity,
  QuantityEntity,
} from 'src/app/_modules/inventory/_backend/goods-receipt-po/goods-receipt-po.entity';
import {GeneralService} from 'src/app/_services/general-service.service';

@Injectable()
export class GoodsReceiptPOReceiveService {
  public goodsReceiptPOForm: BehaviorSubject<FormGroup>;
  public itemList: BehaviorSubject<Entities>;
  public unitOfMeasureList: BehaviorSubject<Entities>;
  public documentNumberList: BehaviorSubject<Entities>;
  public binLocationList: BehaviorSubject<Entities>;
  public quantityDetail: BehaviorSubject<GoodsReceiptPOContent>;
  public serialNumber: BehaviorSubject<GoodsReceiptPOContent>;
  public batch: BehaviorSubject<GoodsReceiptPOContent>;

  constructor(
    private fb: FormBuilder,
    private goodsReceiptPORepository: GoodsReceiptPOReceiveRepository,
    private toastrService: ToastrService,
    private generalService: GeneralService,
  ) {
    this.goodsReceiptPOForm = new BehaviorSubject(this.fb.group(new GoodsReceiptPOForm()));
    this.itemList = new BehaviorSubject(new Entities());
    this.unitOfMeasureList = new BehaviorSubject(new Entities());
    this.documentNumberList = new BehaviorSubject(new Entities());
    this.binLocationList = new BehaviorSubject(new Entities());
    this.quantityDetail = new BehaviorSubject(new GoodsReceiptPOContent());
    this.serialNumber = new BehaviorSubject(new GoodsReceiptPOContent());
    this.batch = new BehaviorSubject(new GoodsReceiptPOContent());
  }

  // general:
  getDetail = (goodsReceiptPOId?): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      if (goodsReceiptPOId !== null && goodsReceiptPOId !== undefined) {
        this.goodsReceiptPORepository.getDetail(goodsReceiptPOId)
          .subscribe(
            res => {
              if (res) {
                const goodsReceiptPOForm = this.fb.group(
                  new GoodsReceiptPOForm(res),
                );
                this.recalculateContents(goodsReceiptPOForm);
                resolve();
              }
            }, err => {
              if (err) {
                console.log(err);
                reject();
              }
            });
      }
    });
  };

  receive = (goodsReceiptPOId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReceiptPORepository.receive(goodsReceiptPOId).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
          resolve();
        }
      }, err => {
        if (err) {
          reject();
          console.log(err);
        }
      });
    });
  };

  rejectReceive = (goodsReceiptPOId: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReceiptPORepository.rejectReceive(goodsReceiptPOId).subscribe(res => {
        if (res) {
          this.toastrService.success('Cập nhật thành công !');
          resolve();
        }
      }, err => {
        if (err) {
          reject();
          console.log(err);
        }
      });
    });
  };

  recalculateContents = (goodsReceiptPOForm: FormGroup) => {
    const currentArray = goodsReceiptPOForm.get('goodsReceiptPOContents') as FormArray;
    let totalGoodsReceiptPOContents = 0;
    for (const control of currentArray.controls) {
      if (control instanceof FormGroup) {
        const unitPrice = control.get('unitPrice').value;
        const taxRate = control.get('taxRate').value;
        const generalDiscountCost = control.get('generalDiscountCost').value;
        const quantity = control.get('quantity').value;
        const taxNumber = unitPrice * (taxRate / 100);
        const totalValue = Math.round((unitPrice + taxNumber - generalDiscountCost) * quantity);
        if (control.get('total')) {
          control.get('total').setValue(totalValue);
        } else {
          control.addControl('total', new FormControl(totalValue));
        }
        totalGoodsReceiptPOContents += totalValue;
      }
    }
    goodsReceiptPOForm.get('totalGoodsReceiptPOContents').setValue(totalGoodsReceiptPOContents);
    this.goodsReceiptPOForm.next(goodsReceiptPOForm);
  };

  // quantityDetail:
  getQuantityDetail = (goodsReceiptPOContentId: string, enableBinLocation: boolean) => {
    this.goodsReceiptPORepository.getQuantityDetail(goodsReceiptPOContentId).subscribe(res => {
      if (res) {
        if (res.goodsReceiptPOQuantityDetails[0].goodsReceiptPOQuantities.length === 0 && enableBinLocation) {
          const goodsReceiptPOQuantity = new QuantityEntity();
          res.goodsReceiptPOQuantityDetails[0].goodsReceiptPOQuantities.push(goodsReceiptPOQuantity);
        }
        this.quantityDetail.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  };

  updateQuantityDetail = (quantityDetail: any): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      this.goodsReceiptPORepository.updateQuantityDetail(quantityDetail).subscribe(res => {
        if (res) {
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
      }, err => {
        if (err) {
          this.quantityDetail.next(err);
        }
        this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
      });
    });
  };

  addBinLocationQuantity = (goodsReceiptContentId: string) => {
    const binLocation = new QuantityEntity();
    const currentQuantityDetail = this.quantityDetail.getValue();
    const currentBinLocationArray = currentQuantityDetail.goodsReceiptPOQuantityDetails[0].goodsReceiptPOQuantities;
    binLocation.goodsReceiptContentId = goodsReceiptContentId;
    binLocation.binLocationCode = null;
    currentBinLocationArray.push(binLocation);
    this.quantityDetail.next(currentQuantityDetail);
  };

  deleteBinLocationQuantity = (index: number) => {
    const currentQuantityDetail = this.quantityDetail.getValue();
    const currentBinLocationArray = currentQuantityDetail.goodsReceiptPOQuantityDetails[0].goodsReceiptPOQuantities;
    if (index > 0) {
      currentBinLocationArray.splice(index, 1);
    }
    this.recalculateQuantityDetail(currentQuantityDetail);
  };

  recalculateQuantityDetail = (goodsReceiptPOContent: GoodsReceiptPOContent) => {
    goodsReceiptPOContent.goodsReceiptPOQuantityDetails.forEach(item => {
      item.actualReceive = 0;
      if (item.goodsReceiptPOQuantities.length > 0) {
        item.goodsReceiptPOQuantities.forEach(elm => {
          item.actualReceive += elm.quantity;
        });
      }
    });
    this.quantityDetail.next(goodsReceiptPOContent);
  };

  // serialNumber:
  getSerialNumber = (goodsReceiptPOContentId: string) => {
    this.goodsReceiptPORepository.getSerialNumber(goodsReceiptPOContentId).subscribe(res => {
      if (res) {
        this.serialNumber.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  };

  updateSerialNumber = (goodsReceiptPOSerialNumberEntity: any) => {
    return new Promise((resolve, reject) => {
      this.goodsReceiptPORepository.updateSerialNumber(goodsReceiptPOSerialNumberEntity).subscribe(res => {
        if (res) {
          this.toastrService.success('Hệ thống cập nhật thành công!');
          resolve();
        }
      }, err => {
        if (err) {
          this.serialNumber.next(err);
          this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
          reject();
        }
      });
    });
  };

  analyzeQRCode = (itemDetailId: string, qrCode: string) => {
    this.goodsReceiptPORepository.analyzeQRCode(itemDetailId, qrCode).subscribe(res => {
      if (res) {
        const currentSerialNumber = this.serialNumber.getValue();
        const currentList = currentSerialNumber.goodsReceiptPOSerialNumbers;
        const filterItem = currentList.filter(item => {
          return item.serialNumber === res.serialNumber;
        });
        if (filterItem.length > 0) {
          this.toastrService.error('Quét QR xảy ra lỗi, mã sản phẩm đã tồn tại!');
          this.generalService.alertSound();
        } else {
          this.toastrService.success('Hệ thống cập nhật thành công !');
          res.binLocationId = null;
          res.binLocationCode = null;
          currentList.push(res);
          this.serialNumber.next(currentSerialNumber);
        }
      }
    }, err => {
      if (err) {
        this.toastrService.error('Quét QR xảy ra lỗi!');
        this.generalService.alertSound();
      }
    });
  };

  changeLocationSerialNumber = (goodsReceiptPOBinlocationEntity: BinLocationEntity) => {
    const currentSerialNumber = this.serialNumber.getValue();
    const currentSerialNumberList = currentSerialNumber.goodsReceiptPOSerialNumbers;
    if (currentSerialNumberList) {
      currentSerialNumberList.forEach(item => {
        if (item.isSelected) {
          item.binLocationId = goodsReceiptPOBinlocationEntity.id;
          item.binLocationCode = goodsReceiptPOBinlocationEntity.code;
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
    currentSerialNumberList.forEach(item => {
      item.isSelected = checked;
    });
    this.serialNumber.next(currentSerialNumber);
  };

  deleteMultipleSerialNumber = () => {
    const indexArray = [];
    const currentSerialNumber = this.serialNumber.getValue();
    const currentSerialNumberList = currentSerialNumber.goodsReceiptPOSerialNumbers;
    currentSerialNumberList.forEach(item => {
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

  // batch:
  getBatch = (goodsReceiptPOContentId: string) => {
    this.goodsReceiptPORepository.getBatch(goodsReceiptPOContentId).subscribe(res => {
      if (res) {
        this.batch.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  };

  updateBatch = (goodsReceiptPOBatchEntity: any) => {
    return new Promise((resolve, reject) => {
      this.goodsReceiptPORepository.updateBatch(goodsReceiptPOBatchEntity).subscribe(res => {
        if (res) {
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
      }, err => {
        reject();
        this.toastrService.error('Có lỗi xảy ra trong quá trình cập nhật!');
      });
    });
  };

  analyzeBatchCode = (itemDetailId: string, qrCode: string) => {
    this.goodsReceiptPORepository.analyzeBatchCode(itemDetailId, qrCode).subscribe(res => {
      if (res) {
        const currentBatch = this.batch.getValue();
        const currentBatchList = currentBatch.goodsReceiptPOBatches;
        currentBatchList.push(res);
        this.batch.next(currentBatch);
      }
    }, err => {
      if (err) {
        this.toastrService.error('Quét QR xảy ra lỗi!');
      }
    });
  };

  changeLocationBatch = (goodsReceiptPOBinlocationEntity: BinLocationEntity) => {
    const currentBatch = this.batch.getValue();
    const currentBatchList = currentBatch.goodsReceiptPOBatches;
    if (currentBatchList) {
      currentBatchList.forEach(item => {
        if (item.isSelected && item.goodsReceiptPOBatchBinLocations) {
          item.goodsReceiptPOBatchBinLocations.forEach(i => {
            i.binLocationId = goodsReceiptPOBinlocationEntity.id;
            i.binLocationCode = goodsReceiptPOBinlocationEntity.code;
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
    currentBatchList.forEach(item => {
      item.isSelected = checked;
    });
    this.batch.next(currentBatch);
  };

  deleteMultipleBatch = () => {
    const indexArray = [];
    const currentBatch = this.batch.getValue();
    const currentBatchList = currentBatch.goodsReceiptPOBatches;
    currentBatchList.forEach(item => {
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

  // item:
  dropListItem = (goodsReceiptPOItemDetailSearchEntity: ItemDetailSearchEntity) => {
    this.goodsReceiptPORepository.dropListItem(goodsReceiptPOItemDetailSearchEntity).subscribe(res => {
      if (res) {
        this.itemList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  };

  typingSearchItem = (goodsReceiptPOItemDetailSearchEntity: Observable<ItemDetailSearchEntity>) => {
    goodsReceiptPOItemDetailSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.goodsReceiptPORepository.dropListItem(searchEntity);
      })).subscribe(res => {
      if (res) {
        this.itemList.next(res);
      }
    });
  };

  // unitOfMeasure:
  dropListUnitOfMeasure = (goodsReceiptPOUnitOfMeasureSearchEntity: UnitOfMeasureSearchEntity) => {
    this.goodsReceiptPORepository.dropListUnitOfMeasure(goodsReceiptPOUnitOfMeasureSearchEntity).subscribe(res => {
      if (res) {
        this.unitOfMeasureList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  };

  typingSearchUnitOfMeasure = (goodsReceiptPOUnitOfMeasureSearchEntity: Observable<UnitOfMeasureSearchEntity>) => {
    goodsReceiptPOUnitOfMeasureSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.goodsReceiptPORepository.dropListUnitOfMeasure(searchEntity);
      })).subscribe(res => {
      if (res) {
        this.unitOfMeasureList.next(res);
      }
    });
  };

  // documentNumber:
  dropListDocumentNumber = (purchaseOrdersSearchEntity: PurchaseOrderSearchEntity) => {
    this.goodsReceiptPORepository.dropListDocumentNumber(purchaseOrdersSearchEntity).subscribe(res => {
      if (res) {
        this.documentNumberList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  };

  typingSearchDocumentNumber = (purchaseOrdersSearchEntity: Observable<PurchaseOrderSearchEntity>) => {
    purchaseOrdersSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.goodsReceiptPORepository.dropListDocumentNumber(searchEntity);
      })).subscribe(res => {
      if (res) {
        this.documentNumberList.next(res);
      }
    });
  };

  // dropListBinLocation:
  dropListBinLocation = (goodsReceiptPOBinlocationSearchEntity: GoodsReceiptPOBinlocationSearchEntity) => {
    this.goodsReceiptPORepository.dropListBinLocation(goodsReceiptPOBinlocationSearchEntity).subscribe(res => {
      if (res) {
        this.binLocationList.next(res);
      }
    }, err => {
      if (err) {
        console.log(err);
      }
    });
  };

  typingSearchBinLocation = (goodsReceiptPOBinlocationSearchEntity: Observable<GoodsReceiptPOBinlocationSearchEntity>) => {
    goodsReceiptPOBinlocationSearchEntity.pipe(debounceTime(400),
      distinctUntilChanged(),
      switchMap(searchEntity => {
        return this.goodsReceiptPORepository.dropListBinLocation(searchEntity);
      })).subscribe(res => {
      if (res) {
        this.binLocationList.next(res);
      }
    });
  };
}
