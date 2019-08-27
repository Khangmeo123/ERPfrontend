import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';

export class GoodsReceiptSearch extends SearchEntity {
  supplierDetailId: string;
  supplierContactId: string;
  currencyId: string;
  inventoryOrganizationId: string = null;
  documentNumber: NumberFilter = new NumberFilter();
  documentReferenceId: string;
  statusId: string = null;
  statusDisplay: string = null;
  postingDate: DateFilter = new DateFilter();
  dueDate: DateFilter = new DateFilter();
  documentDate: DateFilter = new DateFilter();
  buyerId: string;
  ownerId: string;
  requesterId: string = null;
  remarks = new TextFilter();
  generalDiscountRate: NumberFilter = new NumberFilter();

  constructor(goodsReceiptPOSearchEntity?: any) {
    super(goodsReceiptPOSearchEntity);
  }
}

export class GoodsReceiptContentSearch extends SearchEntity {
  qrCode: string = null;
  itemDetailId: string = null;
  itemName: string = null;
  serialNumber: string = null;
  mfrDate: string = null;
  expirationDate: string = null;
  purchaseOrderId: string = null;
  unitOfMeasureId: string = null;
  taxId: string = null;
}

export class PurchaseOrderOfGoodsReceiptSearch extends SearchEntity {
  supplierDetailId: string;
  documentNumber = new NumberFilter();
  documentDate = new DateFilter();
  ownerId: string = null;
  buyerId: string = null;

  constructor() {
    super();
  }
}

export class EmployeeDetailOfGoodsReceiptSearch extends SearchEntity {
  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();

  constructor() {
    super();
  }
}

export class InventoryOrganizationOfGoodsReceiptSearch extends SearchEntity {
  legalEntityId: string;
  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();
  shortName: TextFilter = new TextFilter();

  constructor() {
    super();
  }
}

export class SupplierDetailOfGoodsReceiptSearch extends SearchEntity {
  code = new TextFilter();
  name = new TextFilter();

  constructor() {
    super();
  }
}

export class SupplierContactOfGoodsReceiptSearch extends SearchEntity {
  supplierAddress = new TextFilter();
  name = new TextFilter();
  supplierDetailId: string;

  constructor(supplierAddressSearchEntity?) {
    super(supplierAddressSearchEntity);
  }
}

export class TaxOfGoodsReceiptSearch extends SearchEntity {
  code = new TextFilter();
  name = new TextFilter();
}

export class UnitOfMeasureOfGoodsReceiptSearch extends SearchEntity {
  name = new TextFilter();
  type = new TextFilter();
  description = new TextFilter();
  code = new TextFilter();
}

export class ItemDetailOfGoodsReceiptSearch extends SearchEntity {
  code = new TextFilter();
  name = new TextFilter();
}

export class BinLocationOfGoodsReceiptSearch extends SearchEntity {
  goodsReceiptContentId: string;
  inventoryOrganizationId: string;
  code = new TextFilter();

  constructor(binLocationOfGoodsReceiptSearch?) {
    super();
    if (binLocationOfGoodsReceiptSearch) {
      this.goodsReceiptContentId = binLocationOfGoodsReceiptSearch.goodsReceiptContentId !== undefined
        && binLocationOfGoodsReceiptSearch.goodsReceiptContentId !== null ? binLocationOfGoodsReceiptSearch.goodsReceiptContentId : null;
      this.inventoryOrganizationId = binLocationOfGoodsReceiptSearch.inventoryOrganizationId !== undefined
        && binLocationOfGoodsReceiptSearch.inventoryOrganizationId !== null ? binLocationOfGoodsReceiptSearch.inventoryOrganizationId : null;
    }
  }
}

