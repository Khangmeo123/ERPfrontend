import { Entity } from 'src/app/_helpers/entity';

export class Return extends Entity {

  customerDetailId: string;
  customerContactId: string;
  customerContactFullName: string;
  customerCode: string;
  customerName: string;
  customerAddress: string;
  currencyId: string;
  currencyName: string;
  documentNumber: string;
  deliveryName: string;
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
  remarks: string;
  inventoryOrganizationId: string;
  inventoryOrganizationCode: string;
  inventoryOrganizationName: string;
  inventoryOrganizationStreet: string;
  step: number;
  generalDiscountRate: number;
  generalDiscountCost: number;
  returnContents: ReturnContent[];
  purchaseOrderIds: PurchaseOrderOfReturn[];
  purchaseOrderName: string;
  fileAttachments: FileAttachmentsOfReturn[];
  enableBinLocation: boolean;
  totalReturnContents: number;

  constructor(returnEntity?: any) {
    super(returnEntity);
  }
}

export class ReturnContent extends Entity {
  returnId: string;
  returnName: string;
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
  returnQuantityDetails: QuantityDetailOfReturn[];
  returnSerialNumbers: SerialNumberOfReturn[];
  returnBatches: BatchOfReturn[];

  constructor(returnContent?: any) {
    super(returnContent);
  }
}

export class PurchaseOrderOfReturn extends Entity {
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

export class FileAttachmentsOfReturn extends Entity {
  fileName: string;

  constructor(fileAttachments?: any) {
    super(fileAttachments);
  }
}

export class EmployeeDetailOfReturn extends Entity {
  code: string;
  name: string;
}

export class ReturnInventoryOrganizationOfReturn extends Entity {
  code: string;
  name: string;
  shortName: string;
}

export class SupplierOfReturn extends Entity {
  code: string;
  name: string;
  taxCode: string;
  status: string;
  note: string;
}

export class SupplierContactOfReturn extends Entity {
  name: string;
  address: string;
  supplierAddress: string;
}

export class TaxOfReturn extends Entity {
  code: string;
  name: string;
}

export class UnitOfMeasureOfReturn extends Entity {
  name: string;
  type: string;
  description: string;
  code: string;
}

export class ItemDetailOfReturn extends Entity {
  code: string;
  name: string;
}

export class QuantityDetailOfReturn extends Entity {
  itemCode: string;
  itemName: string;
  unitOfMeasureName: string;
  quantity: number;
  actualReceive: number;
  ReturnQuantities: QuantityOfReturn[];

  constructor(ReturnQuantityDetail?: any) {
    super(ReturnQuantityDetail);
  }
}

export class QuantityOfReturn extends Entity {
  goodsReceiptContentId: string = null;
  binLocationId: string = null;
  binLocationCode: string = null;
  quantity: number = null;

  constructor(returnQuantity?) {
    super(returnQuantity);
  }
}

export class BinLocationOfReturn extends Entity {
  code: string;
}

export class SerialNumberOfReturn extends Entity {
  ReturnContentId: string;
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

  constructor(returnSerialNumberEntity?) {
    super(returnSerialNumberEntity);
  }
}

export class BatchOfReturn extends Entity {
  ReturnContentId: string;
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
  returnBatchBinLocations: BatchBinLocationOfReturn[];
  actualReceive: number;

  constructor(returnBatchEntity?: any) {
    super(returnBatchEntity);
  }
}

export class BatchBinLocationOfReturn extends Entity {
  disabled: boolean;
  ReturnBatchId: string;
  binLocationId: string;
  binLocationCode: string;
  quantity: number;

  constructor(returnBatchBinLocationEntity?: any) {
    super(returnBatchBinLocationEntity);
  }
}


export class ReturnWorkflows extends Entity {
  returnId: string;
  disabled: boolean;
  actorId: string;
  actorName: string;
  time: string;
  statusId: string;
  statusName: string;
  step: number = 0;
  positionId: string;
  positionName: string;

  constructor(returnWorkflows?: any) {
    super(returnWorkflows);
  }
}


export class Deliveries extends Entity {
  name: string;
  documentNumber: number = 0;
  documentDate: string;
  ownerId: string;
  ownerName: string;
  salerId: string;
  salerName: string;

  constructor(deliverys?: any) {
    super(deliverys);
  }
}
