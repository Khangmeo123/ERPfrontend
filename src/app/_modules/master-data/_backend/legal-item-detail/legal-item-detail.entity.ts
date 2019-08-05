import { Entity } from 'src/app/_helpers/entity';

export class LegalItemDetailEntity extends Entity {
    code: string;
    name: string;
    codeFromSupplier: string;
    codeFromMarket: string;

    // characteristicEntity:
    characteristicName: string;
    characteristicId: string;

    // unitEntity:
    unitOfMeasureName: string;
    unitOfMeasureId: string;

    primaryPrice: number;
    weight: number;

    // statusEntity:
    statusName: string;
    statusId: string;

    height: number;
    length: number;
    width: number;
    image: string;
    description: string;

    // itemDetail:
    itemDetailId: string;
    itemGroupings: string[];
    legalEntityId: string;
    defaultValue: number;

    // inventoryAccount:
    inventoryAccountId: string;
    inventoryAccountCode: string;
    inventoryAccountName: string;

    // returnAccount:
    returnAccountId: string;
    returnAccountCode: string;
    returnAccountName: string;

    // saleAllowancesAccount:
    salesAllowancesAccountId: string;
    salesAllowancesAccountCode: string;
    salesAllowancesAccountName: string;

    // expenseAccount:
    expenseAccountId: string;
    expenseAccountCode: string;
    expenseAccountName: string;

    // revenueAccount:
    revenueAccountId: string;
    revenueAccountCode: string;
    revenueAccountName: string;

    // discountAccount:
    discountAccountId: string;
    discountAccountCode: string;
    discountAccountName: string;
    discountTypeCode: string;
    discountTypeName: string;
    isDiscounted: boolean;

    itemDiscounts: any[];
    transformationUnits: any[];
    itemMaterials: ItemMaterial[];

    constructor(legalItemDetailEntity?: any) {
        super(legalItemDetailEntity);
    }
}

export class ItemMaterial extends Entity {
    sourceItemId: string;
    sourceItemCode: string;
    sourceItemName: string;
    unitOfMeasureId: string;
    unitOfMeasureCode: string;
    unitOfMeasureName: string;
    itemDetailId: string;
    itemDetailCode: string;
    itemDetailName: string;
    quantity: number;
}

export class TransformationUnitDTO extends Entity {
    baseUnitId: string;
    rate: number;
    description: string;
    salePrice: number;
    primaryPrice: number;
}

export class ItemDiscount extends Entity {
    quantityFrom: number;
    quantityTo: number;
    rate: number;
}
