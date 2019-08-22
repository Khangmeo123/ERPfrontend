import { Entity } from 'src/app/_helpers/entity';

export class GoodsReceipt extends Entity {

  supplierDetailId: string;
  supplierContactId: string;
  supplierCode: string;
  supplierName: string;
  supplierAddress: string;
  currencyId: string;
  currencyName: string;
  documentNumber: string;
  statusId: string;
  statusName: string;
  postingDate: string;
  dueDate: string;
  documentDate: string;
  buyerId: string;
  buyerName: string;
  ownerId: string;
  ownerName: string;
  requesterId: string;
  requesterName: string;
  remarks: string;
  inventoryOrganizationId: string;
  inventoryOrganizationCode: string;
  inventoryOrganizationName: string;
  inventoryOrganizationStreet: string;
  step: number;
  generalDiscountRate: number;
  generalDiscountCost: number;
  goodsReceiptContents: GoodsReceiptContent[];
  purchaseOrderIds: PurchaseOrderOfGoodsReceipt[];
  purchaseOrderName: string;
  fileAttachments: FileAttachments[];
  enableBinLocation: boolean;
  totalGoodsReceiptPOContents: number;

  constructor(goodsReceiptEntity?: any) {
    super(goodsReceiptEntity);
  }
}

export class GoodsReceiptContent extends Entity {
  goodsReceiptId: string;
  goodsReceiptName: string;
  itemDetailId: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  unitPrice: number;
  itemDiscountRate: number;
  itemDiscountCost: number;
  generalDiscountRate: number;
  generalDiscountCost: number;
  taxId: string;
  taxName: string;
  taxCost: number;
  unitOfMeasureId: string;
  unitOfMeasureName: string;
  unitOfMeasureCode: string;
  actualReceive: number;
  goodsReceiptQuantityDetails: QuantityDetailOfGoodsReceipt[];
  goodsReceiptSerialNumbers: SerialNumberOfGoodsReceipt[];
  goodsReceiptBatches: BatchOfGoodsReceipt[];

  constructor(goodsReceiptContent?: any) {
    super(goodsReceiptContent);
  }
}

export class PurchaseOrderOfGoodsReceipt extends Entity {
  id: string;

  name: string;
  documentNumber: string;
  documentDate: string;
  ownerName: string;
  buyerName: string;
  isSelected: boolean;

  constructor(purchaseOrders?: any) {
    super(purchaseOrders);
  }
}

export class FileAttachments extends Entity {
  fileName: string;

  constructor(fileAttachments?: any) {
    super(fileAttachments);
  }
}

export class EmployeeDetailOfGoodsReceipt extends Entity {
  code: string;
  name: string;
}

export class InventoryOrganizationOfGoodsReceipt extends Entity {
  code: string;
  name: string;
  shortName: string;
  street: string;
}

export class SupplierDetailOfGoodsReceipt extends Entity {
  code: string;
  name: string;
  taxCode: string;
  status: string;
  note: string;
}

export class SupplierContactOfGoodsReceipt extends Entity {
  name: string;
  address: string;
  supplierAddress: string;
}

export class TaxOfGoodsReceipt extends Entity {
  code: string;
  name: string;
}

export class UnitOfMeasureOfGoodsReceipt extends Entity {
  name: string;
  type: string;
  description: string;
  code: string;
}

export class ItemDetailOfGoodsReceipt extends Entity {
  code: string;
  name: string;
}

export class QuantityDetailOfGoodsReceipt extends Entity {
  itemCode: string;
  itemName: string;
  unitOfMeasureName: string;
  quantity: number;
  actualReceive: number;
  goodsReceiptQuantities: QuantityOfGoodsReceipt[];

  constructor(quantityDetailOfGoodsReceipt?: any) {
    super(quantityDetailOfGoodsReceipt);
  }
}

export class QuantityOfGoodsReceipt extends Entity {
  goodsReceiptContentId: string = null;
  binLocationId: string = null;
  binLocationCode: string = null;
  quantity: number = null;

  constructor(quantityOfGoodsReceipt?) {
    super(quantityOfGoodsReceipt);
  }
}

export class BinLocationOfGoodsReceipt extends Entity {
  code: string;
}

export class SerialNumberOfGoodsReceipt extends Entity {
  goodsReceiptContentId: string;
  itemName: string;
  itemCode: string;
  mfrSerialNumber: string;
  serialNumber: string;
  lotNumber: string;
  quantity: number;
  binLocationId: string;
  binLocationCode: string;
  expirationDate: string;
  mfrDate: string;
  admissionDate: string;
  mfrWarrantyStart: string;
  mfrWarrantyEnd: string;
  location: string;
  details: string;
  qrCode: string;

  constructor(serialNumberOfGoodsReceipt?) {
    super(serialNumberOfGoodsReceipt);
  }
}

export class BatchOfGoodsReceipt extends Entity {
  goodsReceiptContentId: string;
  itemName: string;
  itemCode: string;
  batchNumber: number;
  quantity: number;
  binLocationId: string;
  expirationDate: string;
  mfrDate: string;
  location: string;
  details: string;
  unitCost: number;
  goodsReceiptBatchBinLocations: BatchBinLocationOfGoodsReceipt[];
  actualReceive: number;

  constructor(batchOfGoodsReceipt?: any) {
    super(batchOfGoodsReceipt);
  }
}

export class BatchBinLocationOfGoodsReceipt extends Entity {
  disabled: boolean;
  goodsReceiptBatchId: string;
  binLocationId: string;
  binLocationCode: string;
  quantity: number;

  constructor(batchBinLocationOfGoodsReceipt?: any) {
    super(batchBinLocationOfGoodsReceipt);
  }
}
