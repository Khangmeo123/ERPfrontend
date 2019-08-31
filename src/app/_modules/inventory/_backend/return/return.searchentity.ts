import { TextFilter } from 'src/app/_shared/models/filters/TextFilter';
import { SearchEntity } from 'src/app/_helpers/search-entity';
import { NumberFilter } from 'src/app/_shared/models/filters/NumberFilter';
import { DateFilter } from 'src/app/_shared/models/filters/DateFilter';

export class ReturnSearch extends SearchEntity {
  name: TextFilter = new TextFilter();
  customerDetailId: string;
  customerContactId: string;
  customerContactFullName: string;
  customerCode: string;
  customerName: string;
  customerAddress: string;
  inventoryOrganizationId: string = null;
  inventoryOrganizationCode: string = null;
  inventoryOrganizationStreet = new TextFilter();
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
  requesterName: string = null;
  remarks = new TextFilter();
  generalDiscountRate: NumberFilter = new NumberFilter();

  constructor(goodsReceiptPOSearchEntity?: any) {
    super(goodsReceiptPOSearchEntity);
  }
}

export class EmployeeDetailOfReturnSearch extends SearchEntity {
  code: TextFilter = new TextFilter();
  name: TextFilter = new TextFilter();

  constructor() {
    super();
  }
}

export class InventoryOrganizationOfReturnSearch extends SearchEntity {
  legalEntityId: string;

  code: TextFilter = new TextFilter();

  name: TextFilter = new TextFilter();

  shortName: TextFilter = new TextFilter();

  constructor() {
    super();
  }
}



export class TaxOfReturnSearch extends SearchEntity {
  code = new TextFilter();
  name = new TextFilter();
}

export class UnitOfMeasureOfReturnSearch extends SearchEntity {
  name = new TextFilter();
  type = new TextFilter();
  description = new TextFilter();
  code = new TextFilter();
}

export class ItemDetailOfReturnSearch extends SearchEntity {
  code = new TextFilter();
  name = new TextFilter();
}

export class BinLocationOfReturnSearch extends SearchEntity {
  goodsReceiptPOContentId: string;
  code = new TextFilter();
}

